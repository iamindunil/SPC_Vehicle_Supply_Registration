package com.example.Indunil.rentvehicle_vehicleservice.repository;

import com.example.Indunil.rentvehicle_vehicleservice.entity.CabCompany;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CabCompanyRepository extends JpaRepository<CabCompany, Long> {

    Optional<CabCompany> findByEmail(String email);

    List<CabCompany> findByNameContainingIgnoreCase(String name);
}
