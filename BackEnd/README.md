# Backend - Sistema de Predicción de Churn

API REST desarrollada con Spring Boot 3 para el sistema de predicción y análisis de churn de clientes. Integra un microservicio de Machine Learning para realizar predicciones en tiempo real y gestiona la persistencia de datos con SQLite.

## 🚀 Características

- **API REST Completa**: Endpoints para gestión de clientes y predicciones
- **Integración ML**: Conexión con microservicio FastAPI para predicciones de churn
- **Base de Datos SQLite**: Persistencia ligera y portable de datos
- **Spring Boot 3**: Framework moderno con soporte para Java 21
- **Documentación Swagger**: Interfaz interactiva para probar la API
- **CORS Configurado**: Listo para comunicarse con el frontend Angular
- **WebClient Reactivo**: Cliente HTTP no bloqueante para llamadas al microservicio
- **Estrategias de Retención**: Sistema inteligente de recomendaciones basado en nivel de riesgo

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Java JDK**: versión 21 o superior
- **Gradle**: versión 8.x o superior (o usa el wrapper incluido `gradlew`)
- **Git**: para clonar el repositorio
- **Microservicio ML**: El servicio FastAPI debe estar corriendo en `http://127.0.0.1:8000`

Verifica las versiones instaladas:

```bash
java --version
gradle --version
```

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto-Hackaton-ONE-Equipo46/BackEnd
```

### 2. Configurar la Base de Datos

La base de datos SQLite ya está incluida en el proyecto:

```
BackEnd/database/churn_insight.db
```

No necesitas instalar ningún servidor de base de datos adicional. SQLite es una base de datos embebida que se ejecuta dentro de la aplicación.

### 3. Configurar la Conexión con el Microservicio ML

Verifica la configuración en [`src/main/resources/application.properties`](src/main/resources/application.properties):

```properties
# URL del microservicio de Machine Learning
datascienceml.service.url=http://127.0.0.1:8000/predict
```

Si tu microservicio FastAPI corre en otro puerto o host, actualiza esta propiedad.

### 4. Instalar Dependencias

El proyecto usa Gradle Wrapper, que descargará automáticamente todas las dependencias:

```bash
# En Windows
.\gradlew build

# En Linux/Mac
./gradlew build
```

## 🎮 Ejecución

### Modo Desarrollo

Inicia el servidor de desarrollo:

```bash
# En Windows
.\gradlew bootRun

# En Linux/Mac
./gradlew bootRun
```

La aplicación estará disponible en: **http://localhost:8080**

### Verificar que está Funcionando

Accede a la documentación Swagger:

```
http://localhost:8080/swagger-ui.html
```

O verifica el health check:

```bash
curl http://localhost:8080/api/clientes
```

### Build para Producción

Genera un JAR ejecutable:

```bash
# En Windows
.\gradlew clean build

# En Linux/Mac
./gradlew clean build
```

El archivo JAR se generará en `build/libs/BackEnd-0.0.1-SNAPSHOT.jar`

Ejecuta el JAR:

```bash
java -jar build/libs/BackEnd-0.0.1-SNAPSHOT.jar
```

### Ejecutar Tests

```bash
# En Windows
.\gradlew test

