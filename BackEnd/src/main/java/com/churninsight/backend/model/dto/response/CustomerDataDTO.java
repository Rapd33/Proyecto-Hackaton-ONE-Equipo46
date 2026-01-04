package com.churninsight.backend.model.dto.response;

public record CustomerDataDTO(
    // Variables Numéricas
    Integer tenure,
    Double MonthlyCharges,  // ¡Ojo con la mayúscula inicial!
    Double TotalCharges,
    Integer SeniorCitizen,

    // Variables de Texto (Categorías)
    String Contract,
    String InternetService,
    String PaymentMethod,
    String TechSupport,

    // Opcionales (Las ponemos por si acaso)
    String OnlineSecurity,
    String Partner,
    String Dependents
) {}