package com.churninsight.backend.service;

import com.churninsight.backend.model.dto.ClienteCreacionDTO;
import com.churninsight.backend.model.dto.ClienteDTO;
import com.churninsight.backend.model.dto.CustomerDataDTO;
import com.churninsight.backend.model.dto.DashboardStatsDTO;
import com.churninsight.backend.model.dto.PrediccionChurnDTO;
import com.churninsight.backend.model.entity.Cliente;
import com.churninsight.backend.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private DataScienceService dataScienceService;

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

    /**
     * Convierte un Cliente a CustomerDataDTO para enviar al microservicio de ML
     */
    private CustomerDataDTO convertirACustomerDataDTO(Cliente cliente) {
        // Convertir totalCharges de String a Double
        Double totalCharges = 0.0;
        try {
            if (cliente.getTotalCharges() != null && !cliente.getTotalCharges().isEmpty()) {
                totalCharges = Double.parseDouble(cliente.getTotalCharges());
            }
        } catch (NumberFormatException e) {
            totalCharges = 0.0;
        }

        return new CustomerDataDTO(
            cliente.getTenure(),
            cliente.getMonthlyCharges(),
            totalCharges,
            cliente.getSeniorCitizen(),
            cliente.getContract(),
            cliente.getInternetService(),
            cliente.getPaymentMethod(),
            cliente.getTechSupport(),
            cliente.getOnlineSecurity(),
            cliente.getPartner(),
            cliente.getDependents()
        );
    }

    /**
     * Obtener predicción de churn para un cliente específico
     */
    public PrediccionChurnDTO obtenerPrediccionChurn(String customerId) {
        // Buscar el cliente
        Optional<Cliente> clienteOpt = clienteRepository.findById(customerId);
        if (clienteOpt.isEmpty()) {
            throw new IllegalArgumentException("Cliente no encontrado con ID: " + customerId);
        }

        Cliente cliente = clienteOpt.get();

        // Convertir a CustomerDataDTO
        CustomerDataDTO customerData = convertirACustomerDataDTO(cliente);

        // Llamar al microservicio de ML
        Map<String, Object> mlResponse = dataScienceService.obtenerPrediccionCompleta(customerData);

        // Extraer datos de la respuesta del ML
        Integer prediction = (Integer) mlResponse.get("prediction");
        Double probability = (Double) mlResponse.get("churn_probability");
        String riskLevel = (String) mlResponse.get("risk_level");

        // Generar estrategia de retención basada en el riesgo
        String estrategia = generarEstrategiaRetencion(riskLevel, probability);
        String recomendacion = generarRecomendacion(riskLevel, probability, cliente);

        // Construir y retornar el DTO completo con datos del cliente
        return new PrediccionChurnDTO(
            cliente.getCustomerId(),
            cliente.getNombreCompleto(),
            cliente.getCorreoElectronico(),
            cliente.getDocumentoIdentidad(),
            prediction,
            probability,
            riskLevel,
            estrategia,
            recomendacion
        );
    }

    /**
     * Genera estrategia de retención según el nivel de riesgo
     */
    private String generarEstrategiaRetencion(String riskLevel, Double probability) {
        if ("Alto".equalsIgnoreCase(riskLevel) || probability > 0.7) {
            return "URGENTE - Contacto inmediato";
        } else if (probability > 0.5) {
            return "MEDIO - Seguimiento prioritario";
        } else {
            return "BAJO - Mantenimiento estándar";
        }
    }

    /**
     * Genera recomendaciones específicas según el perfil del cliente
     */
    private String generarRecomendacion(String riskLevel, Double probability, Cliente cliente) {
        if ("Alto".equalsIgnoreCase(riskLevel)) {
            // Clientes de alto riesgo
            if ("Month-to-month".equals(cliente.getContract())) {
                return "Ofrecer descuento en contrato anual. Cliente con contrato mensual tiene mayor probabilidad de cancelar.";
            } else if ("Electronic check".equals(cliente.getPaymentMethod())) {
                return "Incentivar cambio a método de pago automático con descuento del 5%.";
            } else if ("Fiber optic".equals(cliente.getInternetService()) && cliente.getMonthlyCharges() > 70) {
                return "Ofrecer plan personalizado con servicios adicionales sin costo por 3 meses.";
            } else {
                return "Contactar para encuesta de satisfacción y ofrecer beneficios exclusivos.";
            }
        } else if (probability > 0.3) {
            // Clientes de riesgo medio
            return "Enviar campaña de fidelización con beneficios por antigüedad.";
        } else {
            // Clientes de bajo riesgo
            return "Mantener calidad de servicio y enviar comunicaciones periódicas de valor agregado.";
        }
    }

    /**
     * Obtener estadísticas generales del dashboard
     * Calcula métricas clave y distribución por nivel de riesgo usando heurísticas simples
     */
    public DashboardStatsDTO obtenerEstadisticasDashboard() {
        // Obtener conteos básicos
        Long totalClientes = clienteRepository.count();
        Long clientesActivos = clienteRepository.countClientesActivos();
        Long clientesDesertados = clienteRepository.countClientesDesertados();

        // Calcular tasa de retención
        Double tasaRetencion = totalClientes > 0
                ? (clientesActivos.doubleValue() / totalClientes.doubleValue()) * 100.0
                : 0.0;

        // Obtener todos los clientes activos para analizar riesgo
        List<Cliente> clientesActivosList = clienteRepository.findByChurn("No");

        // Contadores para niveles de riesgo
        int clientesRiesgoAlto = 0;
        int clientesRiesgoMedio = 0;
        int clientesRiesgoBajo = 0;

        // Clasificar por nivel de riesgo usando heurísticas simples (sin ML)
        // Esto es más rápido y no depende del microservicio de ML
        for (Cliente cliente : clientesActivosList) {
            int factoresRiesgo = 0;

            // Factor 1: Contrato mensual (alto riesgo)
            if ("Month-to-month".equals(cliente.getContract())) {
                factoresRiesgo += 3;
            }

            // Factor 2: Tenure bajo (menos de 12 meses)
            if (cliente.getTenure() != null && cliente.getTenure() < 12) {
                factoresRiesgo += 2;
            }

            // Factor 3: Método de pago Electronic check (mayor riesgo)
            if ("Electronic check".equals(cliente.getPaymentMethod())) {
                factoresRiesgo += 2;
            }

            // Factor 4: Sin servicios adicionales (OnlineSecurity, TechSupport)
            if ("No".equals(cliente.getOnlineSecurity()) || "No internet service".equals(cliente.getOnlineSecurity())) {
                factoresRiesgo += 1;
            }
            if ("No".equals(cliente.getTechSupport()) || "No internet service".equals(cliente.getTechSupport())) {
                factoresRiesgo += 1;
            }

            // Factor 5: Cargos mensuales altos sin servicios adicionales
            if (cliente.getMonthlyCharges() != null && cliente.getMonthlyCharges() > 70
                && "Fiber optic".equals(cliente.getInternetService())) {
                factoresRiesgo += 1;
            }

            // Clasificar según factores de riesgo acumulados
            if (factoresRiesgo >= 6) {
                clientesRiesgoAlto++;
            } else if (factoresRiesgo >= 3) {
                clientesRiesgoMedio++;
            } else {
                clientesRiesgoBajo++;
            }
        }

        // Construir y retornar el DTO
        return new DashboardStatsDTO(
                totalClientes.intValue(),
                clientesActivos.intValue(),
                clientesDesertados.intValue(),
                Math.round(tasaRetencion * 10.0) / 10.0, // Redondear a 1 decimal
                clientesRiesgoAlto,
                clientesRiesgoMedio,
                clientesRiesgoBajo
        );
    }
}
