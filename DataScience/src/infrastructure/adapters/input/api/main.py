import sys
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn

# --- 1. AJUSTE DE RUTAS ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_FILENAME = 'churn_prediction_pipeline.pkl'
MODEL_PATH = os.path.join(BASE_DIR, '../../../../../models/trained', MODEL_FILENAME)
MODEL_PATH = os.path.normpath(MODEL_PATH)

# --- 2. CONFIGURACIÓN API ---
app = FastAPI(title="ChurnInsight API - Telco Edition")

print(f"🔍 Buscando modelo en: {MODEL_PATH}")

if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        print("✅ ¡Modelo cargado exitosamente!")
    except Exception as e:
        print(f"❌ Error al cargar .pkl: {e}")
        model = None
else:
    print("❌ ERROR: No encuentro el archivo .pkl")
    model = None

# --- 3. DEFINICIÓN DE DATOS (Ajustado a tus variables) ---
class CustomerData(BaseModel):
    # Variables Numéricas (Sí)
    tenure: int
    MonthlyCharges: float
    TotalCharges: float
    SeniorCitizen: int  # 0 o 1
    
    # Variables Categóricas (Sí)
    Contract: str        # Month-to-month, One year, Two year
    InternetService: str # DSL, Fiber optic, No
    PaymentMethod: str   # Electronic check, Mailed check, etc.
    TechSupport: str     # No, Yes, No internet service
    
    # Variables Opcionales (Las incluimos por seguridad si el modelo las pide)
    OnlineSecurity: str = "No" 
    Partner: str = "No"
    Dependents: str = "No"

@app.post("/predict")
def predict(data: CustomerData):
    if not model:
        raise HTTPException(status_code=500, detail="Modelo no cargado.")
    try:
        # Convertir a DataFrame
        input_data = data.model_dump()
        df = pd.DataFrame([input_data])
        
        # IMPORTANTE: Los modelos suelen ser sensibles al orden de las columnas.
        # Aseguramos que el DataFrame tenga las columnas esperadas.
        # (Si el modelo usa otras que no enviamos, Pandas pondrá NaN o fallará, 
        #  pero con las que definimos arriba cubrimos las 'Sí' y 'Opcional').
        
        # Predicción
        prediction = model.predict(df)[0]
        
        try:
            # Intentar obtener probabilidad (si el modelo lo permite)
            prob = model.predict_proba(df)[0][1]
        except:
            prob = 0.0
            
        # Respuesta
        return {
            "prediction": int(prediction), 
            "churn_probability": round(float(prob), 4),
            "risk_level": "Alto" if prob > 0.5 else "Bajo"
        }
    except Exception as e:
        return {"error": f"Error en predicción: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)