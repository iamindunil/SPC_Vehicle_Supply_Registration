package com.example.Indunil.rentvehicle_vehicleservice.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationCreateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationResponse;
import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationUpdateRequest;
import com.example.Indunil.rentvehicle_vehicleservice.dto.ServiceStationContractDto;
import com.example.Indunil.rentvehicle_vehicleservice.entity.ServiceStation;
import com.example.Indunil.rentvehicle_vehicleservice.entity.ServiceStationContract;
import com.example.Indunil.rentvehicle_vehicleservice.exception.ResourceNotFoundException;
import com.example.Indunil.rentvehicle_vehicleservice.repository.ServiceStationContractRepository;
import com.example.Indunil.rentvehicle_vehicleservice.repository.ServiceStationRepository;
import com.example.Indunil.rentvehicle_vehicleservice.mapper.ServiceStationMapper;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ServiceStationServiceImpl implements ServiceStationService {
    private final ServiceStationRepository repository;
    private final ServiceStationContractRepository contractRepository;

    public ServiceStationServiceImpl(ServiceStationRepository repository,
                                     ServiceStationContractRepository contractRepository) {
        this.repository = repository;
        this.contractRepository = contractRepository;
    }

    @Override
    public ServiceStationResponse create(ServiceStationCreateRequest request) {
        ServiceStation station = ServiceStationMapper.toEntity(request);
        ServiceStation saved = repository.save(station);
        return ServiceStationMapper.toResponse(saved);
    }

    @Override
    public ServiceStationResponse update(Long id, ServiceStationUpdateRequest request) {
        ServiceStation existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceStation not found: " + id));
        // Apply DTO -> entity update (mapper should handle field-by-field update)
        ServiceStationMapper.updateEntityFromDto(request, existing);
        ServiceStation updated = repository.save(existing);
        return ServiceStationMapper.toResponse(updated);
    }

    @Override
    public void delete(Long id) {
        ServiceStation existing = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceStation not found: " + id));
        repository.delete(existing);
    }

    @Override
    public ServiceStationResponse getById(Long id) {
        ServiceStation s = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceStation not found: " + id));
        return ServiceStationMapper.toResponse(s);
    }

    @Override
    public List<ServiceStationResponse> listAll() {
        return repository.findAll().stream()
                .map(ServiceStationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ServiceStationResponse> searchByName(String name) {
        return repository.findByNameContainingIgnoreCase(name).stream()
                .map(ServiceStationMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceStationResponse addContract(Long stationId, ServiceStationContractDto dto) {
        ServiceStation station = repository.findById(stationId)
                .orElseThrow(() -> new ResourceNotFoundException("ServiceStation not found: " + stationId));

        ServiceStationContract contract = ServiceStationMapper.toContractEntity(dto);
        contract.setServiceStation(station);

        ServiceStationContract saved = contractRepository.save(contract);

        // ensure the station's contracts collection is updated
        station.getContracts().add(saved);
        repository.save(station); // optional but keeps DB state consistent

        return ServiceStationMapper.toResponse(station);
    }
}
