# 📊 Diccionario de Datos  
## Proyecto: ChurnInsight — Predicción de Cancelación de Clientes

### 📁 Dataset
**Nombre:** Telco Customer Churn  
**Fuente:** Kaggle  
**URL:** https://www.kaggle.com/datasets/blastchar/telco-customer-churn  

---

## 🎯 Variable Objetivo

| Variable | Tipo | Descripción |
|--------|------|-------------|
| `Churn` | Categórica (Binaria) | Indica si el cliente canceló el servicio (`Yes` / `No`) |

---

## 📋 Diccionario de Variables

| Variable | Tipo | Descripción | Distribución / Observaciones |
|--------|------|------------|------------------------------|
| `customerID` | Identificador | ID único del cliente | ❌ No aporta al modelo |
| `gender` | Categórica | Género del cliente | Masculino y femenino distribuidos de forma similar |
| `SeniorCitizen` | Numérica (0/1) | Indica si el cliente es adulto mayor | Mayoría: No |
| `Partner` | Categórica | Indica si el cliente tiene pareja | Mayoría: No |
| `Dependents` | Categórica | Indica si el cliente tiene dependientes | Mayoría: No |
| `tenure` | Numérica | Tiempo que el cliente ha estado con la empresa (meses) | Variable clave para churn |
| `PhoneService` | Categórica | Indica si el cliente tiene servicio telefónico | Mayoría: Sí |
| `MultipleLines` | Categórica | Indica si tiene múltiples líneas telefónicas | Más común: No |
| `InternetService` | Categórica | Tipo de servicio de internet | Fibra óptica es el más común |
| `OnlineSecurity` | Categórica | Seguridad en línea contratada | Mayoría: No |
| `OnlineBackup` | Categórica | Servicio de backup en línea | Mayoría: No |
| `DeviceProtection` | Categórica | Protección de dispositivos | Mayoría: No |
| `TechSupport` | Categórica | Soporte técnico | Mayoría: No |
| `StreamingTV` | Categórica | Servicio de streaming de TV | Mayoría: No |
| `StreamingMovies` | Categórica | Servicio de streaming de películas | Mayoría: No |
| `Contract` | Categórica | Tipo de contrato | Más común: Mes a mes |
| `PaperlessBilling` | Categórica | Facturación sin papel | Mayoría: Sí |
| `PaymentMethod` | Categórica | Método de pago | Más común: Cheque electrónico |
| `MonthlyCharges` | Numérica | Cargo mensual del cliente | Valores más altos asociados a churn |
| `TotalCharges` | Numérica | Total facturado al cliente | Requiere conversión a numérico |

---

## 🔍 Observaciones Generales
- Los contratos **mes a mes** presentan mayor tasa de cancelación.
- Clientes con **mayores cargos mensuales** tienden a cancelar más.
- Variables como `tenure`, `Contract` y `InternetService` son altamente predictivas.
- Varias variables categóricas requieren **encoding**.
- `TotalCharges` contiene valores vacíos que deben tratarse.

---

## 🚀 Uso en el Proyecto
Este dataset se utiliza para:
- Análisis exploratorio de datos (EDA)
- Ingeniería de features
- Entrenamiento de modelos de clasificación
- Exportación del pipeline para consumo vía API
