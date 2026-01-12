"""
Predictor de Churn - Encapsula la lógica del modelo de Machine Learning
"""
import os
import joblib
import pandas as pd
from typing import Optional, Dict


class ChurnPredictor:
    """Clase que maneja la carga y predicción del modelo de churn"""

    def __init__(self, model_path: Optional[str] = None):
        """
        Inicializa el predictor y carga el modelo si existe

        Args:
            model_path: Ruta al archivo .pkl del modelo. Si es None, usa ruta por defecto
        """
        if model_path is None:
            # Ruta por defecto relativa a este archivo
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(base_dir, '../../../../../models/trained/churn_prediction_pipeline.pkl')
            model_path = os.path.normpath(model_path)

        self.model_path = model_path
        self.model = None
        self.is_loaded = False

        self._load_model()

    def _load_model(self) -> None:
        """Intenta cargar el modelo desde el disco"""
        if not os.path.exists(self.model_path):
            print(f"[WARNING] Modelo no encontrado en: {self.model_path}")
            print("[INFO] El predictor usará modo mock")
            return

        try:
            self.model = joblib.load(self.model_path)
            self.is_loaded = True
            print(f"[SUCCESS] Modelo cargado desde: {self.model_path}")
        except Exception as e:
            print(f"[ERROR] Error al cargar modelo: {e}")
            print("[INFO] El predictor usará modo mock")

    def predict(self, customer_data: Dict) -> Dict[str, any]:
        """
        Realiza una predicción de churn

        Args:
            customer_data: Diccionario con los datos del cliente

        Returns:
            Dict con 'prediction', 'churn_probability' y 'risk_level'
        """
        if not self.is_loaded:
            return self._predict_mock(customer_data)

        try:
            return self._predict_with_model(customer_data)
        except Exception as e:
            print(f"[ERROR] Error en predicción con modelo: {e}")
            return self._predict_mock(customer_data)

    def _predict_with_model(self, customer_data: Dict) -> Dict[str, any]:
        """Predicción usando el modelo entrenado"""
        df = pd.DataFrame([customer_data])

        prediction = int(self.model.predict(df)[0])

        try:
            probability = float(self.model.predict_proba(df)[0][1])
        except:
            probability = 0.5

        risk_level = self._calculate_risk_level(probability)

        return {
            "prediction": prediction,
            "churn_probability": round(probability, 4),
            "risk_level": risk_level
        }

    def _predict_mock(self, customer_data: Dict) -> Dict[str, any]:
        """Predicción mock basada en reglas simples cuando no hay modelo"""
        tenure = customer_data.get('tenure', 12)
        contract = customer_data.get('Contract', 'Month-to-month')
        monthly_charges = customer_data.get('MonthlyCharges', 50.0)

        # Lógica de reglas simples
        if tenure < 12 and contract == "Month-to-month":
            probability = 0.75
            prediction = 1
        elif tenure < 24 and monthly_charges > 70:
            probability = 0.65
            prediction = 1
        elif contract == "Two year":
            probability = 0.15
            prediction = 0
        else:
            probability = 0.45
            prediction = 0

        risk_level = self._calculate_risk_level(probability)

        return {
            "prediction": prediction,
            "churn_probability": round(probability, 4),
            "risk_level": risk_level
        }

    def _calculate_risk_level(self, probability: float) -> str:
        """Calcula el nivel de riesgo basado en la probabilidad"""
        if probability > 0.7:
            return "Alto"
        elif probability > 0.4:
            return "Medio"
        else:
            return "Bajo"

    def get_model_info(self) -> Dict[str, any]:
        """Retorna información sobre el modelo cargado"""
        return {
            "model_loaded": self.is_loaded,
            "model_path": self.model_path,
            "model_type": str(type(self.model)) if self.model else None
        }
