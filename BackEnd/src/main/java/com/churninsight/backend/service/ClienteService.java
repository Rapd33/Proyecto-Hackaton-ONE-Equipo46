package com.churninsight.backend.service;

import com.churninsight.backend.model.dto.ClienteCreacionDTO;
import com.churninsight.backend.model.dto.ClienteDTO;
import com.churninsight.backend.model.entity.Cliente;
import com.churninsight.backend.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
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

    /**
     * Crear un nuevo cliente
     * Genera un customerId único y establece churn = "No" por defecto
     */
    public ClienteDTO crearCliente(ClienteCreacionDTO dto) {
        // Validar que no exista un cliente con el mismo correo o documento
        if (existePorCorreo(dto.getCorreoElectronico())) {
            throw new IllegalArgumentException("Ya existe un cliente con el correo: " + dto.getCorreoElectronico());
        }
        if (existePorDocumento(dto.getDocumentoIdentidad())) {
            throw new IllegalArgumentException("Ya existe un cliente con el documento: " + dto.getDocumentoIdentidad());
        }

        // Crear nueva entidad Cliente
        Cliente nuevoCliente = new Cliente();

        // Generar customerId único
        nuevoCliente.setCustomerId(generarCustomerId());

        // Datos personales
        nuevoCliente.setNombre(dto.getNombre());
        nuevoCliente.setApellido(dto.getApellido());
        nuevoCliente.setDocumentoIdentidad(dto.getDocumentoIdentidad());
        nuevoCliente.setCorreoElectronico(dto.getCorreoElectronico());
        nuevoCliente.setGender(dto.getGender());
        nuevoCliente.setSeniorCitizen(dto.getSeniorCitizen() != null ? dto.getSeniorCitizen() : 0);
        nuevoCliente.setPartner(dto.getPartner());
        nuevoCliente.setDependents(dto.getDependents());

        // Servicios telefónicos
        nuevoCliente.setPhoneService(dto.getPhoneService());
        nuevoCliente.setMultipleLines(dto.getMultipleLines());

        // Servicios de internet
        nuevoCliente.setInternetService(dto.getInternetService());
        nuevoCliente.setOnlineSecurity(dto.getOnlineSecurity());
        nuevoCliente.setOnlineBackup(dto.getOnlineBackup());
        nuevoCliente.setDeviceProtection(dto.getDeviceProtection());
        nuevoCliente.setTechSupport(dto.getTechSupport());
        nuevoCliente.setStreamingTv(dto.getStreamingTv());
        nuevoCliente.setStreamingMovies(dto.getStreamingMovies());

        // Contrato y facturación
        nuevoCliente.setContract(dto.getContract());
        nuevoCliente.setPaperlessBilling(dto.getPaperlessBilling());
        nuevoCliente.setPaymentMethod(dto.getPaymentMethod());
        nuevoCliente.setTenure(dto.getTenure() != null ? dto.getTenure() : 0);
        nuevoCliente.setMonthlyCharges(dto.getMonthlyCharges());
        // totalCharges es String en la BD, convertir de Double a String
        nuevoCliente.setTotalCharges(dto.getTotalCharges() != null ? String.valueOf(dto.getTotalCharges()) : "0.0");

        // Churn siempre es "No" para clientes nuevos
        nuevoCliente.setChurn("No");

        // Guardar en la base de datos
        Cliente clienteGuardado = clienteRepository.save(nuevoCliente);

        // Retornar DTO
        return convertirADTO(clienteGuardado);
    }

    /**
     * Genera un customerId único en formato similar a los existentes (####-XXXXX)
     */
    private String generarCustomerId() {
        String customerId;
        do {
            // Generar ID en formato ####-XXXXX
            int numero = (int) (Math.random() * 10000);
            String uuid = UUID.randomUUID().toString().substring(0, 5).toUpperCase();
            customerId = String.format("%04d-%s", numero, uuid);
        } while (clienteRepository.existsById(customerId));

        return customerId;
    }
}
