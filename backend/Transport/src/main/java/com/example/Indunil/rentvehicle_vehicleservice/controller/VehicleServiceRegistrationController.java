package com.example.Indunil.rentvehicle_vehicleservice.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;

import com.example.Indunil.rentvehicle_vehicleservice.dto.*;
import com.example.Indunil.rentvehicle_vehicleservice.entity.ServiceStationContract;
import com.example.Indunil.rentvehicle_vehicleservice.mapper.ServiceStationMapper;
import com.example.Indunil.rentvehicle_vehicleservice.repository.ServiceStationContractRepository;
import com.example.Indunil.rentvehicle_vehicleservice.service.ServiceStationService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/service-stations")
public class VehicleServiceRegistrationController {

    private final ServiceStationService serviceStationService;

    @Autowired
    private ServiceStationContractRepository contractRepository;

    public VehicleServiceRegistrationController(ServiceStationService serviceStationService) {
        this.serviceStationService = serviceStationService;
    }

    // Create new service station
    @PostMapping
    public ResponseEntity<ServiceStationResponse> create(@RequestBody ServiceStationCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceStationService.create(request));
    }

    // Update station
    @PutMapping("/{id}")
    public ResponseEntity<ServiceStationResponse> update(
            @PathVariable Long id,
            @RequestBody ServiceStationUpdateRequest request) {
        return ResponseEntity.ok(serviceStationService.update(id, request));
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<ServiceStationResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceStationService.getById(id));
    }

    // List all
    @GetMapping
    public ResponseEntity<List<ServiceStationResponse>> getAll() {
        return ResponseEntity.ok(serviceStationService.listAll());
    }

    // Get contract by ID
    @GetMapping("/contracts/{contractId}")
    public ResponseEntity<ServiceStationContractDto> getContractById(@PathVariable Long contractId) {
        ServiceStationContract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Contract not found"));
        return ResponseEntity.ok(ServiceStationMapper.toContractDto(contract));
    }

    // Delete service station
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceStationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Add contract to station
    @PostMapping("/{id}/contracts")
    public ResponseEntity<ServiceStationResponse> addContract(
            @PathVariable Long id,
            @RequestBody ServiceStationContractDto contractDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceStationService.addContract(id, contractDto));
    }
}
