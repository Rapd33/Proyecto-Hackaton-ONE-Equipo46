# DataScience - Microservicio de Predicción de Churn

Microservicio de Machine Learning desarrollado con FastAPI que predice la probabilidad de abandono (churn) de clientes en el sector de telecomunicaciones. Utiliza un modelo GradientBoosting entrenado con scikit-learn.

## 🚀 Características

- **API REST con FastAPI**: Endpoints rápidos y documentados automáticamente
- **Modelo GradientBoosting**: Pipeline completo con preprocesamiento y clasificación
- **Modo Mock**: Predicciones basadas en reglas cuando el modelo no está disponible
- **Arquitectura Hexagonal**: Código limpio y mantenible
- **CORS Configurado**: Listo para integrarse con el backend Spring Boot
- **Health Check**: Monitoreo del estado del servicio y modelo
- **Validación con Pydantic**: Schemas robustos para datos de entrada/salida
- **Documentación Swagger**: Interfaz interactiva para probar la API

## 📋 Requisitos Previos

- **Python**: versión 3.9 o superior
- **pip**: gestor de paquetes de Python
- **Git**: para clonar el repositorio

Verifica la versión de Python:

```bash
python --version
```

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto-Hackaton-ONE-Equipo46/DataScience
```

### 2. Crear Entorno Virtual

```bash
# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# En Windows:
.venv\Scripts\activate

# En Linux/Mac:
source .venv/bin/activate
```

### 3. Instalar Dependencias

```bash
pip install -r requirements.txt
```

Esto instalará:
- FastAPI y Uvicorn (servidor)
- Pydantic (validación)
- scikit-learn, pandas, numpy (ML)
- Otras utilidades

## 🎮 Ejecución

### Iniciar el Servidor

```bash
# Desde la raíz del proyecto DataScience
python src/infrastructure/adapters/input/api/main.py
```

O alternativamente:

```bash
uvicorn src.infrastructure.adapters.input.api.main:app --reload --host 0.0.0.0 --port 8000
```

El servicio estará disponible en: **http://127.0.0.1:8000**

### Verificar que Funciona

Accede a la documentación Swagger:

```
http://127.0.0.1:8000/docs
```

O prueba el health check:

```bash
curl http://127.0.0.1:8000/health
```

## 📁 Estructura del Proyecto

```
DataScience/
├── src/
│   ├── domain/                              # Capa de dominio
│   │   ├── models/
│   │   │   └── schemas.py                   # Pydantic schemas
│   │   └── ports/                           # Interfaces (vacío por ahora)
│   ├── application/                         # Casos de uso (vacío por ahora)
│   └── infrastructure/                      # Infraestructura
│       ├── adapters/
│       │   ├── input/
│       │   │   └── api/
│       │   │       └── main.py              # FastAPI application
│       │   └── output/
│       │       └── ml_model/
│       │           └── predictor.py         # Clase ChurnPredictor
│       └── config/                          # Configuración (vacío por ahora)
├── models/
│   ├── trained/
│   │   └── churn_prediction_pipeline.pkl    # Modelo entrenado
│   └── artifacts/                           # Artefactos del modelo
├── scripts/
│   ├── train_model.py                       # Script para entrenar modelo
│   └── migrate_csv_to_db.py                 # Migrar CSV a SQLite
├── data/                                    # Datos (no incluidos en repo)
│   ├── raw/                                 # Datos originales
│   └── processed/                           # Datos procesados
├── requirements.txt                         # Dependencias Python
├── .gitignore
└── README.md                                # Este archivo
```

## 🏗️ Arquitectura

### Componentes Principales

#### 1. **FastAPI Application** (`main.py`)
- Configura la aplicación FastAPI
- Define los endpoints de la API
- Maneja CORS y middleware
- Inicializa el predictor al arranque

#### 2. **ChurnPredictor** (`predictor.py`)
- Carga el modelo entrenado desde disco
- Encapsula la lógica de predicción
- Implementa modo mock cuando no hay modelo
- Calcula niveles de riesgo

#### 3. **Pydantic Schemas** (`schemas.py`)
- `CustomerData`: Valida datos de entrada
- `PredictionResponse`: Estructura de respuesta
- `HealthResponse`: Estado del servicio
- `ModelInfo`: Información del modelo

### Flujo de Predicción

1. Cliente envía POST a `/predict` con datos del cliente
2. Pydantic valida los datos automáticamente
3. `main.py` convierte los datos a diccionario
4. `ChurnPredictor` realiza la predicción
5. Respuesta se valida con `PredictionResponse`
6. Cliente recibe JSON con predicción y probabilidad

## 🌐 Endpoints de la API

### Root

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información básica de la API |

### Health & Monitoring

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/health` | Health check del servicio | `HealthResponse` |
| GET | `/model/info` | Información del modelo cargado | `ModelInfo` |
| GET | `/debug/model-status` | Estado detallado del modelo (debug) | JSON |

### Predicción

| Método | Endpoint | Descripción | Request | Response |
|--------|----------|-------------|---------|----------|
| POST | `/predict` | Predecir churn de un cliente | `CustomerData` | `PredictionResponse` |

### Ejemplo de Uso

#### Realizar una Predicción

