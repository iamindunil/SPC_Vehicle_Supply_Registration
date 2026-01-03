package com.example.Indunil.rentvehicle_vehicleservice.service;

import java.util.List;

import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationCreateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationResponse;
import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationUpdateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationContractDto;

public interface ServiceStationService {

    ServiceStationResponse create(ServiceStationCreateRequest request);

    ServiceStationResponse update(Long id, ServiceStationUpdateRequest request);

    void delete(Long id);

    ServiceStationResponse getById(Long id);

    List<ServiceStationResponse> listAll();

    List<ServiceStationResponse> searchByName(String name);

    ServiceStationResponse addContract(Long stationId, ServiceStationContractDto dto);
}
