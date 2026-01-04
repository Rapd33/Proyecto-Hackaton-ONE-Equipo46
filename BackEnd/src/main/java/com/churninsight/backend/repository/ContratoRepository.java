package com.churninsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.churninsight.backend.model.entity.Contrato;

/**
 * Repositorio para acceder a la tabla "contratos".
 * Extiende JpaRepository para operaciones CRUD automáticas.
 */
public interface ContratoRepository extends JpaRepository<Contrato, Long> {

    // Métodos personalizados
    List<Contrato> findByEstado(String estado);

    List<Contrato> findByClienteId(Long clienteId);

    List<Contrato> findByServicioId(Long servicioId);
}
