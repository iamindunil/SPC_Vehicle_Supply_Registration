// Supplies/invoice_service/types/invoice.ts

export interface InvoiceActivityDto {
  id?: number;
  description: string;
  cost: number;
}

export interface InvoiceCreateRequest {
  vehicleNo: string;
  serviceStationId: number;
  serviceDate: string;
  mileage?: number;
  currency?: string;
  remarks?: string;
  activities: InvoiceActivityDto[];
}

export interface InvoiceResponse {
  id: number;
  invoiceNo: string;
  vehicleNo: string;
  serviceStationId: number;
  serviceDate: string;
  mileage?: number;
  totalAmount: number;
  currency: string;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
  activities: InvoiceActivityDto[];
}
