package com.churninsight.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.churninsight.backend.model.entity.Servicio;

/**
 * Repositorio para acceder a la tabla "servicios".
 * Extiende JpaRepository para operaciones CRUD automáticas.
 * Incluye métodos de búsqueda personalizados.
 */
public interface ServicioRepository extends JpaRepository<Servicio, Long> {

    /** Busca servicios cuyo nombre contenga una cadena específica */
    List<Servicio> findByNombreContaining(String parteDelNombre);

    /** Busca servicios según si están activos */
    List<Servicio> findByActivo(boolean activo);
}
