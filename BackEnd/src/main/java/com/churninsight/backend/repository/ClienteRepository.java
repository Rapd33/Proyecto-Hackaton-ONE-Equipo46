package com.churninsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.churninsight.backend.model.entity.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

    Optional<Cliente> findByCorreoElectronico(String correoElectronico);

    Optional<Cliente> findByDocumentoIdentidad(Integer documentoIdentidad);

    List<Cliente> findByNombreContaining(String parteDelNombre);

    List<Cliente> findByChurn(String churn);

    /**
     * Contar clientes activos (churn = 'No')
     */
    @Query("SELECT COUNT(c) FROM Cliente c WHERE c.churn = 'No'")
    Long countClientesActivos();

    /**
     * Contar clientes desertados (churn = 'Yes')
     */
    @Query("SELECT COUNT(c) FROM Cliente c WHERE c.churn = 'Yes'")
    Long countClientesDesertados();
}

