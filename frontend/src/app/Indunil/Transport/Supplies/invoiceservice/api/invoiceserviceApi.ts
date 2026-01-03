// Supplies/invoice_service/api/invoiceServiceApi.ts

import { InvoiceCreateRequest, InvoiceResponse } from "../types/invoice";

const BASE_URL = "http://localhost:8081/api/service-invoices";
const STATION_URL = "http://localhost:8081/api/service-stations"; // ✅ ADD

export async function fetchInvoices(): Promise<InvoiceResponse[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch invoices");
  return res.json();
}

export async function fetchInvoiceById(id: number): Promise<InvoiceResponse> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch invoice");
  return res.json();
}

export async function createInvoice(
  payload: InvoiceCreateRequest
): Promise<InvoiceResponse> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create invoice");
  return res.json();
}

export async function updateInvoice(
  id: number,
  payload: InvoiceCreateRequest
): Promise<InvoiceResponse> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update invoice");
  return res.json();
}

export async function deleteInvoice(id: number) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete invoice");
}

/* ===============================
   ✅ ADD THIS FUNCTION
================================ */
export async function fetchServiceStations(): Promise<
  { id: number; name: string }[]
> {
  const res = await fetch(STATION_URL);
  if (!res.ok) throw new Error("Failed to fetch service stations");
  return res.json();
}
