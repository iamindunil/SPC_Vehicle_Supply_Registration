package com.example.Indunil.rentvehicle_vehicleservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "service_station_contracts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceStationContract {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceCategory;
    private BigDecimal contractedRate;
    private String currency;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private Integer maxWorkload;
    private Integer priorityScore;
    private Boolean active = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_station_id")
    private ServiceStation serviceStation;
}
