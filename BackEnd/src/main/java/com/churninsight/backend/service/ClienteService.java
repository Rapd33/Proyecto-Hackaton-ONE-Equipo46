package com.churninsight.backend.service;

import com.churninsight.backend.model.dto.ClienteDTO;
import com.churninsight.backend.model.entity.Cliente;
import com.churninsight.backend.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    /**
     * Convierte Cliente Entity a DTO simplificado
     */
    private ClienteDTO convertirADTO(Cliente cliente) {
        return new ClienteDTO(
            cliente.getCustomerId(),
            cliente.getNombreCompleto(),
            cliente.getCorreoElectronico(),
            cliente.getDocumentoIdentidad(),
            cliente.isPropensoAChurn()
        );
    }

    /**
     * Obtener todos los clientes
     */
    public List<ClienteDTO> obtenerTodosLosClientes() {
        return clienteRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    /**
     * Obtener cliente por ID (customerId)
     */
    public Optional<ClienteDTO> obtenerClientePorId(String customerId) {
        return clienteRepository.findById(customerId)
                .map(this::convertirADTO);
    }

    /**
     * Buscar cliente por correo electrónico
     */
    public Optional<ClienteDTO> buscarPorCorreo(String correoElectronico) {
        return clienteRepository.findByCorreoElectronico(correoElectronico)
                .map(this::convertirADTO);
    }

    /**
     * Buscar cliente por documento de identidad
     */
    public Optional<ClienteDTO> buscarPorDocumento(Integer documentoIdentidad) {
        return clienteRepository.findByDocumentoIdentidad(documentoIdentidad)
                .map(this::convertirADTO);
    }

    /**
     * Verificar si un cliente existe por ID
     */
    public boolean existeCliente(String customerId) {
        return clienteRepository.existsById(customerId);
    }

    /**
     * Verificar si un cliente existe por correo
     */
    public boolean existePorCorreo(String correoElectronico) {
        return clienteRepository.findByCorreoElectronico(correoElectronico).isPresent();
    }

    /**
     * Verificar si un cliente existe por documento
     */
    public boolean existePorDocumento(Integer documentoIdentidad) {
        return clienteRepository.findByDocumentoIdentidad(documentoIdentidad).isPresent();
    }

    /**
     * Obtener clientes con riesgo de churn
     */
    public List<ClienteDTO> obtenerClientesEnRiesgo() {
        return clienteRepository.findByChurn("Yes").stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }
}
