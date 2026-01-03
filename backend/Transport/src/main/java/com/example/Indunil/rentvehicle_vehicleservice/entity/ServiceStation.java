package com.example.Indunil.rentvehicle_vehicleservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "service_stations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceStation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)   // name should not be null
    private String name;

    @Column(unique = true, nullable = false)  // registration number must be unique
    private String registrationNo;

    private String address;

    private String contactPerson;

    private String phoneNumbers;

    @Column(unique = true)  // emails should be unique
    private String email;

    private String remarks;

    private String tenderStatus;

    @Column(nullable = false)
    private Boolean active = true;

    @OneToMany(mappedBy = "serviceStation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceStationContract> contracts;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // ========== Auto-set timestamps ==========
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
