package com.churninsight.backend.model.dto;

/**
 * DTO para las estadísticas generales del dashboard
 */
public class DashboardStatsDTO {

    private Integer totalClientes;
    private Integer clientesActivos;
    private Integer clientesDesertados;
    private Double tasaRetencion;
    private Integer clientesRiesgoAlto;
    private Integer clientesRiesgoMedio;
    private Integer clientesRiesgoBajo;

    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(Integer totalClientes, Integer clientesActivos, Integer clientesDesertados,
                             Double tasaRetencion, Integer clientesRiesgoAlto, Integer clientesRiesgoMedio,
                             Integer clientesRiesgoBajo) {
        this.totalClientes = totalClientes;
        this.clientesActivos = clientesActivos;
        this.clientesDesertados = clientesDesertados;
        this.tasaRetencion = tasaRetencion;
        this.clientesRiesgoAlto = clientesRiesgoAlto;
        this.clientesRiesgoMedio = clientesRiesgoMedio;
        this.clientesRiesgoBajo = clientesRiesgoBajo;
    }

    // Getters y Setters

    public Integer getTotalClientes() {
        return totalClientes;
    }

    public void setTotalClientes(Integer totalClientes) {
        this.totalClientes = totalClientes;
    }

    public Integer getClientesActivos() {
        return clientesActivos;
    }

    public void setClientesActivos(Integer clientesActivos) {
        this.clientesActivos = clientesActivos;
    }

    public Integer getClientesDesertados() {
        return clientesDesertados;
    }

    public void setClientesDesertados(Integer clientesDesertados) {
        this.clientesDesertados = clientesDesertados;
    }

    public Double getTasaRetencion() {
        return tasaRetencion;
    }

    public void setTasaRetencion(Double tasaRetencion) {
        this.tasaRetencion = tasaRetencion;
    }

    public Integer getClientesRiesgoAlto() {
        return clientesRiesgoAlto;
    }

    public void setClientesRiesgoAlto(Integer clientesRiesgoAlto) {
        this.clientesRiesgoAlto = clientesRiesgoAlto;
    }

    public Integer getClientesRiesgoMedio() {
        return clientesRiesgoMedio;
    }

    public void setClientesRiesgoMedio(Integer clientesRiesgoMedio) {
        this.clientesRiesgoMedio = clientesRiesgoMedio;
    }

    public Integer getClientesRiesgoBajo() {
        return clientesRiesgoBajo;
    }

    public void setClientesRiesgoBajo(Integer clientesRiesgoBajo) {
        this.clientesRiesgoBajo = clientesRiesgoBajo;
    }
}
