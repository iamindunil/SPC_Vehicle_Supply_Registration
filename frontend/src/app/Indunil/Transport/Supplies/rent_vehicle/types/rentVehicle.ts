export interface RentContractDto {
  id?: number;
  vehicleType: string;
  rentalRate: number;
  currency: string;
  effectiveFrom: string;
  effectiveTo: string;
  active: boolean;
  maxVehicles: number;
  priorityScore: number;
  companyId?: number;
}

export interface CabCompanyCreateRequest {
  name: string;
  registrationNo: string;
  address?: string;
  contactPerson?: string;
  phoneNumbers: string[];
  email?: string;
  remarks?: string;
  licenseStatus?: string;
  active: boolean;
}

export interface CabCompanyUpdateRequest extends CabCompanyCreateRequest {}

export interface CabCompanyResponse extends CabCompanyCreateRequest {
  id: number;
  createdAt: string;
  updatedAt: string;
  phoneNumbers: string[];
  contracts: RentContractDto[]; // 👈 IMPORTANT FIX
}
