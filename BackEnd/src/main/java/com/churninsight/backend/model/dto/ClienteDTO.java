package com.churninsight.backend.model.dto;

/**
 * DTO simplificado para mostrar información básica del cliente en el frontend
 */
public class ClienteDTO {

    private String customerId;
    private String nombreCompleto;
    private String correoElectronico;
    private Integer documentoIdentidad;
    private Boolean propensoAChurn;

    public ClienteDTO() {}

    public ClienteDTO(String customerId, String nombreCompleto, String correoElectronico,
                    Integer documentoIdentidad, Boolean propensoAChurn) {
        this.customerId = customerId;
        this.nombreCompleto = nombreCompleto;
        this.correoElectronico = correoElectronico;
        this.documentoIdentidad = documentoIdentidad;
        this.propensoAChurn = propensoAChurn;
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

    public Boolean getPropensoAChurn() {
        return propensoAChurn;
    }

    public void setPropensoAChurn(Boolean propensoAChurn) {
        this.propensoAChurn = propensoAChurn;
    }
}
