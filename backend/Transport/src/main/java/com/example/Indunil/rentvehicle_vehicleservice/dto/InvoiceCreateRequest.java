package com.example.Indunil.rentvehicle_vehicleservice.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class InvoiceCreateRequest {
    private String vehicleNo;
    private Long serviceStationId;
    private LocalDate serviceDate;
    private Integer mileage;
    private String currency = "LKR";
    private String remarks;
    private List<InvoiceActivityDto> activities;

    public String getVehicleNo() { return vehicleNo; }
    public void setVehicleNo(String vehicleNo) { this.vehicleNo = vehicleNo; }

    public Long getServiceStationId() { return serviceStationId; }
    public void setServiceStationId(Long serviceStationId) { this.serviceStationId = serviceStationId; }

    public LocalDate getServiceDate() { return serviceDate; }
    public void setServiceDate(LocalDate serviceDate) { this.serviceDate = serviceDate; }

    public Integer getMileage() { return mileage; }
    public void setMileage(Integer mileage) { this.mileage = mileage; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public List<InvoiceActivityDto> getActivities() { return activities; }
    public void setActivities(List<InvoiceActivityDto> activities) { this.activities = activities; }
}
