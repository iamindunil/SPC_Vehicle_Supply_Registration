package com.example.Indunil.rentvehicle_vehicleservice.service;

import com.example.Indunil.rentvehicle_vehicleservice.dto.*;
import java.util.List;

public interface ServiceInvoiceService {
    InvoiceResponse create(InvoiceCreateRequest request);
    InvoiceResponse update(Long id, InvoiceCreateRequest request);
    InvoiceResponse getById(Long id);
    List<InvoiceResponse> listAll();
    void delete(Long id);
}
