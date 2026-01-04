package com.BackEndAPI.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

import com.BackEndAPI.BackEnd.model.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    List<Cliente> findByPropensoAChurn(boolean propenso);

    List<Cliente> findByNombreContaining(String parteDelNombre);
}

