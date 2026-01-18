# 📊 Informe Final – ChurnInsight (Telco Customer Churn)

## 🌐 Proyecto

**Nombre:** ChurnInsight — Predicción de Cancelación de Clientes
**Dominio:** Telecomunicaciones / Servicios por Suscripción
**Equipo:** Equipo 46 – Hackathon ONE / NoCountry

---

## 🚀 1. Resumen Ejecutivo

El presente informe documenta el tratamiento realizado a los datos hasta llegar al modelo y propuesta de estrategias por rangos de probabilidad del proyecto **ChurnInsight**, cuyo objetivo es **predecir la probabilidad de cancelación (churn) de clientes** de una empresa de telecomunicaciones, el modelo se dispone en un archivo pkl para consumo mediante microservicio.

A partir del dataset **Telco Customer Churn**, se realizó un proceso completo de:

* Análisis exploratorio de datos (EDA)
* Selección y justificación de variables
* Feature engineering
* Entrenamiento y evaluación de modelos
* Construcción de un pipeline reproducible
* Serialización del modelo para integración con Backend
* Estrategias propuestas de retención de cliente

El resultado final es un **modelo funcional**, interpretable y listo para ser consumido por un microservicio.

---

## 🧠 2. Objetivo del Proyecto

* Identificar clientes con **alto riesgo de cancelación**.
* Retornar una **predicción binaria** (cancela / no cancela) junto con una **probabilidad asociada**.
* Facilitar la toma de decisiones mediante **estrategias de retención basadas en rangos de riesgo**.

---

## 📂 3. Dataset Utilizado

* **Fuente:** Kaggle – Telco Customer Churn
* **Registros:** ~7.000 clientes
* **Variable objetivo:** `Churn` (Yes / No)
* **Tipo de variables:** numéricas, binarias y categóricas

Variables clave incluyen:

* Antigüedad del cliente (`tenure`)
* Cargos mensuales (`MonthlyCharges`)
* Tipo de contrato (`Contract`)
* Método de pago (`PaymentMethod`)
* Servicios adicionales (`TechSupport`, `OnlineSecurity`, etc.)

---

## 🔍 4. Análisis Exploratorio de Datos (EDA)

Durante el EDA se identificaron patrones claros asociados al churn:

* Clientes con **contrato mes a mes** , driver más crítico presentan la mayor tasa de cancelación. Tasa de churn alta (42.71%).
* **Menor antigüedad (tenure bajo)** está fuertemente asociada al churn. (media de 18 meses vs. 37.6 meses para los que no cancelan)
* **Cargos mensuales altos** incrementan la probabilidad de cancelación.
* Servicios como **TechSupport y OnlineSecurity** reducen significativamente el churn.
* Variables como `gender` o servicios de streaming mostraron **bajo impacto predictivo**.

Este análisis permitió **descartar variables sin valor predictivo** y reducir ruido en el modelo.

**Segmento de Mayor Riesgo**: Clientes nuevos, con contrato mensual, factura alta, sin soporte ni seguridad, que pagan con cheque electrónico.

---

## 🧩 5. Selección Final de Variables

| Variable        | Tipo       | Uso | Justificación                      |
| --------------- | ---------- | --- | ---------------------------------- |
| tenure          | Numérica   | ✅   | Relación inversa fuerte con churn  |
| MonthlyCharges  | Numérica   | ✅   | Cargos altos aumentan churn        |
| SeniorCitizen   | Binaria    | ✅   | Impacto moderado                   |
| Contract        | Categórica | ✅   | Month-to-month concentra churn     |
| InternetService | Categórica | ✅   | Fibra óptica con mayor cancelación |
| PaymentMethod   | Categórica | ✅   | Electronic check asociado a churn  |
| TechSupport     | Categórica | ✅   | Reduce churn                       |
| OnlineSecurity  | Categórica | ⚠️  | Impacto secundario                 |
| TotalCharges    | Numérica   | ⚠️  | Resume relación cliente-empresa    |
| customerID      | ID         | ❌   | No aporta información predictiva   |

---

## 🛠️ 6. Feature Engineering y Pipeline

Se construyó un **pipeline completo** utilizando `scikit-learn`, asegurando reproducibilidad y correcta integración con Backend:

* **Variables numéricas:** escaladas con `StandardScaler`
* **Variables binarias:** mapeadas a 0 / 1
* **Variables categóricas:** transformadas con `OneHotEncoder`

Todo el preprocesamiento y el modelo se integraron mediante un **ColumnTransformer + Pipeline**, evitando fugas de información.

---

## 🤖 7. Modelado y Evaluación

### Cuadro Comparativo de Modelos Evaluados (Métricas Clave para la Clase 'Churn')