# En Linux/Mac
./gradlew test
```

## 📁 Estructura del Proyecto

```
BackEnd/
├── database/
│   └── churn_insight.db           # Base de datos SQLite
├── gradle/
│   └── wrapper/                   # Gradle wrapper files
├── src/
│   ├── main/
│   │   ├── java/com/churninsight/backend/
│   │   │   ├── controller/
│   │   │   │   ├── FrontEndController.java      # API REST para frontend
│   │   │   │   └── DataScienceController.java   # API interna para ML
│   │   │   ├── service/
│   │   │   │   ├── ClienteService.java          # Lógica de negocio
│   │   │   │   └── DataScienceService.java      # Cliente HTTP para ML
│   │   │   ├── repository/
│   │   │   │   └── ClienteRepository.java       # Acceso a datos JPA
│   │   │   ├── model/
│   │   │   │   ├── entity/
│   │   │   │   │   └── Cliente.java             # Entidad JPA
│   │   │   │   └── dto/
│   │   │   │       ├── ClienteDTO.java          # DTO simplificado
│   │   │   │       ├── ClienteCreacionDTO.java  # DTO para crear cliente
│   │   │   │       ├── PrediccionChurnDTO.java  # DTO de predicción
│   │   │   │       ├── CustomerDataDTO.java     # DTO para ML service
│   │   │   │       ├── StrategysDTO.java        # DTO de estrategia
│   │   │   │       └── DashboardStatsDTO.java   # DTO de estadísticas
│   │   │   ├── config/
│   │   │   │   └── CorsConfig.java              # Configuración CORS
│   │   │   ├── util/
│   │   │   │   └── strategys/
│   │   │   │       └── EstrategiasChurn.java    # Estrategias de retención
│   │   │   └── BackEndApplication.java          # Clase principal
│   │   └── resources/
│   │       └── application.properties           # Configuración Spring
│   └── test/                                    # Tests unitarios
├── build.gradle                                 # Configuración Gradle
├── settings.gradle                              # Configuración del proyecto
├── gradlew                                      # Gradle wrapper (Linux/Mac)
├── gradlew.bat                                  # Gradle wrapper (Windows)
└── README.md                                    # Este archivo
```

## 🏗️ Arquitectura

### Capas de la Aplicación

#### 1. **Controllers** - Capa de Presentación

**FrontEndController** (`controller/FrontEndController.java`)
- Expone la API REST para el frontend Angular
- Maneja todas las peticiones HTTP
- Devuelve respuestas en formato JSON
- Implementa manejo de errores con códigos HTTP apropiados

**DataScienceController** (`controller/DataScienceController.java`)
- API interna para comunicación con el microservicio ML
- No expuesta públicamente

#### 2. **Services** - Capa de Lógica de Negocio

**ClienteService** (`service/ClienteService.java`)
- Lógica principal de gestión de clientes
- Coordina entre el repositorio y el servicio de ML
- Genera estadísticas del dashboard
- Aplica estrategias de retención basadas en predicciones

**DataScienceService** (`service/DataScienceService.java`)
- Cliente HTTP reactivo (WebClient)
- Comunicación con el microservicio FastAPI
- Manejo de timeouts y errores de red
- Transformación de datos entre formatos

#### 3. **Repository** - Capa de Persistencia

**ClienteRepository** (`repository/ClienteRepository.java`)
- Interfaz JPA para acceso a datos
- Queries personalizadas con @Query
- Métodos derivados de nombres (findBy...)

#### 4. **Models** - Modelos de Datos

**Cliente** (Entity)
```java
{
  id: Long;                    // PK autogenerado
  customerId: String;          // ID único del cliente (UUID)
  nombreCompleto: String;
  correoElectronico: String;   // Único
  documentoIdentidad: Integer; // Único
  propensoAChurn: boolean;     // Flag de riesgo
}
```

**ClienteDTO** (Data Transfer Object)
```java
{
  customerId: String;
  nombreCompleto: String;
  correoElectronico: String;
  documentoIdentidad: Integer;
  propensoAChurn: boolean;
}
```

**PrediccionChurnDTO**
```java
{
  customerId: String;
  nombreCompleto: String;
  correoElectronico: String;
  documentoIdentidad: Integer;
  prediction: Integer;         // 0 = No churn, 1 = Churn
  churnProbability: Double;    // 0.0 - 1.0
  riskLevel: String;           // "Alto", "Medio", "Bajo"
  estrategiaRetencion: String; // Estrategia recomendada
  recomendacion: String;       // Texto de recomendación
}
```

**DashboardStatsDTO**
```java
{
  totalClientes: Integer;
  clientesActivos: Integer;
  clientesPropensos: Integer;
  tasaRetencion: Double;       // Porcentaje
}
```

### Sistema de Estrategias de Retención

**EstrategiasChurn** (`util/strategys/EstrategiasChurn.java`)

Genera recomendaciones automáticas basadas en el nivel de riesgo:

| Nivel de Riesgo | Probabilidad | Estrategia |
|-----------------|--------------|------------|
| **Alto** | > 70% | Contacto inmediato, ofertas exclusivas, descuentos |
| **Medio** | 50-70% | Seguimiento periódico, mejora de servicio |
| **Bajo** | < 50% | Mantener satisfacción, programas de fidelización |

## 🌐 API Endpoints

Todos los endpoints están bajo el prefijo `/api/clientes`

### Clientes

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/api/clientes` | Obtener todos los clientes | `List<ClienteDTO>` |
| GET | `/api/clientes/{id}` | Obtener cliente por customerId | `ClienteDTO` |
| GET | `/api/clientes/correo/{correo}` | Buscar por correo electrónico | `ClienteDTO` |
| GET | `/api/clientes/documento/{documento}` | Buscar por documento | `ClienteDTO` |
| GET | `/api/clientes/{id}/exists` | Verificar si existe | `Boolean` |
| POST | `/api/clientes` | Crear nuevo cliente | `ClienteDTO` (201 Created) |

