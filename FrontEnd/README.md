# Frontend - Sistema de Predicción de Churn

Frontend desarrollado con Angular 21 para el sistema de predicción y análisis de churn de clientes. Proporciona una interfaz moderna e intuitiva para visualizar estadísticas, buscar clientes y obtener predicciones de abandono en tiempo real.

## 🚀 Características

- **Dashboard General**: Visualización de estadísticas globales con gráficos interactivos
- **Búsqueda Inteligente**: Búsqueda de clientes por ID, correo electrónico o documento de identidad
- **Predicción de Churn**: Integración con modelo de Machine Learning para predicciones en tiempo real
- **Dashboard de Cliente**: Vista detallada con probabilidad de abandono, nivel de riesgo y estrategias de retención
- **Gestión de Clientes**: Formulario para crear nuevos clientes
- **Notificaciones**: Sistema de notificaciones toast para feedback de usuario
- **Diseño Responsivo**: Interfaz adaptable a diferentes tamaños de pantalla
- **Componentes Standalone**: Arquitectura moderna con componentes independientes de Angular 21

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js**: versión 18.x o superior
- **npm**: versión 11.6.2 o superior (incluido con Node.js)
- **Git**: para clonar el repositorio

Verifica las versiones instaladas:

```bash
node --version
npm --version
```

## 🛠️ Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Proyecto-Hackaton-ONE-Equipo46/FrontEnd
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las dependencias definidas en `package.json`, incluyendo:

- **Angular 21**: Framework principal
- **RxJS**: Programación reactiva para manejo de observables
- **Angular Router**: Sistema de navegación
- **TypeScript**: Lenguaje de programación tipado

### 3. Configuración del Backend

El frontend espera que el backend esté corriendo en:

```
http://localhost:8080/api/clientes
```

Si tu backend corre en otro puerto o URL, actualiza la propiedad `apiUrl` en el archivo:

**Archivo**: [`src/app/services/customer.ts`](src/app/services/customer.ts) (línea 14)

```typescript
private apiUrl = 'http://localhost:8080/api/clientes';
```

## 🎮 Ejecución

### Modo Desarrollo

Inicia el servidor de desarrollo:

```bash
npm start
```

O alternativamente:

```bash
ng serve
```

La aplicación estará disponible en: **http://localhost:4200/**

El servidor se recargará automáticamente cuando hagas cambios en el código.

### Modo Desarrollo con Watch

Para compilar automáticamente en modo desarrollo:

```bash
npm run watch
```

### Build para Producción

Genera una build optimizada para producción:

```bash
npm run build
```

Los archivos compilados se generarán en el directorio `dist/`. Esta build incluye:

- Minificación de código
- Tree-shaking para eliminar código no utilizado
- Optimización de bundles
- Hashing de archivos para caché

### Ejecutar Tests

```bash
npm test
```

Los tests están configurados con **Vitest** como framework de testing.

## 📁 Estructura del Proyecto

```
FrontEnd/
├── public/                    # Archivos públicos estáticos
├── src/
│   ├── app/
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── dashboard/
│   │   │   │   ├── cliente-nuevo-form/      # Formulario de creación
│   │   │   │   ├── dashboard-cliente/       # Dashboard individual
│   │   │   │   └── dashboard-general/       # Dashboard con estadísticas
│   │   │   ├── navbar/                      # Barra de navegación
│   │   │   └── notification-toast/          # Sistema de notificaciones
│   │   ├── pages/             # Páginas/Vistas principales
│   │   │   ├── home/          # Página de inicio
│   │   │   └── dashboard/     # Página del dashboard principal
│   │   ├── services/          # Servicios de Angular
│   │   │   ├── customer.ts                  # Servicio API de clientes
│   │   │   ├── notification.service.ts      # Servicio de notificaciones
│   │   │   └── state.service.ts             # Gestión de estado global
│   │   ├── models/            # Interfaces y tipos TypeScript
│   │   │   ├── customer.model.ts            # Modelo de cliente
│   │   │   ├── customer-creation.model.ts   # DTO para crear cliente
│   │   │   ├── prediccion-churn.model.ts    # Modelo de predicción
│   │   │   ├── dashboard-stats.model.ts     # Estadísticas dashboard
│   │   │   └── types.util.ts                # Tipos auxiliares
│   │   ├── interceptors/      # Interceptores HTTP
│   │   │   └── error.interceptor.ts         # Manejo global de errores
│   │   ├── app.config.ts      # Configuración de la app
│   │   ├── app.routes.ts      # Rutas de navegación
│   │   └── app.ts             # Componente raíz
│   ├── styles.css             # Estilos globales
│   └── main.ts                # Punto de entrada
├── angular.json               # Configuración de Angular CLI
├── package.json               # Dependencias y scripts
├── tsconfig.json              # Configuración de TypeScript
└── README.md                  # Este archivo
```

