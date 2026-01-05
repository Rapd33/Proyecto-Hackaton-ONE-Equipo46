package com.churninsight.backend.model.dto;

/**
 * DTO para la respuesta completa de predicción de churn
 * Incluye datos del cliente, predicción del ML y estrategia de retención
 */
public class PrediccionChurnDTO {

    // Datos básicos del cliente
    private String customerId;
    private String nombreCompleto;
    private String correoElectronico;
    private Integer documentoIdentidad;

    // Datos de la predicción del ML
    private Integer prediction;           // 0 = No churn, 1 = Churn
    private Double churnProbability;      // 0.0 - 1.0
    private String riskLevel;             // "Alto" o "Bajo"

    // Estrategia agregada por el backend
    private String estrategiaRetencion;
    private String recomendacion;

    public PrediccionChurnDTO() {}

    public PrediccionChurnDTO(String customerId, String nombreCompleto, String correoElectronico,
                            Integer documentoIdentidad, Integer prediction,
                            Double churnProbability, String riskLevel,
                            String estrategiaRetencion, String recomendacion) {
        this.customerId = customerId;
        this.nombreCompleto = nombreCompleto;
        this.correoElectronico = correoElectronico;
        this.documentoIdentidad = documentoIdentidad;
        this.prediction = prediction;
        this.churnProbability = churnProbability;
        this.riskLevel = riskLevel;
        this.estrategiaRetencion = estrategiaRetencion;
        this.recomendacion = recomendacion;
    }

    // Getters y Setters
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public Integer getDocumentoIdentidad() {
        return documentoIdentidad;
    }

    public void setDocumentoIdentidad(Integer documentoIdentidad) {
        this.documentoIdentidad = documentoIdentidad;
    }

    public Integer getPrediction() {
        return prediction;
    }

    public void setPrediction(Integer prediction) {
        this.prediction = prediction;
    }

    public Double getChurnProbability() {
        return churnProbability;
    }

    public void setChurnProbability(Double churnProbability) {
        this.churnProbability = churnProbability;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public String getEstrategiaRetencion() {
        return estrategiaRetencion;
    }

    public void setEstrategiaRetencion(String estrategiaRetencion) {
        this.estrategiaRetencion = estrategiaRetencion;
    }

    public String getRecomendacion() {
        return recomendacion;
    }

    public void setRecomendacion(String recomendacion) {
        this.recomendacion = recomendacion;
    }
}