### Análisis y Predicciones

| Método | Endpoint | Descripción | Respuesta |
|--------|----------|-------------|-----------|
| GET | `/api/clientes/{id}/predict` | Obtener predicción de churn | `PrediccionChurnDTO` |
| GET | `/api/clientes/en-riesgo` | Clientes con alto riesgo | `List<ClienteDTO>` |
| GET | `/api/clientes/estadisticas` | Estadísticas del dashboard | `DashboardStatsDTO` |

### Ejemplos de Uso

#### Crear un Cliente

```bash
curl -X POST http://localhost:8080/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nombreCompleto": "Juan Pérez",
    "correoElectronico": "juan.perez@example.com",
    "documentoIdentidad": 12345678
  }'
```

#### Obtener Predicción de Churn

```bash
curl http://localhost:8080/api/clientes/550e8400-e29b-41d4-a716-446655440000/predict
```

Respuesta:
```json
{
  "customerId": "550e8400-e29b-41d4-a716-446655440000",
  "nombreCompleto": "Juan Pérez",
  "correoElectronico": "juan.perez@example.com",
  "documentoIdentidad": 12345678,
  "prediction": 1,
  "churnProbability": 0.85,
  "riskLevel": "Alto",
  "estrategiaRetencion": "Contacto Urgente",
  "recomendacion": "Cliente en riesgo crítico. Se recomienda contacto inmediato con oferta personalizada..."
}
```

#### Obtener Estadísticas

```bash
curl http://localhost:8080/api/clientes/estadisticas
```

Respuesta:
```json
{
  "totalClientes": 1000,
  "clientesActivos": 750,
  "clientesPropensos": 250,
  "tasaRetencion": 75.0
}
```

## 🔧 Configuración

### application.properties

El archivo de configuración principal está en `src/main/resources/application.properties`:

```properties
# Base de Datos SQLite
spring.datasource.url=jdbc:sqlite:database/churn_insight.db
spring.datasource.driver-class-name=org.sqlite.JDBC
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Documentación Swagger
springdoc.api-docs.path=/api-docs
springdoc.swagger-ui.path=/swagger-ui.html

# Microservicio ML
datascienceml.service.url=http://127.0.0.1:8000/predict
```

### Configuración CORS

El backend permite peticiones desde `http://localhost:4200` (frontend Angular).

Para modificar los orígenes permitidos, edita [`src/main/java/com/churninsight/backend/config/CorsConfig.java`](src/main/java/com/churninsight/backend/config/CorsConfig.java).

### Variables de Entorno

Puedes sobrescribir propiedades usando variables de entorno:

```bash
# URL del microservicio ML
export DATASCIENCEML_SERVICE_URL=http://192.168.1.100:8000/predict

# Puerto del servidor
export SERVER_PORT=9090

# Ejecutar
./gradlew bootRun
```

## 📦 Dependencias Principales

| Dependencia | Versión | Propósito |
|-------------|---------|-----------|
| Spring Boot | 3.4.1 | Framework principal |
| Spring Data JPA | 3.4.1 | Acceso a datos ORM |
| Spring WebFlux | 3.4.1 | Cliente HTTP reactivo |
| SQLite JDBC | 3.47.1.0 | Driver de base de datos |
| Hibernate Community Dialects | 6.6.1.Final | Dialecto SQLite para JPA |
| SpringDoc OpenAPI | 2.8.1 | Documentación Swagger |

Ver todas las dependencias en [`build.gradle`](build.gradle).

## 🔌 Integración con Microservicio ML

El backend se comunica con un microservicio FastAPI para obtener predicciones de churn.

### Flujo de Predicción

1. Frontend solicita predicción → `GET /api/clientes/{id}/predict`
2. Backend obtiene datos del cliente desde SQLite
3. Backend envía datos al microservicio ML → `POST http://127.0.0.1:8000/predict`
4. Microservicio procesa con modelo ML y devuelve predicción
5. Backend enriquece respuesta con estrategias de retención
6. Backend devuelve `PrediccionChurnDTO` completo al frontend

### Formato de Comunicación con ML

**Request al Microservicio:**
```json
{
  "customer_id": "550e8400-e29b-41d4-a716-446655440000",
  "nombre_completo": "Juan Pérez",
  "correo_electronico": "juan.perez@example.com",
  "documento_identidad": 12345678
}
```

**Response del Microservicio:**
```json
{
  "prediction": 1,
  "churn_probability": 0.85,
  "risk_level": "Alto"
}
```

### Manejo de Errores

