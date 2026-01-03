package com.example.Indunil.rentvehicle_vehicleservice.service;

import com.example.Indunil.rentvehicle_vehicleservice.dto.CabCompanyCreateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.CabCompanyResponse;
import com.example.Indunil.rentvehicle_vehicleservice.dto.CabCompanyUpdateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.RentContractDto;
import com.example.Indunil.rentvehicle_vehicleservice.entity.CabCompany;
import com.example.Indunil.rentvehicle_vehicleservice.entity.RentContract;
import com.example.Indunil.rentvehicle_vehicleservice.mapper.CabCompanyMapper;
import com.example.Indunil.rentvehicle_vehicleservice.repository.CabCompanyRepository;
import com.example.Indunil.rentvehicle_vehicleservice.repository.RentContractRepository;
import com.example.Indunil.rentvehicle_vehicleservice.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CabCompanyServiceImpl implements CabCompanyService {

    private final CabCompanyRepository cabCompanyRepository;
    private final RentContractRepository rentContractRepository;

    public CabCompanyServiceImpl(CabCompanyRepository cabCompanyRepository,
                                 RentContractRepository rentContractRepository) {
        this.cabCompanyRepository = cabCompanyRepository;
        this.rentContractRepository = rentContractRepository;
    }

    @Override
    public CabCompanyResponse create(CabCompanyCreateRequest request) {
        CabCompany company = CabCompanyMapper.toEntity(request);

        if (request.getContracts() != null && !request.getContracts().isEmpty()) {
            for (RentContractDto dto : request.getContracts()) {
                RentContract contract = CabCompanyMapper.toContractEntity(dto);
                contract.setCabCompany(company);
                company.getContracts().add(contract);
            }
        }

        CabCompany saved = cabCompanyRepository.save(company);
        return CabCompanyMapper.toResponse(saved);
    }

    @Override
    public CabCompanyResponse update(Long id, CabCompanyUpdateRequest request) {
        CabCompany company = cabCompanyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cab company not found: " + id));

        if (request.getName() != null) company.setName(request.getName());
        if (request.getAddress() != null) company.setAddress(request.getAddress());
        if (request.getEmail() != null) company.setEmail(request.getEmail());
        if (request.getContactPerson() != null) company.setContactPerson(request.getContactPerson());
        if (request.getPhoneNumbers() != null) company.setPhoneNumbers(request.getPhoneNumbers());
        if (request.getRemarks() != null) company.setRemarks(request.getRemarks());
        if (request.getLicenseStatus() != null) company.setLicenseStatus(request.getLicenseStatus());
        if (request.getActive() != null) company.setActive(request.getActive());

        CabCompany updated = cabCompanyRepository.save(company);
        return CabCompanyMapper.toResponse(updated);
    }

    @Override
    public CabCompanyResponse getById(Long id) {
        CabCompany company = cabCompanyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cab company not found: " + id));
        return CabCompanyMapper.toResponse(company);
    }

    @Override
    public List<CabCompanyResponse> listAll() {
        return cabCompanyRepository.findAll().stream()
                .map(CabCompanyMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        if (!cabCompanyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cab company not found: " + id);
        }
        cabCompanyRepository.deleteById(id);
    }

    @Override
    public CabCompanyResponse addContract(Long id, RentContractDto contractDto) {
        CabCompany company = cabCompanyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cab company not found: " + id));

        RentContract contract = CabCompanyMapper.toContractEntity(contractDto);
        contract.setCabCompany(company);
        RentContract saved = rentContractRepository.save(contract);

        // ensure company has the contract and persist relationship
        company.getContracts().add(saved);
        cabCompanyRepository.save(company);

        return CabCompanyMapper.toResponse(company);
    }

    @Override
    public RentContractDto updateContract(Long contractId, RentContractDto updatedContract) {
        RentContract contract = rentContractRepository.findById(contractId)
                .orElseThrow(() -> new ResourceNotFoundException("Contract not found with id: " + contractId));

        // update fields (null-checks to allow partial updates)
        if (updatedContract.getVehicleType() != null) contract.setVehicleType(updatedContract.getVehicleType());
        if (updatedContract.getRentalRate() != null) contract.setRentalRate(updatedContract.getRentalRate());
        if (updatedContract.getCurrency() != null) contract.setCurrency(updatedContract.getCurrency());
        if (updatedContract.getEffectiveFrom() != null) contract.setEffectiveFrom(updatedContract.getEffectiveFrom());
        if (updatedContract.getEffectiveTo() != null) contract.setEffectiveTo(updatedContract.getEffectiveTo());
        if (updatedContract.getActive() != null) contract.setActive(updatedContract.getActive());
        if (updatedContract.getMaxVehicles() != null) contract.setMaxVehicles(updatedContract.getMaxVehicles());
        if (updatedContract.getPriorityScore() != null) contract.setPriorityScore(updatedContract.getPriorityScore());

        RentContract saved = rentContractRepository.save(contract);
        return CabCompanyMapper.contractToDto(saved);
    }

    @Override
    public List<CabCompanyResponse> searchByName(String name) {
        return cabCompanyRepository.findByNameContainingIgnoreCase(name).stream()
                .map(CabCompanyMapper::toResponse)
                .collect(Collectors.toList());
    }
}
