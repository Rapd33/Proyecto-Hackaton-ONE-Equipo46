package com.churninsight.backend.controller;

import com.churninsight.backend.model.entity.Servicio;
import com.churninsight.backend.repository.ServicioRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar servicios.
 */
@RestController
@RequestMapping("/api/servicios")
public class ServicioController {

    private final ServicioRepository servicioRepository;

    // Inyección de dependencias vía constructor
    public ServicioController(ServicioRepository servicioRepository) {
        this.servicioRepository = servicioRepository;
    }

    /** Devuelve todos los servicios registrados */
    @GetMapping
    public List<Servicio> listarServicios() {
        return servicioRepository.findAll();
    }

    /** Devuelve un servicio por su ID interno */
    @GetMapping("/{id}")
    public Optional<Servicio> obtenerServicioPorId(@PathVariable Long id) {
        return servicioRepository.findById(id);
    }

    /** Crea un nuevo servicio en la base de datos */
    @PostMapping
    public Servicio crearServicio(@RequestBody Servicio servicio) {
        return servicioRepository.save(servicio);
    }

    /** Actualiza un servicio existente */
    @PutMapping("/{id}")
    public Servicio actualizarServicio(@PathVariable Long id, @RequestBody Servicio servicio) {
        servicio.setId(id);
        return servicioRepository.save(servicio);
    }

    /** Elimina un servicio por su ID */
    @DeleteMapping("/{id}")
    public void eliminarServicio(@PathVariable Long id) {
        servicioRepository.deleteById(id);
    }

    /** Busca servicios por nombre parcial */
    @GetMapping("/buscar/nombre/{nombre}")
    public List<Servicio> buscarPorNombre(@PathVariable String nombre) {
        return servicioRepository.findByNombreContaining(nombre);
    }

    /** Busca servicios según si están activos */
    @GetMapping("/buscar/activo/{activo}")
    public List<Servicio> buscarPorActivo(@PathVariable boolean activo) {
        return servicioRepository.findByActivo(activo);
    }
}
