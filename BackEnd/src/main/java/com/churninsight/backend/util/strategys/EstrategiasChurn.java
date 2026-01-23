package com.churninsight.backend.util.strategys;

import java.util.List;
import java.util.ArrayList;

/**
 * Clase utilitaria que contiene las estrategias de retención de clientes
 * basadas en el nivel de riesgo de churn.
 *
 * Niveles de riesgo:
 * - Bajo: 0.00% - 33.33%
 * - Medio: 33.34% - 66.66%
 * - Alto: 66.67% - 100.00%
 */
public class EstrategiasChurn {

    // Constantes para los rangos de probabilidad
    public static final double UMBRAL_BAJO = 0.3333;
    public static final double UMBRAL_MEDIO = 0.6666;

    /**
     * Determina el nivel de riesgo basado en la probabilidad de churn
     */
    public static String determinarNivelRiesgo(Double probabilidad) {
        if (probabilidad == null) {
            return "Bajo";
        }
        if (probabilidad <= UMBRAL_BAJO) {
            return "Bajo";
        } else if (probabilidad <= UMBRAL_MEDIO) {
            return "Medio";
        } else {
            return "Alto";
        }
    }

    /**
     * Obtiene el rango de probabilidad como texto
     */
    public static String obtenerRangoProbabilidad(String nivelRiesgo) {
        return switch (nivelRiesgo.toLowerCase()) {
            case "bajo" -> "0.00% - 33.33%";
            case "medio" -> "33.34% - 66.66%";
            case "alto" -> "66.67% - 100.00%";
            default -> "No definido";
        };
    }

    /**
     * Obtiene la estrategia principal de retención según el nivel de riesgo
     */
    public static String obtenerEstrategiaPrincipal(String nivelRiesgo) {
        return switch (nivelRiesgo.toLowerCase()) {
            case "bajo" -> "Monitoreo y Fidelización: Cliente estable. Mantener comunicación estándar, " +
                    "ofrecer encuestas de satisfacción periódicas y destacar programas de lealtad y referidos.";
            case "medio" -> "Intervención Proactiva: Contacto directo mediante llamadas de seguimiento. " +
                    "Ofrecer incentivos personalizados como descuentos moderados (15-25%), paquetes con " +
                    "TechSupport + OnlineSecurity. Investigar posibles fricciones en pagos o uso del servicio.";
            case "alto" -> "Intervención Intensiva de Rescate: Contacto inmediato con equipo especializado. " +
                    "Ofrecer ofertas agresivas de retención (descuentos profundos 30-50%, upgrades significativos, " +
                    "planes a medida). Análisis profundo de causas de insatisfacción. " +
                    "Programas específicos para segmentos vulnerables.";
            default -> "Estrategia no definida para el nivel de riesgo proporcionado.";
        };
    }

    /**
     * Obtiene la lista de estrategias detalladas según el nivel de riesgo
     */
    public static List<EstrategiaDetalle> obtenerEstrategiasDetalladas(String nivelRiesgo) {
        List<EstrategiaDetalle> estrategias = new ArrayList<>();

        switch (nivelRiesgo.toLowerCase()) {
            case "bajo" -> {
                estrategias.add(new EstrategiaDetalle(
                    1,
                    "Programas de Lealtad y Reconocimiento",
                    "Recompensar a los clientes con beneficios exclusivos como acceso anticipado a nuevas " +
                    "funciones, regalos de servicios por tiempo limitado o descuentos especiales para " +
                    "reforzar su compromiso.",
                    null
                ));
                estrategias.add(new EstrategiaDetalle(
                    2,
                    "Feedback No Invasivo",
                    "Realizar seguimientos periódicos para conocer su nivel de satisfacción sin saturarlos, " +
                    "identificando posibles problemas a tiempo mientras se mantiene una experiencia positiva.",
                    null
                ));
                estrategias.add(new EstrategiaDetalle(
                    3,
                    "Comunicación de Valor",
                    "Enviar comunicaciones personalizadas destacando los beneficios del servicio que utilizan " +
                    "activamente y nuevas capacidades que podrían mejorar su experiencia.",
                    null
                ));
            }
            case "medio" -> {
                estrategias.add(new EstrategiaDetalle(
                    1,
                    "Contacto Directo y Resolución de Problemas",
                    "Iniciar contacto a través de un representante de éxito del cliente para comprender " +
                    "puntos de fricción específicos y ofrecer soluciones o soporte personalizado.",
                    null
                ));
                estrategias.add(new EstrategiaDetalle(
                    2,
                    "Campañas de Compromiso con Incentivos",
                    "Lanzar campañas con incentivos significativos como descuentos por tiempo limitado " +
                    "o acceso temporal a funciones premium para reavivar el interés.",
                    "15-25%"
                ));
                estrategias.add(new EstrategiaDetalle(
                    3,
                    "Contenido Educativo y Adopción de Funciones",
                    "Proporcionar recursos educativos (webinars, tutoriales) centrados en funciones que " +
                    "podrían no estar utilizando, demostrando cómo el servicio puede satisfacer mejor sus necesidades.",
                    null
                ));
                estrategias.add(new EstrategiaDetalle(
                    4,
                    "Migración a Contratos Anuales",
                    "Proponer migrar clientes mensuales a contratos anuales con descuentos atractivos para " +
                    "aumentar el compromiso a largo plazo.",
                    "10-20%"
                ));
            }
            case "alto" -> {
                estrategias.add(new EstrategiaDetalle(
                    1,
                    "Ofertas de Retención Agresivas",
                    "Presentar ofertas de retención atractivas como descuentos significativos, beneficios " +
                    "por extensión de contrato o actualizaciones gratuitas. Usar agentes humanos para evitar " +
                    "sensación de distancia con el cliente.",
                    "30-50%"
                ));
                estrategias.add(new EstrategiaDetalle(
                    2,
                    "Análisis Profundo y Retroalimentación",
                    "Realizar análisis detallados del historial de uso y entrevistas directas para identificar " +
                    "las razones exactas de su alta probabilidad de abandono y abordarlas específicamente.",
                    null
                ));
                estrategias.add(new EstrategiaDetalle(
                    3,
                    "Campañas de Reenganche Personalizadas",
                    "Compartir casos de éxito y testimonios de clientes similares que superaron desafíos, " +
                    "ilustrando el valor que podrían perder al abandonar el servicio.",
                    null
                ));
                estrategias.add(new EstrategiaDetalle(
                    4,
                    "Entrevistas de Salida y Ruta de Reactivación",
                    "Para quienes deciden abandonar, realizar entrevistas de salida para obtener información " +
                    "crítica y proporcionar un camino fácil para futura reactivación si sus circunstancias cambian.",
                    null
                ));
            }
            default -> estrategias.add(new EstrategiaDetalle(
                0,
                "Sin estrategia definida",
                "No se encontró una estrategia para el nivel de riesgo proporcionado.",
                null
            ));
        }

        return estrategias;
    }

    /**
     * Clase interna para representar el detalle de una estrategia
     */
    public static class EstrategiaDetalle {
        private int numero;
        private String titulo;
        private String descripcion;
        private String descuento;

        public EstrategiaDetalle(int numero, String titulo, String descripcion, String descuento) {
            this.numero = numero;
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.descuento = descuento;
        }

        public int getNumero() {
            return numero;
        }

        public String getTitulo() {
            return titulo;
        }

        public String getDescripcion() {
            return descripcion;
        }

        public String getDescuento() {
            return descuento;
        }
    }
}
