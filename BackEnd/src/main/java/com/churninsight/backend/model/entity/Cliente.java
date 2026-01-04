package com.churninsight.backend.model.entity;

import jakarta.persistence.*;

/**
 * Entidad Cliente mapeada a la tabla 'customers' existente en la base de datos
 */
@Entity
@Table(name = "customers")
public class Cliente {

    @Id
    @Column(name = "customerid")
    private String customerId;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "documento_de_identidad")
    private Integer documentoIdentidad;

    @Column(name = "correo_electronico")
    private String correoElectronico;

    @Column(name = "gender")
    private String gender;

    @Column(name = "seniorcitizen")
    private Integer seniorCitizen;

    @Column(name = "partner")
    private String partner;

    @Column(name = "dependents")
    private String dependents;

    @Column(name = "tenure")
    private Integer tenure;

    @Column(name = "phoneservice")
    private String phoneService;

    @Column(name = "multiplelines")
    private String multipleLines;

    @Column(name = "internetservice")
    private String internetService;

    @Column(name = "onlinesecurity")
    private String onlineSecurity;

    @Column(name = "onlinebackup")
    private String onlineBackup;

    @Column(name = "deviceprotection")
    private String deviceProtection;

    @Column(name = "techsupport")
    private String techSupport;

    @Column(name = "streamingtv")
    private String streamingTv;

    @Column(name = "streamingmovies")
    private String streamingMovies;

    @Column(name = "contract")
    private String contract;

    @Column(name = "paperlessbilling")
    private String paperlessBilling;

    @Column(name = "paymentmethod")
    private String paymentMethod;

    @Column(name = "monthlycharges")
    private Double monthlyCharges;

    @Column(name = "totalcharges")
    private String totalCharges;

    @Column(name = "churn")
    private String churn;

    public Cliente() {}

    // Método helper para obtener nombre completo
    public String getNombreCompleto() {
        if (nombre != null && apellido != null) {
            return nombre + " " + apellido;
        } else if (nombre != null) {
            return nombre;
        } else if (apellido != null) {
            return apellido;
        }
        return "";
    }

    // Método helper para determinar si está propenso a churn
    public Boolean isPropensoAChurn() {
        return "Yes".equalsIgnoreCase(churn);
    }

    // Getters y Setters
    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public Integer getDocumentoIdentidad() {
        return documentoIdentidad;
    }

    public void setDocumentoIdentidad(Integer documentoIdentidad) {
        this.documentoIdentidad = documentoIdentidad;
    }

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Integer getSeniorCitizen() {
        return seniorCitizen;
    }

    public void setSeniorCitizen(Integer seniorCitizen) {
        this.seniorCitizen = seniorCitizen;
    }

    public String getPartner() {
        return partner;
    }

    public void setPartner(String partner) {
        this.partner = partner;
    }

    public String getDependents() {
        return dependents;
    }

    public void setDependents(String dependents) {
        this.dependents = dependents;
    }

    public Integer getTenure() {
        return tenure;
    }

    public void setTenure(Integer tenure) {
        this.tenure = tenure;
    }

    public String getPhoneService() {
        return phoneService;
    }

    public void setPhoneService(String phoneService) {
        this.phoneService = phoneService;
    }

    public String getMultipleLines() {
        return multipleLines;
    }

    public void setMultipleLines(String multipleLines) {
        this.multipleLines = multipleLines;
    }

    public String getInternetService() {
        return internetService;
    }

    public void setInternetService(String internetService) {
        this.internetService = internetService;
    }

    public String getOnlineSecurity() {
        return onlineSecurity;
    }

    public void setOnlineSecurity(String onlineSecurity) {
        this.onlineSecurity = onlineSecurity;
    }

    public String getOnlineBackup() {
        return onlineBackup;
    }

    public void setOnlineBackup(String onlineBackup) {
        this.onlineBackup = onlineBackup;
    }

    public String getDeviceProtection() {
        return deviceProtection;
    }

    public void setDeviceProtection(String deviceProtection) {
        this.deviceProtection = deviceProtection;
    }

    public String getTechSupport() {
        return techSupport;
    }

    public void setTechSupport(String techSupport) {
        this.techSupport = techSupport;
    }

    public String getStreamingTv() {
        return streamingTv;
    }

    public void setStreamingTv(String streamingTv) {
        this.streamingTv = streamingTv;
    }

    public String getStreamingMovies() {
        return streamingMovies;
    }

    public void setStreamingMovies(String streamingMovies) {
        this.streamingMovies = streamingMovies;
    }

    public String getContract() {
        return contract;
    }

    public void setContract(String contract) {
        this.contract = contract;
    }

    public String getPaperlessBilling() {
        return paperlessBilling;
    }

    public void setPaperlessBilling(String paperlessBilling) {
        this.paperlessBilling = paperlessBilling;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Double getMonthlyCharges() {
        return monthlyCharges;
    }

    public void setMonthlyCharges(Double monthlyCharges) {
        this.monthlyCharges = monthlyCharges;
    }

    public String getTotalCharges() {
        return totalCharges;
    }

    public void setTotalCharges(String totalCharges) {
        this.totalCharges = totalCharges;
    }

    public String getChurn() {
        return churn;
    }

    public void setChurn(String churn) {
        this.churn = churn;
    }
}
