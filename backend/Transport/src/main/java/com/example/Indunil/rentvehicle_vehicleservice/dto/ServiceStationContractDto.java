package com.example.Indunil.rentvehicle_vehicleservice.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ServiceStationContractDto {

    private Long id;
    private String serviceCategory;
    private BigDecimal contractedRate;
    private String currency;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private Boolean active;
    private Integer maxWorkload;
    private Integer priorityScore;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getServiceCategory() { return serviceCategory; }
    public void setServiceCategory(String serviceCategory) { this.serviceCategory = serviceCategory; }

    public BigDecimal getContractedRate() { return contractedRate; }
    public void setContractedRate(BigDecimal contractedRate) { this.contractedRate = contractedRate; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public LocalDate getEffectiveFrom() { return effectiveFrom; }
    public void setEffectiveFrom(LocalDate effectiveFrom) { this.effectiveFrom = effectiveFrom; }

    public LocalDate getEffectiveTo() { return effectiveTo; }
    public void setEffectiveTo(LocalDate effectiveTo) { this.effectiveTo = effectiveTo; }

    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Integer getMaxWorkload() { return maxWorkload; }
    public void setMaxWorkload(Integer maxWorkload) { this.maxWorkload = maxWorkload; }

    public Integer getPriorityScore() { return priorityScore; }
    public void setPriorityScore(Integer priorityScore) { this.priorityScore = priorityScore; }
}
