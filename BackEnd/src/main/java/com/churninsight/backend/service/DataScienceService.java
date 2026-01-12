package com.churninsight.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.churninsight.backend.model.dto.CustomerDataDTO;

import org.springframework.http.ResponseEntity;
import java.util.Map;

@Service
public class DataScienceService {

    @Value("${datascienceml.service.url}")
    private String aiUrl;

    private final RestTemplate restTemplate;

    public DataScienceService() {
        this.restTemplate = new RestTemplate();
    }

    public String obtenerPrediccion(CustomerDataDTO datosCliente) {
        try {
            System.out.println("📤 Enviando datos a IA: " + datosCliente);

            // 1. Llamada POST a Python
            ResponseEntity<Map> respuesta = restTemplate.postForEntity(aiUrl, datosCliente, Map.class);
            Map<String, Object> cuerpo = respuesta.getBody();

            if (cuerpo != null) {
                // Tu Python devuelve: { "prediction": 1, "churn_probability": 0.85, "risk_level": "Alto" }
                // Vamos a devolver el Nivel de Riesgo (o lo que tú prefieras mostrar)
                String riesgo = cuerpo.get("risk_level").toString();
                Double probabilidad = Double.valueOf(cuerpo.get("churn_probability").toString());

                System.out.println("📥 IA Respondió: " + riesgo + " (" + probabilidad + ")");
                return riesgo; // Retorna "Alto" o "Bajo"
            }

            return "Indefinido";

        } catch (Exception e) {
            System.err.println("❌ Error conectando con Python: " + e.getMessage());
            // Si falla, devolvemos un valor seguro para que la app no se rompa
            return "Error de Conexión";
        }
    }

    /**
     * Obtiene la predicción completa del microservicio de ML
     * Retorna el Map completo con prediction, churn_probability y risk_level
     */
    public Map<String, Object> obtenerPrediccionCompleta(CustomerDataDTO datosCliente) {
        try {
            System.out.println("📤 Enviando datos a IA: " + datosCliente);

            // Llamada POST a Python
            ResponseEntity<Map> respuesta = restTemplate.postForEntity(aiUrl, datosCliente, Map.class);
            Map<String, Object> cuerpo = respuesta.getBody();

            if (cuerpo != null) {
                System.out.println("📥 IA Respondió: " + cuerpo);
                return cuerpo;
            }

            // Si no hay respuesta, retornar valores por defecto
            return Map.of(
                "prediction", 0,
                "churn_probability", 0.0,
                "risk_level", "Indefinido"
            );

        } catch (Exception e) {
            System.err.println("❌ Error conectando con Python: " + e.getMessage());
            e.printStackTrace();

            // Si falla, devolver valores de error
            return Map.of(
                "prediction", 0,
                "churn_probability", 0.0,
                "risk_level", "Error de Conexión",
                "error", e.getMessage()
            );
        }
    }
}