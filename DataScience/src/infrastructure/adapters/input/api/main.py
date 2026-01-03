import sys
import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn

# --- 1. AJUSTE DE RUTAS ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# NOMBRE EXACTO DEL ARCHIVO (Tal cual como sale en tu foto)
MODEL_FILENAME = 'churn_prediction_pipeline.pkl'

# RUTA EXACTA: Subimos 5 niveles -> Entramos a 'models' -> Entramos a 'trained'
MODEL_PATH = os.path.join(BASE_DIR, '../../../../../models/trained', MODEL_FILENAME)
MODEL_PATH = os.path.normpath(MODEL_PATH)

# --- 2. CONFIGURACIÓN API ---
app = FastAPI(title="ChurnInsight API")

print(f"🔍 Buscando modelo en: {MODEL_PATH}")

if os.path.exists(MODEL_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        print("✅ ¡Modelo cargado exitosamente!")
    except Exception as e:
        print(f"❌ Error al cargar .pkl: {e}")
        model = None
else:
    print("❌ ERROR: No encuentro el archivo .pkl en DataScience/models")
    model = None

class CustomerData(BaseModel):
    credit_score: int
    country: str
    gender: str
    age: int
    tenure: int
    balance: float
    products_number: int
    credit_card: int
    active_member: int
    estimated_salary: float

@app.post("/predict")
def predict(data: CustomerData):
    if not model:
        raise HTTPException(status_code=500, detail="Modelo no cargado.")
    try:
        df = pd.DataFrame([data.model_dump()])
        # Predicción
        prediction = model.predict(df)[0]
        try:
            prob = model.predict_proba(df)[0][1]
        except:
            prob = 0.0
            
        return {"prediction": int(prediction), "probability": round(float(prob), 4)}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)