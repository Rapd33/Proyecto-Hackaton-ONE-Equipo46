package com.churninsight.backend.model.entity;

import jakarta.persistence.*;

/**
 * Entidad que representa un servicio ofrecido por la empresa.
 * Se mapea a la tabla "servicios" en la base de datos.
 */
@Entity
@Table(name = "servicios")
@SuppressWarnings("unused")
public class Servicio {

    /** Identificador único autogenerado en la base de datos */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre del servicio (ej. "Internet 100MB", "Telefonía móvil") */
    private String nombre;

    /** Precio del servicio en moneda local */
    private Double precio;

    /** Indica si el servicio está activo (true = disponible, false = descontinuado) */
    private boolean activo;

    // Constructores
    public Servicio() {}

    public Servicio(String nombre, Double precio, boolean activo) {
        this.nombre = nombre;
        this.precio = precio;
        this.activo = activo;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public Double getPrecio() { return precio; }
    public void setPrecio(Double precio) { this.precio = precio; }

    public boolean isActivo() { return activo; }
    public void setActivo(boolean activo) { this.activo = activo; }
}
