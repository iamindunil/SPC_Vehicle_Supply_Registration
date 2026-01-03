package com.example.Indunil.rentvehicle_vehicleservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Indunil.rentvehicle_vehicleservice.entity.ServiceStationContract;

import java.util.List;

public interface ServiceStationContractRepository extends JpaRepository<ServiceStationContract, Long> {
    List<ServiceStationContract> findByServiceStationId(Long stationId);
}