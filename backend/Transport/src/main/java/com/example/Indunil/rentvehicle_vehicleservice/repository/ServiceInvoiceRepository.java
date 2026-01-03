package com.example.Indunil.rentvehicle_vehicleservice.repository;

import com.example.Indunil.rentvehicle_vehicleservice.entity.ServiceInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceInvoiceRepository extends JpaRepository<ServiceInvoice, Long> {
    List<ServiceInvoice> findByVehicleNoContainingIgnoreCase(String vehicleNo);
    List<ServiceInvoice> findByServiceStationId(Long stationId);
}
