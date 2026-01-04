package com.churninsight.backend.controller;

import com.churninsight.backend.model.dto.ClienteDTO;
import com.churninsight.backend.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "http://localhost:4200")
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
     * GET /api/clientes/{id} - Obtener cliente por customerId
     */
    @GetMapping("/{id}")
    public ResponseEntity<ClienteDTO> obtenerClientePorId(@PathVariable String id) {
        return clienteService.obtenerClientePorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
}
