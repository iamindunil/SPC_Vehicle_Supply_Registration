// src/app/Indunil/vehicle_service/types/serviceStation.ts

export interface ServiceStationContractDto {
  id?: string | number;
  serviceCategory: string;
  contractedRate: number;   // matches backend BigDecimal
  currency: string;
  effectiveFrom: string;    // LocalDate → string
  effectiveTo: string;      // LocalDate → string
  active: boolean;
  maxWorkload: number;
  priorityScore: number;
  stationName?: string;

}

export interface ServiceStationResponse {
  id: string;
  name: string;
  registrationNo: string;
  address: string;
  contactPerson: string;
  phoneNumbers: string[];
  email: string;
  remarks: string;
  tenderStatus: string;
  active: boolean;
  contracts: ServiceStationContractDto[];
  createdAt: string; // LocalDateTime → string
  updatedAt: string; // LocalDateTime → string
  type: string;
}

export interface ServiceStationCreateRequest {
  name: string;
  email: string;
  phoneNumbers?: string[];
  address: string;
  registrationNo?: string;
  contactPerson?: string;
  remarks?: string;
  tenderStatus?: string;
  active?: boolean;
  contracts?: ServiceStationContractDto[];
}

export interface ServiceStationUpdateRequest {
  name?: string;
  email?: string;
  phoneNumbers?: string[];
  address?: string;
  registrationNo?: string;
  contactPerson?: string;
  remarks?: string;
  tenderStatus?: string;
  active?: boolean;
  contracts?: ServiceStationContractDto[];
}

