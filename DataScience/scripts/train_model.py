"""
Script para regenerar el modelo de predicción de churn con scikit-learn 1.8.0
"""
import pandas as pd
import joblib
import sklearn
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.ensemble import GradientBoostingClassifier

print(f"[INFO] Usando scikit-learn version: {sklearn.__version__}")

# Cargar datos
print("[INFO] Cargando datos...")
data_path = "data/raw/WA_Fn-UseC_-Telco-Customer-Churn.csv"
df = pd.read_csv(data_path)

print(f"[INFO] Dataset cargado: {df.shape[0]} filas, {df.shape[1]} columnas")

# Preparación de datos
# Convertir TotalCharges a numérico
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'].fillna(0, inplace=True)

# Convertir SeniorCitizen a int si no lo es
if df['SeniorCitizen'].dtype != 'int64':
    df['SeniorCitizen'] = df['SeniorCitizen'].astype(int)

# Variable objetivo
y = df['Churn'].map({'No': 0, 'Yes': 1})

# Features
features_numericas = ['tenure', 'MonthlyCharges', 'TotalCharges', 'SeniorCitizen']
features_categoricas = ['Contract', 'InternetService', 'PaymentMethod', 'TechSupport',
                        'OnlineSecurity', 'Partner', 'Dependents']

X = df[features_numericas + features_categoricas]

print(f"[INFO] Features seleccionadas: {len(features_numericas)} numéricas, {len(features_categoricas)} categóricas")

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
print(f"[INFO] Train: {X_train.shape[0]}, Test: {X_test.shape[0]}")

# Preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), features_numericas),
        ('cat', OneHotEncoder(drop='first', sparse_output=False, handle_unknown='ignore'), features_categoricas)
    ]
)

# Pipeline con GradientBoosting
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('classifier', GradientBoostingClassifier(n_estimators=100, random_state=42, max_depth=3))
])

print("[INFO] Entrenando modelo GradientBoosting...")
pipeline.fit(X_train, y_train)

# Evaluación
train_score = pipeline.score(X_train, y_train)
test_score = pipeline.score(X_test, y_test)
print(f"[INFO] Train accuracy: {train_score:.4f}")
print(f"[INFO] Test accuracy: {test_score:.4f}")

# Guardar modelo
output_path = "models/trained/churn_prediction_pipeline.pkl"
joblib.dump(pipeline, output_path)
print(f"[OK] Modelo guardado en: {output_path}")
print(f"[OK] Modelo compatible con scikit-learn {sklearn.__version__}")
