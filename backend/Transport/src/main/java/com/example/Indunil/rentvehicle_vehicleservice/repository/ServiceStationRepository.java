package com.example.Indunil.rentvehicle_vehicleservice.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Indunil.rentvehicle_vehicleservice.entity.ServiceStation;

import java.util.List; 
import java.util.Optional;


public interface ServiceStationRepository extends JpaRepository<ServiceStation, Long> {
    Optional<ServiceStation> findByEmail(String email);

    List<ServiceStation> findByNameContainingIgnoreCase(String name);

}
