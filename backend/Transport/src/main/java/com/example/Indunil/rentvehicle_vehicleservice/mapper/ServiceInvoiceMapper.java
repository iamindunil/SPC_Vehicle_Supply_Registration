package com.example.Indunil.rentvehicle_vehicleservice.mapper;

import com.example.Indunil.rentvehicle_vehicleservice.dto.*;
import com.example.Indunil.rentvehicle_vehicleservice.entity.*;
import java.math.BigDecimal;
import java.util.stream.Collectors;

public class ServiceInvoiceMapper {

    public static InvoiceActivity toEntity(InvoiceActivityDto dto) {
        InvoiceActivity a = new InvoiceActivity();
        a.setId(dto.getId());
        a.setDescription(dto.getDescription());
        a.setCost(dto.getCost());
        return a;
    }

    public static InvoiceActivityDto toDto(InvoiceActivity e) {
        InvoiceActivityDto d = new InvoiceActivityDto();
        d.setId(e.getId());
        d.setDescription(e.getDescription());
        d.setCost(e.getCost());
        return d;
    }

    public static ServiceInvoice toEntity(InvoiceCreateRequest req) {
        ServiceInvoice inv = new ServiceInvoice();
        inv.setVehicleNo(req.getVehicleNo());
        inv.setServiceStationId(req.getServiceStationId());
        inv.setServiceDate(req.getServiceDate());
        inv.setMileage(req.getMileage());
        inv.setRemarks(req.getRemarks());
        inv.setCurrency(req.getCurrency());
        // activities added later (with invoice reference)
        return inv;
    }

    public static InvoiceResponse toDto(ServiceInvoice e) {
        InvoiceResponse r = new InvoiceResponse();
        r.setId(e.getId());
        r.setInvoiceNo(e.getInvoiceNo());
        r.setVehicleNo(e.getVehicleNo());
        r.setServiceStationId(e.getServiceStationId());
        r.setServiceDate(e.getServiceDate());
        r.setMileage(e.getMileage());
        r.setTotalAmount(e.getTotalAmount());
        r.setCurrency(e.getCurrency());
        r.setRemarks(e.getRemarks());
        r.setCreatedAt(e.getCreatedAt());
        r.setUpdatedAt(e.getUpdatedAt());
        r.setActivities(e.getActivities().stream().map(ServiceInvoiceMapper::toDto).collect(Collectors.toList()));
        return r;
    }

    public static BigDecimal computeTotal(ServiceInvoice invoice) {
        return invoice.getActivities().stream()
                .map(a -> a.getCost() == null ? BigDecimal.ZERO : a.getCost())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