## 🎨 Arquitectura

### Componentes Principales

#### 1. **Home** (`src/app/pages/home/`)
- Página de bienvenida con call-to-action
- Navegación al sistema de dashboard

#### 2. **Dashboard** (`src/app/pages/dashboard/`)
- Contenedor principal del sistema
- Búsqueda inteligente de clientes
- Integración con dashboard-general y dashboard-cliente

#### 3. **Dashboard General** (`src/app/components/dashboard/dashboard-general/`)
- Estadísticas globales del sistema
- Gráfico de pastel interactivo con tooltips
- Métricas: clientes activos, propensos al churn, tasa de retención

#### 4. **Dashboard Cliente** (`src/app/components/dashboard/dashboard-cliente/`)
- Vista detallada del cliente individual
- Predicción de churn con ML
- Probabilidad de abandono con barra de progreso
- Nivel de riesgo (Alto/Bajo)
- Estrategia de retención recomendada
- Estado del cliente (Activo/Inactivo)

#### 5. **Cliente Nuevo Form** (`src/app/components/dashboard/cliente-nuevo-form/`)
- Modal para crear nuevos clientes
- Validación de formularios reactiva
- Verificación de duplicados

### Servicios

#### **CustomerService** (`src/app/services/customer.ts`)

API completa para interactuar con el backend:

```typescript
// Búsqueda
checkCustomerExists(customerId: string): Observable<boolean>
getCustomer(customerId: string): Observable<Customer>
getCustomerByEmail(correo: string): Observable<Customer>
getCustomerByDocument(documento: number): Observable<Customer>
getAllCustomers(): Observable<Customer[]>
getCustomersAtRisk(): Observable<Customer[]>

// Predicción
getChurnPrediction(customerId: string): Observable<PrediccionChurn>

// Estadísticas
getDashboardStats(): Observable<DashboardStats>

// Creación
createCustomer(customerData: CustomerCreation): Observable<Customer>
```

#### **NotificationService** (`src/app/services/notification.service.ts`)
- Sistema de notificaciones toast
- Tipos: success, error, info, warning

#### **StateService** (`src/app/services/state.service.ts`)
- Gestión de estado global de la aplicación
- Señales reactivas para compartir datos entre componentes

### Modelos de Datos

#### **Customer**
```typescript
{
  customerId: string;
  nombreCompleto: string;
  correoElectronico: string;
  documentoIdentidad: number;
  propensoAChurn: boolean;
}
```

#### **PrediccionChurn**
```typescript
{
  customerId: string;
  nombreCompleto: string;
  correoElectronico: string;
  documentoIdentidad: number;
  prediction: 0 | 1;              // 0 = No churn, 1 = Churn
  churnProbability: number;        // 0.0 - 1.0
  riskLevel: 'Alto' | 'Bajo' | 'Medio';
  estrategiaRetencion: string;
  recomendacion: string;
}
```

#### **DashboardStats**
```typescript
{
  totalClientes: number;
  clientesActivos: number;
  clientesPropensos: number;
  tasaRetencion: number;
}
```

### Interceptores