| Modelo                  | Accuracy | Precision (Churn) | Recall (Churn) | F1-Score (Churn) |
| :---------------------- | :------- | :---------------- | :------------- | :--------------- |
| Regresión Logística     | 0.79     | 0.63              | 0.53           | 0.58             |
| Random Forest           | 0.77     | 0.59              | 0.47           | 0.52             |
| Gradient Boosting       | **0.80** | **0.66**          | 0.52           | **0.59**         |
| XGBoost                 | 0.79     | 0.61              | 0.52           | 0.56             |
| LightGBM                | **0.80** | 0.64              | **0.54**       | **0.59**         |
| CatBoost                | **0.80** | 0.65              | 0.53           | 0.58             |

### Identificación del Mejor Modelo para Clientes con Churn

Basándonos en la evaluación de los modelos, el **LightGBM** y **Gradient Boosting** son los modelos más prometedores para la predicción de churn, ambos alcanzando la mayor precisión general (Accuracy) del 80% y un F1-Score de 0.59 para la clase 'Churn'.

*   **LightGBM** es buen aalternativa si el objetivo principal es **maximizar la identificación de clientes que realmente harán churn** (minimizar los falsos negativos), ya que obtuvo el `Recall (Churn)` más alto (0.54). Esto es crucial para estrategias de retención proactivas, donde se busca no dejar escapar a ningún cliente en riesgo.

*   **Gradient Boosting** es una excelente alternativa si se prioriza tener **predicciones de churn más fiables** (minimizar los falsos positivos), dado que obtuvo la `Precision (Churn)` más alta (0.66). Esto asegura que los recursos de retención se dirijan a clientes con una probabilidad muy alta de abandono real.

### Cuadro Comparativo de Modelos (Métricas Clave para la Clase 'Churn')

| Modelo                  | Accuracy | Precision (Churn) | Recall (Churn) | F1-Score (Churn) |
| :---------------------- | :------- | :---------------- | :------------- | :--------------- |
| Regresión Logística     | 0.79     | 0.63              | 0.53           | 0.58             |
| Random Forest           | 0.77     | 0.59              | 0.47           | 0.52             |
| Gradient Boosting       | **0.80** | **0.66**          | 0.52           | **0.59**         |
| XGBoost                 | 0.79     | 0.61              | 0.52           | 0.56             |
| LightGBM                | **0.80** | 0.64              | **0.54**       | **0.59**         |
| CatBoost                | **0.80** | 0.65              | 0.53           | 0.58             |



El modelo **Gradient Boosting** se destacó como uno de los modelos con el mejor desempeño global para la predicción de churn. Sus métricas clave para la clase 'Churn' son:

*   **Accuracy:** 0.80, siendo el más alto entre los modelos evaluados, lo que indica una buena capacidad de clasificación general.
*   **Precision (Churn):** 0.66, es la más alta entre todos los modelos. Esto significa que cuando el Gradient Boosting predice que un cliente hará churn, hay un 66% de probabilidad de que esa predicción sea correcta. Es muy bueno para minimizar los falsos positivos (clientes que el modelo predice que se van, pero en realidad no lo hacen).
*   **Recall (Churn):** 0.52, lo que indica que el modelo es capaz de identificar al 52% de los clientes que realmente abandonaron el servicio. Aunque no es el recall más alto (LightGBM obtuvo 0.54), es un valor sólido que, combinado con su alta precisión, resulta en un buen balance.
*   **F1-Score (Churn):** 0.59, compartido con LightGBM como el más alto. Este valor refleja un excelente equilibrio entre la precisión y el recall para la clase 'Churn'.

**Conclusión para Gradient Boosting:**

El modelo Gradient Boosting es una opción robusta para la predicción de churn, especialmente si la estrategia de negocio prioriza la **confiabilidad de las alertas de churn** (es decir, reducir al mínimo las intervenciones innecesarias sobre clientes que no tienen intención real de irse). Su alta precisión para la clase 'Churn' asegura que los recursos de retención se dirijan a los clientes con mayor probabilidad de abandono real, optimizando la eficacia de las campañas.


---

## 📈 8. Estrategia de Riesgo y Negocio

El output del modelo se conecta con una **tabla de estrategias**, segmentando clientes en **rangos de probabilidad**:

* Riesgo muy alto → contacto inmediato + incentivo
* Riesgo medio → campaña preventiva
* Riesgo bajo → monitoreo

Esto permite traducir el modelo en **acciones concretas de negocio**.

# G. Estrategias Propuestas de Retención según Probabilidad de Churn

