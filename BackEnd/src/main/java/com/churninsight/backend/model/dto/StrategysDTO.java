package com.churninsight.backend.model.dto;

import java.util.List;

/**
 * DTO para enviar las estrategias de retención al cliente
 */
public class StrategysDTO {

    private String nivelRiesgo;
    private String rangoProbabilidad;
    private String estrategiaPrincipal;
    private List<EstrategiaDetalleDTO> estrategiasDetalladas;

    public StrategysDTO() {}

    public StrategysDTO(String nivelRiesgo, String rangoProbabilidad, String estrategiaPrincipal,
                       List<EstrategiaDetalleDTO> estrategiasDetalladas) {
        this.nivelRiesgo = nivelRiesgo;
        this.rangoProbabilidad = rangoProbabilidad;
        this.estrategiaPrincipal = estrategiaPrincipal;
        this.estrategiasDetalladas = estrategiasDetalladas;
    }

    // Getters y Setters
    public String getNivelRiesgo() {
        return nivelRiesgo;
    }

    public void setNivelRiesgo(String nivelRiesgo) {
        this.nivelRiesgo = nivelRiesgo;
    }

    public String getRangoProbabilidad() {
        return rangoProbabilidad;
    }

    public void setRangoProbabilidad(String rangoProbabilidad) {
        this.rangoProbabilidad = rangoProbabilidad;
    }

    public String getEstrategiaPrincipal() {
        return estrategiaPrincipal;
    }

    public void setEstrategiaPrincipal(String estrategiaPrincipal) {
        this.estrategiaPrincipal = estrategiaPrincipal;
    }

    public List<EstrategiaDetalleDTO> getEstrategiasDetalladas() {
        return estrategiasDetalladas;
    }

    public void setEstrategiasDetalladas(List<EstrategiaDetalleDTO> estrategiasDetalladas) {
        this.estrategiasDetalladas = estrategiasDetalladas;
    }

    /**
     * DTO interno para el detalle de cada estrategia
     */
    public static class EstrategiaDetalleDTO {
        private int numero;
        private String titulo;
        private String descripcion;
        private String descuento;

        public EstrategiaDetalleDTO() {}

        public EstrategiaDetalleDTO(int numero, String titulo, String descripcion, String descuento) {
            this.numero = numero;
            this.titulo = titulo;
            this.descripcion = descripcion;
            this.descuento = descuento;
        }

        public int getNumero() {
            return numero;
        }

        public void setNumero(int numero) {
            this.numero = numero;
        }

        public String getTitulo() {
            return titulo;
        }

        public void setTitulo(String titulo) {
            this.titulo = titulo;
        }

        public String getDescripcion() {
            return descripcion;
        }

        public void setDescripcion(String descripcion) {
            this.descripcion = descripcion;
        }

        public String getDescuento() {
            return descuento;
        }

        public void setDescuento(String descuento) {
            this.descuento = descuento;
        }
    }
}
