package com.example.Indunil.rentvehicle_vehicleservice.mapper;

import com.example.Indunil.rentvehicle_vehicleservice.dto.*;
import com.example.Indunil.rentvehicle_vehicleservice.entity.*;

import java.util.stream.Collectors;

public class CabCompanyMapper {

    public static CabCompany toEntity(CabCompanyCreateRequest dto) {
        CabCompany c = new CabCompany();
        c.setName(dto.getName());
        c.setRegistrationNo(dto.getRegistrationNo());
        c.setAddress(dto.getAddress());
        c.setEmail(dto.getEmail());
        c.setContactPerson(dto.getContactPerson());
        c.setPhoneNumbers(dto.getPhoneNumbers());
        c.setRemarks(dto.getRemarks());
        c.setLicenseStatus(dto.getLicenseStatus());
        c.setActive(dto.getActive());
        return c;
    }

    public static RentContract toContractEntity(RentContractDto dto) {
        RentContract rc = new RentContract();
        rc.setId(dto.getId());
        rc.setVehicleType(dto.getVehicleType());
        rc.setRentalRate(dto.getRentalRate());
        rc.setCurrency(dto.getCurrency());
        rc.setEffectiveFrom(dto.getEffectiveFrom());
        rc.setEffectiveTo(dto.getEffectiveTo());
        rc.setActive(dto.getActive());
        rc.setMaxVehicles(dto.getMaxVehicles());
        rc.setPriorityScore(dto.getPriorityScore());
        return rc;
    }

    // ✅ FULL MAPPING – FIXES EMPTY UI ON FRONTEND
    public static CabCompanyResponse toResponse(CabCompany e) {
        CabCompanyResponse r = new CabCompanyResponse();
        r.setId(e.getId());
        r.setName(e.getName());
        r.setRegistrationNo(e.getRegistrationNo());
        r.setAddress(e.getAddress());
        r.setContactPerson(e.getContactPerson());
        r.setPhoneNumbers(e.getPhoneNumbers());
        r.setEmail(e.getEmail());
        r.setRemarks(e.getRemarks());
        r.setLicenseStatus(e.getLicenseStatus());
        r.setActive(e.getActive());
        r.setCreatedAt(e.getCreatedAt());
        r.setUpdatedAt(e.getUpdatedAt());

        // Map contracts list
        r.setContracts(
                e.getContracts().stream()
                        .map(CabCompanyMapper::contractToDto)
                        .collect(Collectors.toList())
        );

        return r;
    }

    public static RentContractDto contractToDto(RentContract e) {
        RentContractDto c = new RentContractDto();
        c.setId(e.getId());
        c.setVehicleType(e.getVehicleType());
        c.setRentalRate(e.getRentalRate());
        c.setCurrency(e.getCurrency());
        c.setEffectiveFrom(e.getEffectiveFrom());
        c.setEffectiveTo(e.getEffectiveTo());
        c.setActive(e.getActive());
        c.setMaxVehicles(e.getMaxVehicles());
        c.setPriorityScore(e.getPriorityScore());
        return c;
    }
}
