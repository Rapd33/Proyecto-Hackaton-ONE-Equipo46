package com.churninsight.backend.controller;

import com.churninsight.backend.model.entity.Contrato;

import com.churninsight.backend.repository.ContratoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controlador REST para gestionar contratos.
 */
@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    private final ContratoRepository contratoRepository;

    public ContratoController(ContratoRepository contratoRepository) {
        this.contratoRepository = contratoRepository;
    }

    // GET /api/contratos
// Devuelve la lista completa de contratos registrados en la base de datos.
    @GetMapping
    public List<Contrato> listarContratos() {
        return contratoRepository.findAll();
    }

    // GET /api/contratos/{id}
// Busca y devuelve un contrato específico según su ID.
// Si no existe, retorna Optional vacío.
    @GetMapping("/{id}")
    public Optional<Contrato> obtenerContratoPorId(@PathVariable Long id) {
        return contratoRepository.findById(id);
    }

    // POST /api/contratos
// Crea un nuevo contrato con los datos enviados en el cuerpo de la petición (JSON).
// Retorna el contrato creado con su ID generado.
    @PostMapping
    public Contrato crearContrato(@RequestBody Contrato contrato) {
        return contratoRepository.save(contrato);
    }

    // PUT /api/contratos/{id}
// Actualiza un contrato existente identificado por su ID.
// Los nuevos datos se envían en el cuerpo de la petición (JSON).
// Retorna el contrato actualizado.
    @PutMapping("/{id}")
    public Contrato actualizarContrato(@PathVariable Long id, @RequestBody Contrato contrato) {
        contrato.setId(id);
        return contratoRepository.save(contrato);
    }

    // DELETE /api/contratos/{id}
// Elimina un contrato de la base de datos según su ID.
// No retorna contenido (void).
    @DeleteMapping("/{id}")
    public void eliminarContrato(@PathVariable Long id) {
        contratoRepository.deleteById(id);
    }

    // GET /api/contratos/buscar/estado/{estado}
// Devuelve todos los contratos que coinciden con el estado indicado (ej. "Activo", "Finalizado").
    @GetMapping("/buscar/estado/{estado}")
    public List<Contrato> buscarPorEstado(@PathVariable String estado) {
        return contratoRepository.findByEstado(estado);
    }

    // GET /api/contratos/buscar/cliente/{clienteId}
// Devuelve todos los contratos asociados a un cliente específico, identificado por su ID.
    @GetMapping("/buscar/cliente/{clienteId}")
    public List<Contrato> buscarPorCliente(@PathVariable Long clienteId) {
        return contratoRepository.findByClienteId(clienteId);
    }

    // GET /api/contratos/buscar/servicio/{servicioId}
// Devuelve todos los contratos asociados a un servicio específico, identificado por su ID.
    @GetMapping("/buscar/servicio/{servicioId}")
    public List<Contrato> buscarPorServicio(@PathVariable Long servicioId) {
        return contratoRepository.findByServicioId(servicioId);
    }
}
