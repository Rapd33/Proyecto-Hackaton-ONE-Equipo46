package com.churninsight.backend.controller;

import com.churninsight.backend.model.dto.ClienteCreacionDTO;
import com.churninsight.backend.model.dto.ClienteDTO;
import com.churninsight.backend.model.dto.DashboardStatsDTO;
import com.churninsight.backend.model.dto.PrediccionChurnDTO;
import com.churninsight.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class FrontEndController {

    @Autowired
    private ClienteService clienteService;

    /**
     * GET /api/clientes - Obtener todos los clientes
     */
    @GetMapping
    public ResponseEntity<List<ClienteDTO>> obtenerTodosLosClientes() {
        List<ClienteDTO> clientes = clienteService.obtenerTodosLosClientes();
        return ResponseEntity.ok(clientes);
    }

    /**
     * GET /api/clientes/correo/{correo} - Buscar cliente por correo electrónico
     */
    @GetMapping("/correo/{correo}")
    public ResponseEntity<ClienteDTO> buscarPorCorreo(@PathVariable String correo) {
        return clienteService.buscarPorCorreo(correo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/clientes/documento/{documento} - Buscar cliente por documento
     */
    @GetMapping("/documento/{documento}")
    public ResponseEntity<ClienteDTO> buscarPorDocumento(@PathVariable Integer documento) {
        return clienteService.buscarPorDocumento(documento)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * GET /api/clientes/en-riesgo - Obtener clientes con riesgo de churn
     */
    @GetMapping("/en-riesgo")
    public ResponseEntity<List<ClienteDTO>> obtenerClientesEnRiesgo() {
        List<ClienteDTO> clientesEnRiesgo = clienteService.obtenerClientesEnRiesgo();
        return ResponseEntity.ok(clientesEnRiesgo);
    }

    /**
     * GET /api/clientes/{id}/exists - Verificar si existe un cliente
     */
    @GetMapping("/{id}/exists")
    public ResponseEntity<Boolean> verificarExistencia(@PathVariable String id) {
        boolean existe = clienteService.existeCliente(id);
        return ResponseEntity.ok(existe);
    }

    /**
     * GET /api/clientes/{id} - Obtener cliente por customerId
     */
    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> obtenerClientePorId(@PathVariable String id) {
        return clienteService.obtenerClientePorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/clientes - Crear un nuevo cliente
     */
    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> crearCliente(@RequestBody ClienteCreacionDTO clienteDTO) {
        try {
            ClienteDTO nuevoCliente = clienteService.crearCliente(clienteDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCliente);
        } catch (IllegalArgumentException e) {
            // Cliente duplicado (correo o documento ya existe)
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            // Otros errores
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear el cliente: " + e.getMessage());
        }
    }

    /**
     * GET /api/clientes/{id}/predict - Obtener predicción de churn para un cliente
     */
    @GetMapping("/{id}/predict")
    public ResponseEntity<?> obtenerPrediccionChurn(@PathVariable String id) {
        try {
            PrediccionChurnDTO prediccion = clienteService.obtenerPrediccionChurn(id);
            return ResponseEntity.ok(prediccion);
        } catch (IllegalArgumentException e) {
            // Cliente no encontrado
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            // Error al conectar con el microservicio o error interno
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener predicción: " + e.getMessage());
        }
    }

    /**
     * GET /api/clientes/estadisticas - Obtener estadísticas generales del dashboard
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas() {
        try {
            DashboardStatsDTO stats = clienteService.obtenerEstadisticasDashboard();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            // Error al calcular estadísticas
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al obtener estadísticas: " + e.getMessage());
        }
    }
}
