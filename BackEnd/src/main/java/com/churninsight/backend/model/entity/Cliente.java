package com.churninsight.backend.model.entity;

import jakarta.persistence.*;

/**
 * Entidad que representa un cliente.
 */
@Entity
@Table(name = "clientes")
@SuppressWarnings("unused")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private boolean propensoAChurn;

    public Cliente() {}

    public Cliente(String nombre, boolean propensoAChurn) {
        this.nombre = nombre;
        this.propensoAChurn = propensoAChurn;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public boolean isPropensoAChurn() { return propensoAChurn; }
    public void setPropensoAChurn(boolean propensoAChurn) { this.propensoAChurn = propensoAChurn; }
}
