package com.example.Indunil.rentvehicle_vehicleservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "service_invoices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceInvoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String invoiceNo;

    private String vehicleNo;

    // link to existing ServiceStation by id
    @Column(name = "service_station_id")
    private Long serviceStationId;

    private LocalDate serviceDate;
    private Integer mileage;

    private BigDecimal totalAmount;
    private String currency = "LKR";

    private String remarks;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InvoiceActivity> activities = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
