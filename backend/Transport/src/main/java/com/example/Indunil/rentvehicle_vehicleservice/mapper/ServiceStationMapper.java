package com.example.Indunil.rentvehicle_vehicleservice.mapper;

import com.example.Indunil.rentvehicle_vehicleservice.dto.*;
import com.example.Indunil.rentvehicle_vehicleservice.entity.*;

import java.util.stream.Collectors;

public class ServiceStationMapper {

    // ============================
    //     CREATE → ENTITY
    // ============================
    public static ServiceStation toEntity(ServiceStationCreateRequest dto) {
        if (dto == null) return null;

        ServiceStation s = new ServiceStation();
        s.setName(dto.getName());
        s.setRegistrationNo(dto.getRegistrationNo());
        s.setAddress(dto.getAddress());
        s.setContactPerson(dto.getContactPerson());
        s.setPhoneNumbers(String.join(",", dto.getPhoneNumbers()));
        s.setEmail(dto.getEmail());
        s.setRemarks(dto.getRemarks());
        s.setTenderStatus(dto.getTenderStatus());
        s.setActive(dto.getActive());

        // Add contracts
        if (dto.getContracts() != null) {
            s.setContracts(
                    dto.getContracts().stream()
                            .map(ServiceStationMapper::toContractEntity)
                            .peek(c -> c.setServiceStation(s))
                            .collect(Collectors.toList())
            );
        }

        return s;
    }

    // ============================
    //     UPDATE → ENTITY
    // ============================
    public static void updateEntityFromDto(ServiceStationUpdateRequest dto, ServiceStation s) {
        if (dto == null) return;

        if (dto.getName() != null) s.setName(dto.getName());
        if (dto.getRegistrationNo() != null) s.setRegistrationNo(dto.getRegistrationNo());
        if (dto.getAddress() != null) s.setAddress(dto.getAddress());
        if (dto.getContactPerson() != null) s.setContactPerson(dto.getContactPerson());
        if (dto.getPhoneNumbers() != null) s.setPhoneNumbers(String.join(",", dto.getPhoneNumbers()));
        if (dto.getEmail() != null) s.setEmail(dto.getEmail());
        if (dto.getRemarks() != null) s.setRemarks(dto.getRemarks());
        if (dto.getTenderStatus() != null) s.setTenderStatus(dto.getTenderStatus());
        if (dto.getActive() != null) s.setActive(dto.getActive());
    }

    // ============================
    //     ENTITY → RESPONSE
    // ============================
    public static ServiceStationResponse toResponse(ServiceStation s) {
        if (s == null) return null;

        ServiceStationResponse r = new ServiceStationResponse();
        r.setId(s.getId());
        r.setName(s.getName());
        r.setRegistrationNo(s.getRegistrationNo());
        r.setAddress(s.getAddress());
        r.setContactPerson(s.getContactPerson());
        r.setPhoneNumbers(
            s.getPhoneNumbers() != null && !s.getPhoneNumbers().isEmpty()
                ? java.util.Arrays.asList(s.getPhoneNumbers().split(","))
                : java.util.Collections.emptyList()
        );
        r.setEmail(s.getEmail());
        r.setRemarks(s.getRemarks());
        r.setTenderStatus(s.getTenderStatus());
        r.setActive(s.getActive());
        r.setCreatedAt(s.getCreatedAt());
        r.setUpdatedAt(s.getUpdatedAt());

        // Contracts
        if (s.getContracts() != null) {
            r.setContracts(
                    s.getContracts().stream()
                            .map(ServiceStationMapper::toContractDto)
                            .collect(Collectors.toList())
            );
        }

        return r;
    }

    // ============================
    //     CONTRACT → DTO
    // ============================
    public static ServiceStationContractDto toContractDto(ServiceStationContract c) {
        if (c == null) return null;

        ServiceStationContractDto d = new ServiceStationContractDto();
        d.setId(c.getId());
        d.setServiceCategory(c.getServiceCategory());
        d.setContractedRate(c.getContractedRate());
        d.setCurrency(c.getCurrency());
        d.setEffectiveFrom(c.getEffectiveFrom());
        d.setEffectiveTo(c.getEffectiveTo());
        d.setActive(c.getActive());
        d.setMaxWorkload(c.getMaxWorkload());
        d.setPriorityScore(c.getPriorityScore());

        return d;
    }

    // ============================
    //     DTO → CONTRACT ENTITY
    // ============================
    public static ServiceStationContract toContractEntity(ServiceStationContractDto dto) {
        if (dto == null) return null;

        ServiceStationContract c = new ServiceStationContract();
        c.setId(dto.getId());
        c.setServiceCategory(dto.getServiceCategory());
        c.setContractedRate(dto.getContractedRate());
        c.setCurrency(dto.getCurrency());
        c.setEffectiveFrom(dto.getEffectiveFrom());
        c.setEffectiveTo(dto.getEffectiveTo());
        c.setActive(dto.getActive());
        c.setMaxWorkload(dto.getMaxWorkload());
        c.setPriorityScore(dto.getPriorityScore());

        return c;
    }
}
