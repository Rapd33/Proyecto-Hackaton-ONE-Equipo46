"""
Schemas de Pydantic para validación de datos
"""
from pydantic import BaseModel, Field
from typing import Literal


class CustomerData(BaseModel):
    """Datos del cliente para predicción de churn"""

    # Variables Numéricas
    tenure: int = Field(..., ge=0, description="Meses de antigüedad del cliente")
    MonthlyCharges: float = Field(..., gt=0, description="Cargo mensual en USD")
    TotalCharges: float = Field(..., ge=0, description="Cargos totales acumulados")
    SeniorCitizen: Literal[0, 1] = Field(..., description="Si es ciudadano senior (0=No, 1=Sí)")

    # Variables Categóricas
    Contract: Literal["Month-to-month", "One year", "Two year"] = Field(
        ..., description="Tipo de contrato"
    )
    InternetService: Literal["DSL", "Fiber optic", "No"] = Field(
        ..., description="Tipo de servicio de internet"
    )
    PaymentMethod: Literal[
        "Electronic check",
        "Mailed check",
        "Bank transfer (automatic)",
        "Credit card (automatic)"
    ] = Field(..., description="Método de pago")
    TechSupport: Literal["No", "Yes", "No internet service"] = Field(
        ..., description="Si tiene soporte técnico"
    )

    # Variables Opcionales (con valores por defecto)
    OnlineSecurity: Literal["No", "Yes", "No internet service"] = Field(
        default="No", description="Si tiene seguridad online"
    )
    Partner: Literal["No", "Yes"] = Field(
        default="No", description="Si tiene pareja"
    )
    Dependents: Literal["No", "Yes"] = Field(
        default="No", description="Si tiene dependientes"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "tenure": 12,
                "MonthlyCharges": 65.5,
                "TotalCharges": 786.0,
                "SeniorCitizen": 0,
                "Contract": "Month-to-month",
                "InternetService": "Fiber optic",
                "PaymentMethod": "Electronic check",
                "TechSupport": "No",
                "OnlineSecurity": "No",
                "Partner": "Yes",
                "Dependents": "No"
            }
        }


class PredictionResponse(BaseModel):
    """Respuesta de predicción de churn"""

    prediction: Literal[0, 1] = Field(..., description="Predicción (0=No churn, 1=Churn)")
    churn_probability: float = Field(..., ge=0, le=1, description="Probabilidad de churn (0.0-1.0)")
    risk_level: Literal["Alto", "Medio", "Bajo"] = Field(..., description="Nivel de riesgo")

    class Config:
        json_schema_extra = {
            "example": {
                "prediction": 1,
                "churn_probability": 0.75,
                "risk_level": "Alto"
            }
        }


class ModelInfo(BaseModel):
    """Información sobre el modelo cargado"""

    model_loaded: bool = Field(..., description="Si el modelo está cargado")
    model_path: str = Field(..., description="Ruta del archivo del modelo")
    model_type: str | None = Field(None, description="Tipo de modelo")

    class Config:
        json_schema_extra = {
            "example": {
                "model_loaded": True,
                "model_path": "models/trained/churn_prediction_pipeline.pkl",
                "model_type": "<class 'sklearn.pipeline.Pipeline'>"
            }
        }


class HealthResponse(BaseModel):
    """Respuesta del health check"""

    status: Literal["healthy", "degraded"] = Field(..., description="Estado del servicio")
    model_loaded: bool = Field(..., description="Si el modelo está disponible")
    message: str = Field(..., description="Mensaje descriptivo")

    class Config:
        json_schema_extra = {
            "example": {
                "status": "healthy",
                "model_loaded": True,
                "message": "Servicio operativo con modelo cargado"
            }
        }
