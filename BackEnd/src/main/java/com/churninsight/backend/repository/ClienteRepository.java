package com.churninsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.churninsight.backend.model.entity.Cliente;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findByPropensoAChurn(boolean propenso);

    List<Cliente> findByNombreContaining(String parteDelNombre);
}

