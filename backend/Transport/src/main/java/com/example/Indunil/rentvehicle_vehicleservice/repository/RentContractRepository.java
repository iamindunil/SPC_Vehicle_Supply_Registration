package com.example.Indunil.rentvehicle_vehicleservice.repository;

import com.example.Indunil.rentvehicle_vehicleservice.entity.RentContract;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RentContractRepository extends JpaRepository<RentContract, Long> {

    List<RentContract> findByCabCompanyId(Long cabCompanyId);
}
