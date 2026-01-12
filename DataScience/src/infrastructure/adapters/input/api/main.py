"""
ChurnInsight API - Microservicio de predicción de churn con FastAPI
"""
import sys
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Agregar src al path para imports
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../../../../'))

from src.domain.models.schemas import (
    CustomerData,
    PredictionResponse,
    ModelInfo,
    HealthResponse
)
from src.infrastructure.adapters.output.ml_model.predictor import ChurnPredictor


# Inicializar aplicación FastAPI
app = FastAPI(
    title="ChurnInsight API",
    description="API de predicción de churn de clientes para telecomunicaciones",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar predictor (se carga el modelo al inicio)
predictor = ChurnPredictor()


@app.get("/", tags=["Root"])
async def root():
    """Endpoint raíz con información de la API"""
    return {
        "service": "ChurnInsight API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs"
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint para monitoreo del servicio"""
    is_healthy = predictor.is_loaded

    return HealthResponse(
        status="healthy" if is_healthy else "degraded",
        model_loaded=is_healthy,
        message="Servicio operativo con modelo cargado" if is_healthy
        else "Servicio operativo en modo mock (modelo no disponible)"
    )


@app.get("/model/info", response_model=ModelInfo, tags=["Model"])
async def get_model_info():
    """Obtiene información sobre el modelo cargado"""
    info = predictor.get_model_info()
    return ModelInfo(**info)


@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict_churn(data: CustomerData):
    """
    Predice la probabilidad de churn para un cliente

    - **tenure**: Meses de antigüedad del cliente
    - **MonthlyCharges**: Cargo mensual en USD
    - **TotalCharges**: Cargos totales acumulados
    - **SeniorCitizen**: Si es ciudadano senior (0=No, 1=Sí)
    - **Contract**: Tipo de contrato (Month-to-month, One year, Two year)
    - **InternetService**: Tipo de servicio de internet (DSL, Fiber optic, No)
    - **PaymentMethod**: Método de pago
    - **TechSupport**: Si tiene soporte técnico

    Retorna:
    - **prediction**: 0 = No churn, 1 = Churn probable
    - **churn_probability**: Probabilidad entre 0.0 y 1.0
    - **risk_level**: Alto, Medio o Bajo
    """
    try:
        # Convertir a diccionario
        customer_dict = data.model_dump()

        # Realizar predicción
        result = predictor.predict(customer_dict)

        return PredictionResponse(**result)

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error al procesar predicción: {str(e)}"
        )


# Endpoint adicional para debugging (solo en desarrollo)
@app.get("/debug/model-status", tags=["Debug"])
async def debug_model_status():
    """Endpoint de debugging para verificar estado del modelo"""
    return {
        "model_loaded": predictor.is_loaded,
        "model_path": predictor.model_path,
        "model_exists": os.path.exists(predictor.model_path)
    }


if __name__ == "__main__":
    print("🚀 Iniciando ChurnInsight API...")
    print(f"📊 Modelo cargado: {'✅ Sí' if predictor.is_loaded else '⚠️ No (usando modo mock)'}")
    print("📖 Documentación disponible en: http://127.0.0.1:8000/docs")

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )
