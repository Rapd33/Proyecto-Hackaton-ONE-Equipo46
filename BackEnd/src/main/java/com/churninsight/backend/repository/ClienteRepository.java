package com.churninsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.churninsight.backend.model.entity.Cliente;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, String> {

    Optional<Cliente> findByCorreoElectronico(String correoElectronico);

    Optional<Cliente> findByDocumentoIdentidad(Integer documentoIdentidad);

    List<Cliente> findByNombreContaining(String parteDelNombre);

    List<Cliente> findByChurn(String churn);
}