#### **ErrorInterceptor** (`src/app/interceptors/error.interceptor.ts`)
- Manejo global de errores HTTP
- Transformación de errores del backend
- Integración con sistema de notificaciones

## 🎯 Rutas de Navegación

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Página de inicio |
| `/dashboard` | Dashboard | Sistema de análisis de clientes |

## 🌐 Endpoints del Backend

El frontend consume los siguientes endpoints:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/clientes/{customerId}` | Obtener cliente por ID |
| GET | `/api/clientes/correo/{correo}` | Buscar por correo |
| GET | `/api/clientes/documento/{documento}` | Buscar por documento |
| GET | `/api/clientes/{customerId}/exists` | Verificar existencia |
| GET | `/api/clientes/{customerId}/predict` | Obtener predicción de churn |
| GET | `/api/clientes/estadisticas` | Estadísticas globales |
| GET | `/api/clientes/en-riesgo` | Clientes en riesgo |
| POST | `/api/clientes` | Crear nuevo cliente |

## 🎨 Estilos y Diseño

El proyecto utiliza **CSS Variables** para un sistema de diseño consistente:

- **Colores**: Paleta definida con variables CSS
- **Espaciado**: Sistema de spacing consistente
- **Tipografía**: Escalas de tamaño y peso de fuente
- **Sombras**: Niveles de elevación
- **Bordes**: Radios y colores de bordes

Los estilos globales se encuentran en [`src/styles.css`](src/styles.css).

## 🔧 Configuración Adicional

### Prettier

El proyecto incluye configuración de Prettier para formateo automático:

```json
{
  "printWidth": 100,
  "singleQuote": true
}
```

### TypeScript

Configurado con strict mode para máxima seguridad de tipos. Ver [`tsconfig.json`](tsconfig.json).

### Package Manager

El proyecto está configurado para usar **npm 11.6.2**. Si usas otra versión, puedes actualizar el campo `packageManager` en `package.json`.

## 🐛 Solución de Problemas

### El servidor no inicia
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### Error de CORS
Verifica que el backend tenga configurado CORS para permitir peticiones desde `http://localhost:4200`.

### Errores de compilación TypeScript
```bash
# Verifica la versión de TypeScript
npx tsc --version

# Si hay problemas, reinstala
npm install typescript@~5.9.2
```

### El backend no responde
- Verifica que el backend esté corriendo en `http://localhost:8080`
- Revisa los logs del navegador (F12) para ver errores de red
- Confirma que la URL del API en `customer.ts` sea correcta

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| @angular/core | ^21.0.0 | Framework principal |
| @angular/common | ^21.0.0 | Directivas y pipes comunes |
| @angular/router | ^21.0.0 | Sistema de navegación |
| @angular/forms | ^21.0.0 | Formularios reactivos |
| rxjs | ~7.8.0 | Programación reactiva |
| typescript | ~5.9.2 | Lenguaje tipado |
| vitest | ^4.0.8 | Framework de testing |

## 🚀 Despliegue

### Build de Producción

1. Genera la build optimizada:
```bash
npm run build
```

2. Los archivos se generan en `dist/`. Puedes servirlos con cualquier servidor web estático:

```bash
# Ejemplo con http-server
npx http-server dist/FrontEnd/browser -p 8080
```

### Variables de Entorno

Para diferentes entornos (dev, staging, prod), modifica la URL del API en el servicio o implementa un sistema de configuración basado en environment files.

## 👥 Desarrollo

### Agregar un Nuevo Componente

```bash
ng generate component components/mi-componente --standalone
```

### Agregar un Nuevo Servicio

```bash
ng generate service services/mi-servicio
```

### Agregar un Nuevo Modelo

Crea un archivo en `src/app/models/`:

```typescript
export interface MiModelo {
  id: string;
  nombre: string;
}
```

## 📝 Licencia

Este proyecto fue desarrollado como parte del Hackaton ONE - Equipo 46.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ por el Equipo 46 - Hackaton ONE**
