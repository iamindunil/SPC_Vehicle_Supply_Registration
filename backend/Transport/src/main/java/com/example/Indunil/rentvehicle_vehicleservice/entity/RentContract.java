package com.example.Indunil.rentvehicle_vehicleservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "rent_contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RentContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleType;
    private BigDecimal rentalRate;
    private String currency;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private Integer maxVehicles;
    private Integer priorityScore;
    private Boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cab_company_id")
    private CabCompany cabCompany;
}
