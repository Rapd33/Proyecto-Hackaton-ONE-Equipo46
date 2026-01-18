# ChurnInsight - Sistema de Predicción de Churn

<div align="center">

**Solución integral para predecir y prevenir la cancelación de clientes en telecomunicaciones**

[Características](#-características) • [Arquitectura](#-arquitectura) • [Instalación](#-instalación-rápida) • [Documentación](#-documentación-detallada) • [Equipo](#-equipo)

</div>

---

## 📋 Descripción del Proyecto

**ChurnInsight** es una plataforma completa de Machine Learning que predice la probabilidad de que un cliente cancele su servicio de telecomunicaciones. El sistema permite a las empresas actuar de manera proactiva antes de perder clientes, identificando patrones de riesgo y facilitando la toma de decisiones estratégicas.

### El Desafío

El equipo 46 del Hackaton ONE enfrenta el reto de crear una solución end-to-end que:
- ✅ Entrene un modelo predictivo de churn con alta precisión
- ✅ Disponibilice predicciones a través de una API REST escalable
- ✅ Presente información de forma clara en un dashboard interactivo
- ✅ Permita al negocio actuar antes de que el cliente decida irse

---

## ✨ Características

### 🤖 Machine Learning
- Modelo **GradientBoosting** con pipeline completo de preprocesamiento
- Predicciones en tiempo real con FastAPI
- Modo mock para desarrollo sin modelo entrenado
- Métricas de riesgo: **Alto**, **Medio**, **Bajo**

### 🚀 Backend Robusto
- API REST desarrollada en **Spring Boot 3**
- Base de datos **SQLite** con JPA/Hibernate
- Integración con microservicio de ML
- CORS configurado para comunicación con frontend

### 💎 Frontend Moderno
- Dashboard interactivo en **Angular 21**
- Componentes standalone reutilizables
- Gráficos interactivos con **Chart.js**
- Búsqueda en tiempo real de clientes
- Diseño responsive y profesional

---

## 🏗️ Arquitectura

El proyecto está dividido en **tres microservicios independientes** que se comunican a través de APIs REST:

```
ChurnInsight/
│
├── 🤖 DataScience/        # Microservicio de ML (FastAPI + scikit-learn)
│   ├── Entrenamiento del modelo GradientBoosting
│   ├── API REST de predicciones
│   └── Puerto: 8000
│
├── 🔧 BackEnd/            # API Backend (Spring Boot + SQLite)
│   ├── Gestión de clientes y datos
│   ├── Integración con ML service
│   └── Puerto: 8080
│
└── 💎 FrontEnd/           # Dashboard Web (Angular 21)
    ├── Interfaz de usuario
    ├── Visualización de datos
    └── Puerto: 4200
```

### Flujo de Datos

```
Frontend (Angular) → Backend (Spring Boot) → DataScience (FastAPI)
      ↑                       ↓                        ↓
   Usuario                SQLite DB            Modelo GradientBoosting
```

---

## 🚀 Instalación Rápida

### Prerrequisitos

Asegúrate de tener instalados:
- **Java 21** - Backend
- **Python 3.9+** - Machine Learning
- **Node.js 18+** - Frontend
- **Git** - Control de versiones

### Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto-Hackaton-ONE-Equipo46
```

### Opción 1: Instalación Manual (Recomendada)

Sigue las instrucciones detalladas en cada README específico:

1. **[DataScience README](DataScience/README.md)** - Configurar microservicio de ML
2. **[BackEnd README](BackEnd/README.md)** - Configurar API Spring Boot
3. **[FrontEnd README](FrontEnd/README.md)** - Configurar dashboard Angular

### Opción 2: Inicio Rápido (Scripts)

#### En Windows:

```bash
# 1. Iniciar DataScience (Terminal 1)
cd DataScience
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python src/infrastructure/adapters/input/api/main.py

# 2. Iniciar BackEnd (Terminal 2)
cd BackEnd
gradlew bootRun

# 3. Iniciar FrontEnd (Terminal 3)
cd FrontEnd
npm install
npm start
```

#### En Linux/Mac:

```bash
# 1. Iniciar DataScience (Terminal 1)
cd DataScience
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python src/infrastructure/adapters/input/api/main.py

# 2. Iniciar BackEnd (Terminal 2)
cd BackEnd
./gradlew bootRun

# 3. Iniciar FrontEnd (Terminal 3)
cd FrontEnd
npm install
npm start
```

### Verificar Instalación

Una vez iniciados los tres servicios, verifica que funcionan:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| 🤖 DataScience | http://127.0.0.1:8000/docs | Swagger UI - API de ML |
| 🔧 BackEnd | http://localhost:8080/api/clientes | API REST de clientes |
| 💎 FrontEnd | http://localhost:4200 | Dashboard web |

---

## 📊 Stack Tecnológico

### Machine Learning (DataScience)
- **FastAPI** - Framework web moderno y rápido
- **scikit-learn** - Modelo GradientBoosting
- **pandas** - Manipulación de datos
- **Pydantic** - Validación de datos
- **Uvicorn** - Servidor ASGI

### Backend (API)
- **Spring Boot 3.4.2** - Framework backend
- **Java 21** - Lenguaje de programación
- **SQLite** - Base de datos embebida
- **Hibernate** - ORM para persistencia
- **Lombok** - Reducción de boilerplate

### Frontend (Dashboard)
- **Angular 21** - Framework frontend
- **TypeScript 5.8** - Lenguaje tipado
- **Chart.js** - Visualización de datos
- **RxJS** - Programación reactiva
- **CSS Variables** - Sistema de diseño

---

## 📝 Documentación Detallada

Cada módulo tiene su propia documentación completa con guías de instalación, arquitectura, API y troubleshooting:

### 🤖 [DataScience - Microservicio de ML](DataScience/README.md)

Documentación del microservicio de Machine Learning:
- Instalación de Python y dependencias
- Entrenamiento del modelo GradientBoosting
- Endpoints de la API de predicción
- Health checks y monitoreo
- Modo mock para desarrollo
- Deployment con Docker

**Características destacadas:**
- Pipeline completo de preprocesamiento
- Predicciones en tiempo real
- Arquitectura hexagonal
- Swagger UI integrada

### 🔧 [BackEnd - API Spring Boot](BackEnd/README.md)

Documentación de la API REST en Spring Boot:
- Configuración de Java 21 y Gradle
- Integración con SQLite
- Endpoints CRUD de clientes
- Integración con microservicio ML
- Manejo de CORS
- Testing y deployment

**Características destacadas:**
- API RESTful completa
- Integración con ML service
- Base de datos SQLite embebida
- WebClient para llamadas HTTP

### 💎 [FrontEnd - Dashboard Angular](FrontEnd/README.md)

Documentación del dashboard web:
- Instalación de Node.js y Angular CLI
- Arquitectura de componentes standalone
- Sistema de enrutamiento
- Integración con API backend
- Gráficos interactivos
- Testing con Vitest

**Características destacadas:**
- Dashboard con estadísticas en tiempo real
- Búsqueda de clientes
- Gráficos de distribución de riesgo
- Diseño responsive

---

## 🔧 Configuración

### Variables de Entorno

Cada módulo puede requerir configuración específica. Consulta los README individuales para detalles:

**DataScience:**
- Puerto: `8000` (configurable en main.py)
- Ruta del modelo: `models/trained/churn_prediction_pipeline.pkl`

**BackEnd:**
- Puerto: `8080` (configurable en application.properties)
- Base de datos: `datos_clientes.db`
- URL ML Service: `http://localhost:8000`

**FrontEnd:**
- Puerto: `4200` (configurable en angular.json)
- API Backend: `http://localhost:8080`

---

## 🧪 Testing

### DataScience (Futuro)
```bash
cd DataScience
pytest tests/
```

### BackEnd
```bash
cd BackEnd
./gradlew test
```

### FrontEnd
```bash
cd FrontEnd
npm test
```

---

## 📦 Deployment

### Docker (Recomendado)

Cada módulo incluye instrucciones para crear imágenes Docker. Consulta:
- [DataScience Dockerfile](DataScience/README.md#-despliegue)
- [BackEnd Deployment](BackEnd/README.md#-deployment)
- [FrontEnd Build](FrontEnd/README.md#-build-para-producción)

### Build para Producción

```bash
# Frontend (genera dist/)
cd FrontEnd
npm run build

# Backend (genera .jar)
cd BackEnd
./gradlew build

# DataScience (usa Gunicorn)
cd DataScience
gunicorn src.infrastructure.adapters.input.api.main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

---

## 🛠️ Solución de Problemas

### El sistema no inicia

1. **Verifica que todos los puertos estén libres:**
   - 8000 (DataScience)
   - 8080 (BackEnd)
   - 4200 (FrontEnd)

2. **Revisa los logs de cada servicio** para identificar errores específicos

3. **Consulta las secciones de troubleshooting** en cada README individual

### Error de conexión entre servicios

1. Asegúrate de que todos los servicios estén corriendo
2. Verifica la configuración de CORS en DataScience y BackEnd
3. Comprueba que las URLs de conexión sean correctas

### Modelo no cargado

El servicio DataScience funcionará en modo mock si el modelo no está disponible. Para entrenar el modelo:

```bash
cd DataScience
python scripts/train_model.py
```

---

## 📁 Estructura del Proyecto

```
Proyecto-Hackaton-ONE-Equipo46/
│
├── DataScience/           # Microservicio de ML
│   ├── src/              # Código fuente
│   ├── models/           # Modelos entrenados
│   ├── scripts/          # Scripts de entrenamiento
│   ├── requirements.txt  # Dependencias Python
│   └── README.md         # Documentación DataScience
│
├── BackEnd/              # API Spring Boot
│   ├── src/             # Código fuente Java
│   ├── build.gradle     # Configuración Gradle
│   ├── datos_clientes.db # Base de datos SQLite
│   └── README.md        # Documentación BackEnd
│
├── FrontEnd/            # Dashboard Angular
│   ├── src/            # Código fuente TypeScript
│   ├── package.json    # Dependencias npm
│   ├── angular.json    # Configuración Angular
│   └── README.md       # Documentación FrontEnd
│
└── README.md           # Este archivo
```

---

## 🎯 Casos de Uso

### 1. Predicción Individual de Churn

Un agente de servicio al cliente puede:
1. Buscar un cliente en el dashboard
2. Ver su probabilidad de churn en tiempo real
3. Identificar el nivel de riesgo (Alto/Medio/Bajo)
4. Tomar acciones preventivas

### 2. Análisis de Dashboard General

Los gerentes pueden:
1. Ver estadísticas globales de churn
2. Analizar distribución de riesgo
3. Identificar tendencias de cancelación
4. Tomar decisiones estratégicas

### 3. Integración con Sistemas Externos

Otros sistemas pueden:
1. Consultar la API REST del backend
2. Obtener predicciones para múltiples clientes
3. Integrar alertas de churn en CRM existente

---

## 🚀 Roadmap

### Versión Actual (v1.0)
- ✅ Modelo GradientBoosting entrenado y funcional
- ✅ API REST completa en FastAPI
- ✅ Backend con Spring Boot y SQLite
- ✅ Dashboard interactivo en Angular
- ✅ Integración end-to-end

### Próximas Versiones
- 🔄 Predicciones por lotes
- 🔄 Sistema de alertas y notificaciones
- 🔄 Logs estructurados con niveles de severidad
- 🔄 Tests unitarios y de integración
- 🔄 Dockerización completa con docker-compose
- 🔄 CI/CD con GitHub Actions
- 🔄 Métricas de performance del modelo
- 🔄 Reentrenamiento automático del modelo

---

## 👥 Equipo

Este proyecto fue desarrollado por el **Equipo 46** del Hackaton ONE.

### Contribuidores

- **Data Science**: Desarrollo del modelo de ML y API de predicción
- **Backend**: Implementación de la API REST y persistencia
- **Frontend**: Diseño e implementación del dashboard web

---

## 📝 Licencia

Este proyecto fue desarrollado como parte del Hackaton ONE - Equipo 46.

---

## 📞 Contacto y Soporte

Para preguntas, problemas o sugerencias:

1. **Documentación**: Consulta los README específicos de cada módulo
2. **Issues**: Reporta problemas en el repositorio del proyecto
3. **Contribuciones**: Pull requests son bienvenidos

---

## 🎓 Recursos Adicionales

### Documentación de Tecnologías

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Spring Boot Guide](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.dev/)
- [scikit-learn User Guide](https://scikit-learn.org/stable/)

---

<div align="center">

**Desarrollado con ❤️ por el Equipo 46 - Hackaton ONE**

[⬆ Volver arriba](#churninsight---sistema-de-predicción-de-churn)

</div>
