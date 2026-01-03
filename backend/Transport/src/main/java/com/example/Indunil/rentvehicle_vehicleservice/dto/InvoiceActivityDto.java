package com.example.Indunil.rentvehicle_vehicleservice.dto;

import java.math.BigDecimal;

public class InvoiceActivityDto {
    private Long id;
    private String description;
    private BigDecimal cost;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public BigDecimal getCost() { return cost; }
    public void setCost(BigDecimal cost) { this.cost = cost; }
}
