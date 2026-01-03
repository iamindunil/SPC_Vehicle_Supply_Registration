// src/app/Indunil/vehicle_service/api/serviceStationApi.ts

import {
  ServiceStationResponse,
  ServiceStationCreateRequest,
  ServiceStationUpdateRequest,
  ServiceStationContractDto,
} from "../../vehicle_service/types/serviceStation";

// Backend base URL
const BASE_URL = "http://localhost:8081/api/service-stations";


async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("❌ API Error:", res.status, text);
    throw new Error(`Request failed (${res.status}) ${text}`);  

  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

// GET all stations
export async function fetchStations(): Promise<ServiceStationResponse[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  return await handleResponse(res);
}

// GET station by ID
export async function fetchStationById(
  id: string | number
): Promise<ServiceStationResponse> {
  if (!id) throw new Error("Station ID is required");
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  return await handleResponse(res);
}

// CREATE a new service station
export async function createStation(
  data: ServiceStationCreateRequest
): Promise<ServiceStationResponse> {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await handleResponse(res); // ✅ return created station with its ID
}

// UPDATE existing station
export async function updateStation(
  id: string | number,
  data: ServiceStationUpdateRequest
) {
  if (!id) throw new Error("Station ID is required for update");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
}

// DELETE station
export async function deleteStation(id: string | number) {
  if (!id) throw new Error("Station ID is required for delete");
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  await handleResponse(res);
  return true;
}

// CREATE contract for a station
export async function createContract(
  stationId: string | number,
  data: ServiceStationContractDto
): Promise<ServiceStationResponse> {
  const id = String(stationId);
  const res = await fetch(`${BASE_URL}/${id}/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
}

// FETCH all contracts for a station
export async function fetchContractsByStation(
  stationId: string | number
): Promise<ServiceStationContractDto[]> {
  const id = String(stationId);
  const station = await fetchStationById(id);
  return station.contracts ?? [];
}

// DELETE a specific contract
export async function removeContract(
  stationId: string | number,
  contractId: string | number
): Promise<boolean> {
  const sid = String(stationId);
  const cid = String(contractId);
  const res = await fetch(`${BASE_URL}/${sid}/contracts/${cid}`, {
    method: "DELETE",
  });
  await handleResponse(res);
  return true;
}

/* ---------- NEW: single-contract endpoints (frontend helpers) ---------- */

// FETCH single contract by contractId
// NOTE: adjust backend route if your API differs.
// Two possible patterns exist in backends:
// 1) GET /api/service-stations/contracts/{contractId}   (flat contracts resource)
// 2) GET /api/service-stations/{stationId}/contracts/{contractId}  (nested)
export async function fetchContractById(
  contractId: string | number
): Promise<ServiceStationContractDto> {
  const id = String(contractId);
  // I assume a flat contract endpoint exists at /api/service-stations/contracts/{id}
  const res = await fetch(`${BASE_URL}/contracts/${id}`, { cache: "no-store" });
  return await handleResponse(res);
}

// UPDATE a contract by contractId
export async function updateContract(
  contractId: string | number,
  data: ServiceStationContractDto
): Promise<ServiceStationContractDto> {
  const id = String(contractId);
  const res = await fetch(`${BASE_URL}/contracts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
}

// FETCH all contracts (across all stations)
export async function fetchAllContracts(): Promise<ServiceStationContractDto[]> {
  const stations = await fetchStations();
  const allContracts = stations.flatMap((s) =>
    s.contracts?.map((c) => ({ ...c, stationName: s.name })) || []
  );
  return allContracts;
}