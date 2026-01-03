// src/app/Indunil/rent_vehicle/api/rentVehicleApi.ts

import {
  CabCompanyResponse,
  CabCompanyCreateRequest,
  CabCompanyUpdateRequest,
  RentContractDto,
} from "../types/rentVehicle";

/* -------------------- Configuration -------------------- */

const BASE_URL = "http://localhost:8081/api/cab-companies";

/* -------------------- Common Response Handler -------------------- */

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

/* -------------------- Cab Company CRUD -------------------- */

// GET all cab companies
export async function fetchCabCompanies(): Promise<CabCompanyResponse[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  return await handleResponse(res);
}

// GET company by ID
export async function fetchCabCompanyById(
  id: string | number
): Promise<CabCompanyResponse> {
  if (!id) throw new Error("Cab company ID is required");
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  return await handleResponse(res);
}

// CREATE new cab company
export async function createCabCompany(
  data: CabCompanyCreateRequest
): Promise<CabCompanyResponse> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
}

// UPDATE existing cab company
export async function updateCabCompany(
  id: string | number,
  data: CabCompanyUpdateRequest
): Promise<CabCompanyResponse> {
  if (!id) throw new Error("Cab company ID is required for update");
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
}

// DELETE cab company
export async function deleteCabCompany(id: string | number): Promise<boolean> {
  if (!id) throw new Error("Cab company ID is required for delete");
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  await handleResponse(res);
  return true;
}

/* -------------------- Rent Contract APIs -------------------- */

// ✅ CREATE a new contract for a company
export async function createRentContract(
  companyId: string | number,
  data: RentContractDto
): Promise<RentContractDto> {
  if (!companyId) throw new Error("Company ID is required for contract creation");

  const id = String(companyId);
  const res = await fetch(`${BASE_URL}/${id}/contracts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Failed to create contract:", res.status, errText);
    throw new Error(`Failed to create rent contract: ${res.status}`);
  }

  // Backend returns CabCompanyResponse, but we can extract last contract
  const companyData: CabCompanyResponse = await res.json();
  const lastContract =
    companyData.contracts && companyData.contracts.length > 0
      ? companyData.contracts[companyData.contracts.length - 1]
      : null;

  return lastContract as RentContractDto;
}

// ✅ GET single contract by contractId
export async function fetchContractById(
  contractId: string | number
): Promise<RentContractDto> {
  const id = String(contractId);
  const res = await fetch(`${BASE_URL}/contracts/${id}`, { cache: "no-store" });
  return await handleResponse(res);
}

// ✅ FETCH all contracts for a specific cab company
export async function fetchContractsByCompany(
  companyId: string | number
): Promise<RentContractDto[]> {
  const company = await fetchCabCompanyById(companyId);
  return company.contracts ?? [];
}

// ✅ UPDATE existing rent contract
export async function updateContract(
  contractId: string | number,
  data: RentContractDto
): Promise<RentContractDto> {
  if (!contractId) throw new Error("Contract ID is required for update");
  const id = String(contractId);
  const res = await fetch(`${BASE_URL}/contracts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await handleResponse(res);
}

// ✅ DELETE a specific contract
export async function deleteContract(
  companyId: string | number,
  contractId: string | number
): Promise<boolean> {
  const cid = String(companyId);
  const conid = String(contractId);
  const res = await fetch(`${BASE_URL}/${cid}/contracts/${conid}`, {
    method: "DELETE",
  });
  await handleResponse(res);
  return true;
}

// ✅ FETCH all contracts across all companies
export async function fetchAllContracts(): Promise<RentContractDto[]> {
  const companies = await fetchCabCompanies();
  const allContracts = companies.flatMap((c) =>
    c.contracts?.map((contract) => ({
      ...contract,
      companyName: c.name,
    })) || []
  );
  return allContracts;
}
