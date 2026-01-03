package com.example.Indunil.rentvehicle_vehicleservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.Indunil.rentvehicle_vehicleservice.dto.*;
import com.example.Indunil.rentvehicle_vehicleservice.entity.RentContract;
import com.example.Indunil.rentvehicle_vehicleservice.mapper.CabCompanyMapper;
import com.example.Indunil.rentvehicle_vehicleservice.repository.RentContractRepository;
import com.example.Indunil.rentvehicle_vehicleservice.service.CabCompanyService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/api/cab-companies")
public class CabServiceRegistrationController {

    private final CabCompanyService cabCompanyService;

    @Autowired
    private RentContractRepository rentContractRepository;

    public CabServiceRegistrationController(CabCompanyService cabCompanyService) {
        this.cabCompanyService = cabCompanyService;
    }

    // Create a new Cab Company
    @PostMapping
    public ResponseEntity<CabCompanyResponse> create(@RequestBody CabCompanyCreateRequest request) {
        CabCompanyResponse created = cabCompanyService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // Update Cab Company
    @PutMapping("/{id}")
    public ResponseEntity<CabCompanyResponse> update(
            @PathVariable Long id,
            @RequestBody CabCompanyUpdateRequest request) {
        return ResponseEntity.ok(cabCompanyService.update(id, request));
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<CabCompanyResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(cabCompanyService.getById(id));
    }

    // List all companies
    @GetMapping
    public ResponseEntity<List<CabCompanyResponse>> getAll() {
        return ResponseEntity.ok(cabCompanyService.listAll());
    }

    // Get a contract by ID
    @GetMapping("/contracts/{contractId}")
    public ResponseEntity<RentContractDto> getContractById(@PathVariable Long contractId) {
        RentContract contract = rentContractRepository.findById(contractId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contract not found"));
        return ResponseEntity.ok(CabCompanyMapper.contractToDto(contract));
    }

    // Update a contract
    @PutMapping("/contracts/{contractId}")
    public ResponseEntity<RentContractDto> updateContract(
            @PathVariable Long contractId,
            @RequestBody RentContractDto updatedContract
    ) {
        RentContractDto result = cabCompanyService.updateContract(contractId, updatedContract);
        return ResponseEntity.ok(result);
    }

    // Delete a company
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        cabCompanyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Add contract to company
    @PostMapping("/{id}/contracts")
    public ResponseEntity<CabCompanyResponse> addContract(
            @PathVariable Long id,
            @RequestBody RentContractDto contractDto
    ) {
        CabCompanyResponse response = cabCompanyService.addContract(id, contractDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
