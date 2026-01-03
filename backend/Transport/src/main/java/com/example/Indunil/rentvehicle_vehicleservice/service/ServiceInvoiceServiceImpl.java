package com.example.Indunil.rentvehicle_vehicleservice.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Indunil.rentvehicle_vehicleservice.dto.*;
import com.example.Indunil.rentvehicle_vehicleservice.entity.*;
import com.example.Indunil.rentvehicle_vehicleservice.mapper.ServiceInvoiceMapper;
import com.example.Indunil.rentvehicle_vehicleservice.repository.*;
import com.example.Indunil.rentvehicle_vehicleservice.exception.ResourceNotFoundException;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ServiceInvoiceServiceImpl implements ServiceInvoiceService {

    private final ServiceInvoiceRepository invoiceRepository;

    public ServiceInvoiceServiceImpl(ServiceInvoiceRepository invoiceRepository,
                                     InvoiceActivityRepository activityRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    public InvoiceResponse create(InvoiceCreateRequest request) {

        ServiceInvoice invoice = ServiceInvoiceMapper.toEntity(request);

        invoice.setInvoiceNo(
                "INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()
        );

        // add activities
        if (request.getActivities() != null) {
            for (InvoiceActivityDto dto : request.getActivities()) {
                InvoiceActivity activity = ServiceInvoiceMapper.toEntity(dto);
                activity.setInvoice(invoice);
                invoice.getActivities().add(activity);
            }
        }

        invoice.setTotalAmount(ServiceInvoiceMapper.computeTotal(invoice));

        ServiceInvoice saved = invoiceRepository.save(invoice);
        return ServiceInvoiceMapper.toDto(saved);
    }

    @Override
    public InvoiceResponse update(Long id, InvoiceCreateRequest request) {

        ServiceInvoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found: " + id));

        invoice.setVehicleNo(request.getVehicleNo());
        invoice.setServiceStationId(request.getServiceStationId());
        invoice.setServiceDate(request.getServiceDate());
        invoice.setMileage(request.getMileage());
        invoice.setRemarks(request.getRemarks());
        invoice.setCurrency(request.getCurrency());

        // replace activities
        invoice.getActivities().clear();

        if (request.getActivities() != null) {
            for (InvoiceActivityDto dto : request.getActivities()) {
                InvoiceActivity activity = ServiceInvoiceMapper.toEntity(dto);
                activity.setInvoice(invoice);
                invoice.getActivities().add(activity);
            }
        }

        invoice.setTotalAmount(ServiceInvoiceMapper.computeTotal(invoice));

        ServiceInvoice updated = invoiceRepository.save(invoice);
        return ServiceInvoiceMapper.toDto(updated);
    }

    @Override
    public InvoiceResponse getById(Long id) {
        ServiceInvoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Invoice not found: " + id));
        return ServiceInvoiceMapper.toDto(invoice);
    }

    @Override
    public List<InvoiceResponse> listAll() {
        return invoiceRepository.findAll()
                .stream()
                .map(ServiceInvoiceMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        if (!invoiceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Invoice not found: " + id);
        }
        invoiceRepository.deleteById(id);
    }
}
