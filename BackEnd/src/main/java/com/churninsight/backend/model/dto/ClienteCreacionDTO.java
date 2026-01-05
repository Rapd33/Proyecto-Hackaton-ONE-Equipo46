package com.churninsight.backend.model.dto;

/**
 * DTO para crear nuevos clientes
 * Contiene todos los campos necesarios que el usuario debe proporcionar
 */
public class ClienteCreacionDTO {

    // Datos personales
    private String nombre;
    private String apellido;
    private Integer documentoIdentidad;
    private String correoElectronico;
    private String gender;
    private Integer seniorCitizen;
    private String partner;
    private String dependents;

    // Datos de servicio telefónico
    private String phoneService;
    private String multipleLines;

    // Datos de servicio de internet
    private String internetService;
    private String onlineSecurity;
    private String onlineBackup;
    private String deviceProtection;
    private String techSupport;
    private String streamingTv;
    private String streamingMovies;

    // Datos de contrato y pago
    private String contract;
    private String paperlessBilling;
    private String paymentMethod;
    private Integer tenure;
    private Double monthlyCharges;
    private Double totalCharges;

    // Constructor vacío
    public ClienteCreacionDTO() {}

    // Getters y Setters
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

    public Integer getTenure() {
        return tenure;
    }

    public void setTenure(Integer tenure) {
        this.tenure = tenure;
    }

    public Double getMonthlyCharges() {
        return monthlyCharges;
    }

    public void setMonthlyCharges(Double monthlyCharges) {
        this.monthlyCharges = monthlyCharges;
    }

    public Double getTotalCharges() {
        return totalCharges;
    }

    public void setTotalCharges(Double totalCharges) {
        this.totalCharges = totalCharges;
    }
}
