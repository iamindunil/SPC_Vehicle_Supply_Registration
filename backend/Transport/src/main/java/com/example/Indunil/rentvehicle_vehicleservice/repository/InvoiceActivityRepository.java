package com.example.Indunil.rentvehicle_vehicleservice.repository;

import com.example.Indunil.rentvehicle_vehicleservice.entity.InvoiceActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InvoiceActivityRepository extends JpaRepository<InvoiceActivity, Long> {
    List<InvoiceActivity> findByInvoiceId(Long invoiceId);
}