Si el microservicio ML no está disponible:
- El endpoint `/predict` devuelve HTTP 500
- Se registra el error en los logs
- El frontend muestra mensaje de error al usuario

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Verifica que el puerto 8080 no esté ocupado
netstat -ano | findstr :8080    # Windows
lsof -i :8080                   # Linux/Mac

# Si está ocupado, cambia el puerto en application.properties:
server.port=9090
```

### Error de conexión con la base de datos

```bash
# Verifica que el archivo exista
ls database/churn_insight.db

# Si no existe, la aplicación lo creará automáticamente al iniciar
# Asegúrate de que la carpeta 'database/' exista
mkdir database
```

### El microservicio ML no responde

```bash
# Verifica que el microservicio esté corriendo
curl http://127.0.0.1:8000/health

# Si no está corriendo, inicia el microservicio FastAPI primero
cd ../DataScience
python main.py
```

### Error CORS en el frontend

Verifica que el frontend esté corriendo en `http://localhost:4200`. Si usa otro puerto, actualiza la configuración CORS en [`CorsConfig.java`](src/main/java/com/churninsight/backend/config/CorsConfig.java).

### Errores de compilación de Gradle

```bash
# Limpia el build y reinstala
.\gradlew clean build --refresh-dependencies

# Si persiste, verifica la versión de Java
java --version   # Debe ser Java 21 o superior
```

## 📊 Base de Datos

### Esquema de la Tabla `clientes`

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | ID interno |
| customer_id | VARCHAR(255) | UNIQUE, NOT NULL | UUID único del cliente |
| nombre_completo | VARCHAR(255) | NOT NULL | Nombre del cliente |
| correo_electronico | VARCHAR(255) | UNIQUE, NOT NULL | Email único |
| documento_identidad | INTEGER | UNIQUE, NOT NULL | Documento de identidad |
| propenso_a_churn | BOOLEAN | NOT NULL | Flag de riesgo de churn |

### Queries Personalizadas

El repositorio incluye queries para:
- Buscar por correo electrónico
- Buscar por documento
- Obtener clientes en riesgo (`propensoAChurn = true`)
- Verificar existencia por customerId

## 🧪 Testing

### Ejecutar Todos los Tests

```bash
.\gradlew test
```

### Tests Unitarios

Los tests están ubicados en `src/test/java/` y cubren:
- Servicios
- Controladores
- Repositorios
- Integración con el microservicio ML

## 🚀 Despliegue

### Despliegue Local con JAR

```bash
# 1. Genera el JAR
.\gradlew clean build

# 2. Ejecuta el JAR
java -jar build/libs/BackEnd-0.0.1-SNAPSHOT.jar
```

### Despliegue en Docker

Crea un `Dockerfile`:

```dockerfile
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY build/libs/BackEnd-0.0.1-SNAPSHOT.jar app.jar
COPY database/ database/
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# Build imagen
docker build -t churn-backend:latest .

# Ejecutar contenedor
docker run -p 8080:8080 churn-backend:latest
```

### Consideraciones de Producción

1. **Base de Datos**: Considera migrar a PostgreSQL o MySQL para producción
2. **Variables de Entorno**: Usa variables de entorno para configuración sensible
3. **Logging**: Configura niveles de log apropiados
4. **Monitoreo**: Implementa actuator de Spring Boot para health checks
5. **HTTPS**: Configura SSL/TLS para comunicaciones seguras

## 📝 Documentación API

### Swagger UI

Una vez que la aplicación esté corriendo, accede a:

```
http://localhost:8080/swagger-ui.html
```

Aquí puedes:
- Ver todos los endpoints disponibles
- Probar las APIs directamente desde el navegador
- Ver los esquemas de request/response
- Obtener ejemplos de uso

### OpenAPI JSON

Descarga la especificación OpenAPI:

```
http://localhost:8080/api-docs
```

## 👥 Desarrollo

### Agregar un Nuevo Endpoint

1. Crea el método en el Controller:
```java
@GetMapping("/nuevo-endpoint")
public ResponseEntity<String> nuevoEndpoint() {
    return ResponseEntity.ok("Funciona!");
}
```

2. Implementa la lógica en el Service
3. Actualiza el Repository si necesitas nuevas queries
4. Agrega tests

### Agregar una Nueva Entidad

1. Crea la clase Entity en `model/entity/`
2. Crea el DTO correspondiente en `model/dto/`
3. Crea el Repository extendiendo `JpaRepository`
4. Implementa el Service
5. Crea el Controller

## 📝 Licencia

Este proyecto fue desarrollado como parte del Hackaton ONE - Equipo 46.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ por el Equipo 46 - Hackaton ONE**
