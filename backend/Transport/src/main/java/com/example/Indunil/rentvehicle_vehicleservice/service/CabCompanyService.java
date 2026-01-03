package com.example.Indunil.rentvehicle_vehicleservice.service;

import com.example.Indunil.rentvehicle_vehicleservice.dto.CabCompanyCreateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.CabCompanyResponse;
import com.example.Indunil.rentvehicle_vehicleservice.dto.CabCompanyUpdateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.RentContractDto;

import java.util.List;

public interface CabCompanyService {

    CabCompanyResponse create(CabCompanyCreateRequest request);

    CabCompanyResponse update(Long id, CabCompanyUpdateRequest request);

    CabCompanyResponse getById(Long id);

    List<CabCompanyResponse> listAll();

    void delete(Long id);

    CabCompanyResponse addContract(Long id, RentContractDto contractDto);

    // Update contract method
    RentContractDto updateContract(Long contractId, RentContractDto updatedContract);

    List<CabCompanyResponse> searchByName(String name);
}