| Rango de Probabilidad de Churn | Nivel de Riesgo | Estrategia de Retención Recomendada |
|-------------------------------|----------------|--------------------------------------|
| 0.0% - 20.0% | Bajo | **Monitoreo Pasivo:** Cliente fiel. Ofrecer encuestas de satisfacción para feedback proactivo, destacar beneficios de lealtad y programas de referidos. Mantener la comunicación estándar.<br><br>**Estrategia 1 – Programas de Lealtad y Reconocimiento:** Recompensar a los clientes a largo plazo con beneficios exclusivos (no gravosos), como regalos de servicios por tiempo limitado, acceso anticipado a nuevas funciones o descuentos especiales.<br><br>**Estrategia 2 – Feedback no invasivo:** Realizar seguimientos periódicos para conocer su nivel de satisfacción sin generar saturación, evitando un efecto contraproducente. |
| 20.1% - 40.0% | Leve | **Comunicación Personalizada:** Ofrecer incentivos menores y ofertas segmentadas (emails, notificaciones) para fortalecer el compromiso. Destacar la propuesta de valor y beneficios del servicio, especialmente en los primeros 3 a 6 meses.<br><br>**Estrategia 1 – Refuerzo de Valor Segmentado:** Resaltar funciones que el cliente ya utiliza y nuevas capacidades que pueden mejorar su experiencia.<br><br>**Estrategia 2 – Sistema de Alerta Temprana:** Detectar cambios sutiles en patrones de uso o interacciones que indiquen insatisfacción y actuar proactivamente.<br><br>**Estrategia 3 – Comunicación Personalizada:** Enviar consejos de uso e incentivos pequeños pero relevantes para fomentar el compromiso continuo. |
| 40.1% - 60.0% | Moderado | **Contacto Proactivo:** Realizar llamadas de seguimiento desde servicio al cliente. Ofrecer paquetes con TechSupport + OnlineSecurity y descuentos moderados. Investigar posibles fricciones en los pagos.<br><br>**Estrategia 1 – Contacto Directo:** Intervención de un representante de éxito del cliente para identificar y resolver puntos de fricción específicos.<br><br>**Estrategia 2 – Campañas con Incentivos:** Descuentos temporales o acceso a funciones premium para reactivar el interés.<br><br>**Estrategia 3 – Contenido Educativo:** Proveer webinars y tutoriales sobre funcionalidades poco utilizadas para aumentar adopción y valor percibido. |
| 60.1% - 80.0% | Alto | **Intervención Focalizada:** Contacto activo del equipo de retención. Análisis de problemas recientes y oferta de soluciones de alto valor. Incentivar contratos anuales y bundles con TechSupport + OnlineSecurity.<br><br>**Estrategia 1 – Ofertas de Retención:** Descuentos significativos, beneficios por extensión de contrato o upgrades gratuitos mediante negociación directa con agentes humanos.<br><br>**Estrategia 2 – Análisis Profundo y Feedback:** Evaluar historial de uso y realizar entrevistas directas para identificar causas exactas del riesgo de abandono.<br><br>**Estrategia 3 – Campañas de Reenganche:** Compartir casos de éxito y testimonios de clientes similares para reforzar el valor del servicio. |
| 80.1% - 100.0% | Muy Alto / Abandono Inminente | **Intervención Intensiva y de Rescate:** Contacto inmediato con equipo especializado. Ofrecer ofertas agresivas de retención (descuentos profundos, upgrades, planes a medida). Eliminar fricción en pagos y aplicar programas específicos para seniors.<br><br>**Estrategia 1 – Retención de Último Recurso:** Ofertas personalizadas y agresivas manteniendo un balance costo–beneficio.<br><br>**Estrategia 2 – Entrevistas de Salida:** Recolección exhaustiva de feedback para comprender causas profundas del abandono.<br><br>**Estrategia 3 – Ruta de Reactivación:** Proceso de salida fluido acompañado de un camino claro y atractivo para una futura reactivación. |

---

## 📦 9. Serialización e Integración

* El pipeline completo fue **serializado en formato `.pkl`** usando `joblib`.
* El modelo es consumido por un **microservicio FastAPI**, que expone un endpoint `/predict`.
* La API retorna:

```json
{
  "prevision": "Va a cancelar",
  "probabilidad": 0.81
}
```

---

## ✅ 10. Conclusiones

* El churn puede ser **anticipado de forma confiable** usando variables de comportamiento y contrato.
* La integración DS ↔ Backend permite llevar el modelo a un entorno cercano a producción.
* ChurnInsight demuestra el valor de la ciencia de datos aplicada a problemas reales de negocio.

---

## 📝 Licencia

Este proyecto fue desarrollado como parte del Hackaton ONE - Equipo 46.

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ por el Equipo 46 - Hackaton ONE**