```bash
curl -X POST "http://127.0.0.1:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Respuesta:**

```json
{
  "prediction": 1,
  "churn_probability": 0.7534,
  "risk_level": "Alto"
}
```

#### Health Check

```bash
curl http://127.0.0.1:8000/health
```

**Respuesta:**

```json
{
  "status": "healthy",
  "model_loaded": true,
  "message": "Servicio operativo con modelo cargado"
}
```

## 🔧 Configuración

### Variables del Modelo

Las variables requeridas para predicción son:

**Numéricas:**
- `tenure`: Meses de antigüedad del cliente (≥ 0)
- `MonthlyCharges`: Cargo mensual en USD (> 0)
- `TotalCharges`: Cargos totales acumulados (≥ 0)
- `SeniorCitizen`: Si es ciudadano senior (0 o 1)

**Categóricas:**
- `Contract`: "Month-to-month", "One year", "Two year"
- `InternetService`: "DSL", "Fiber optic", "No"
- `PaymentMethod`: "Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"
- `TechSupport`: "No", "Yes", "No internet service"

**Opcionales (con valores por defecto):**
- `OnlineSecurity`: "No", "Yes", "No internet service" (default: "No")
- `Partner`: "No", "Yes" (default: "No")
- `Dependents`: "No", "Yes" (default: "No")

### CORS

El servicio acepta peticiones desde:
- `http://localhost:8080` (Backend Spring Boot)
- `http://localhost:4200` (Frontend Angular)

Para modificar, edita en [`main.py`](src/infrastructure/adapters/input/api/main.py):

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:4200"],
    ...
)
```

## 🤖 Modelo de Machine Learning

### Características

- **Algoritmo**: GradientBoosting
- **Features**: 11 variables (4 numéricas, 7 categóricas)
- **Preprocesamiento**: StandardScaler para numéricas, OneHotEncoder para categóricas
- **Pipeline**: Completo con transformaciones y modelo

### Entrenar/Regenerar el Modelo

Si necesitas reentrenar el modelo:

```bash
# Asegúrate de tener el dataset en data/raw/telco_churn.csv
python scripts/train_model.py
```

Esto generará un nuevo `churn_prediction_pipeline.pkl` en `models/trained/`.

### Modo Mock

Cuando el modelo no está disponible, el servicio usa predicciones basadas en reglas:

- **Alto riesgo (75%)**: tenure < 12 meses Y contrato mes a mes
- **Riesgo medio-alto (65%)**: tenure < 24 meses Y cargo mensual > $70
- **Bajo riesgo (15%)**: Contrato de dos años
- **Riesgo medio (45%)**: Otros casos

## 📊 Scripts Útiles

### Migrar CSV a SQLite

```bash
python scripts/migrate_csv_to_db.py
```

Convierte el CSV de clientes a base de datos SQLite para el backend.

### Entrenar Modelo

```bash
python scripts/train_model.py
```

Entrena un nuevo modelo GradientBoosting con los datos de telco.

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verifica que el entorno virtual esté activado
.venv\Scripts\activate   # Windows
source .venv/bin/activate  # Linux/Mac

# Reinstala dependencias
pip install -r requirements.txt
```

### Error "Model not found"

El servicio funcionará en modo mock. Si quieres usar el modelo real:

1. Verifica que existe `models/trained/churn_prediction_pipeline.pkl`
2. Si no existe, entrena el modelo con `python scripts/train_model.py`

### Error de importación de módulos

```bash
# Asegúrate de ejecutar desde la raíz de DataScience
cd DataScience
python src/infrastructure/adapters/input/api/main.py
```

### Puerto 8000 ocupado

```bash
# Usa otro puerto
uvicorn src.infrastructure.adapters.input.api.main:app --port 8001
```

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| fastapi | 0.128.0 | Framework web |
| uvicorn | 0.40.0 | Servidor ASGI |
| pydantic | 2.12.5 | Validación de datos |
| scikit-learn | 1.6.1 | Machine Learning |
| pandas | 2.3.3 | Manipulación de datos |
| numpy | 2.4.0 | Cálculos numéricos |
| joblib | 1.5.3 | Serialización del modelo |

Ver todas las dependencias en [`requirements.txt`](requirements.txt).

## 🚀 Despliegue

### Docker (Opcional)

Crear `Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "src/infrastructure/adapters/input/api/main.py"]
```

Build y run:

```bash
docker build -t churn-ml-service .
docker run -p 8000:8000 churn-ml-service
```

### Producción

Para producción, usa Gunicorn con workers:

```bash
pip install gunicorn

gunicorn src.infrastructure.adapters.input.api.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

## 📝 Documentación API

Una vez el servicio esté corriendo, accede a:

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

Aquí puedes:
- Ver todos los endpoints
- Probar las APIs directamente
- Ver esquemas de request/response
- Obtener ejemplos de uso

## 🧪 Testing (Futuro)

Estructura para tests:

```bash
tests/
├── test_api.py           # Tests de endpoints
├── test_predictor.py     # Tests del predictor
└── test_schemas.py       # Tests de validación
```

Ejecutar tests:

```bash
pytest tests/
```

## 📝 Licencia

Este proyecto fue desarrollado como parte del Hackaton ONE - Equipo 46.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ por el Equipo 46 - Hackaton ONE**
