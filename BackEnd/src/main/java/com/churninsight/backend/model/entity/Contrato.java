package com.churninsight.backend.model.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * Entidad que representa un contrato entre un cliente y un servicio.
 * Se mapea a la tabla "contratos" en la base de datos.
 */
@Entity
@Table(name = "contratos")
@SuppressWarnings("unused")

public class Contrato { // ...

    /** Identificador único autogenerado */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Relación con el cliente */
    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    /** Relación con el servicio */
    @ManyToOne
    @JoinColumn(name = "servicio_id", nullable = false)
    private Servicio servicio;

    /** Fecha de inicio del contrato */
    private LocalDate fechaInicio;

    /** Fecha de finalización del contrato */
    private LocalDate fechaFin;

    /** Estado del contrato (ej. "Activo", "Finalizado") */
    private String estado;

    public Contrato() {}

    public Contrato(Cliente cliente, Servicio servicio, LocalDate fechaInicio, LocalDate fechaFin, String estado) {
        this.cliente = cliente;
        this.servicio = servicio;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Servicio getServicio() { return servicio; }
    public void setServicio(Servicio servicio) { this.servicio = servicio; }

    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDate getFechaFin() { return fechaFin; }
    public void setFechaFin(LocalDate fechaFin) { this.fechaFin = fechaFin; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

}
