package com.example.Indunil.rentvehicle_vehicleservice.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cab_companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CabCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String registrationNo;

    private String address;
    private String contactPerson;

    // ✅ FIXED: persist list of phone numbers in a separate table
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
        name = "cab_company_phone_numbers",
        joinColumns = @JoinColumn(name = "company_id")
    )
    @Column(name = "phone_number")
    private List<String> phoneNumbers = new ArrayList<>();

    @Column(unique = true)
    private String email;

    private String remarks;
    private String licenseStatus;
    private Boolean active = true;

    @OneToMany(mappedBy = "cabCompany", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RentContract> contracts = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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
