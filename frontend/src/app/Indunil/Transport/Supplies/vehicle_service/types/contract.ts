// Contract DTO used by frontend (matches backend ServiceStationContractDto)
export interface ContractDto {
  serviceCategory: string;
  contractedRate: number;     // number in frontend; backend accepts decimal
  currency?: string;
  effectiveFrom: string;      // ISO date string (e.g. "2025-10-01")
  effectiveTo?: string;       // optional ISO date string
  active?: boolean;
  maxWorkload?: number;
  priorityScore?: number;
}
