// Contract DTO used in Rent Vehicle module (matches backend RentContractDto)
export interface RentContractDto {
  id?: number;                // optional for create, required for edit
  vehicleType: string;        // e.g. "Car", "Van", "Bus"
  rentalRate: number;         // numeric rental rate per vehicle
  currency: string;           // e.g. "LKR", "USD", "EUR"
  effectiveFrom: string;      // ISO date string (YYYY-MM-DD)
  effectiveTo: string;        // ISO date string (YYYY-MM-DD)
  active: boolean;            // contract active status
  maxVehicles: number;        // how many vehicles can be rented under this contract
  priorityScore: number;      // numeric ranking (0–100)
}

// ✅ Request type for creating a new RentContract
export interface RentContractCreateRequest
  extends Omit<RentContractDto, "id"> {}

// ✅ Request type for updating an existing RentContract
export interface RentContractUpdateRequest extends RentContractDto {}

// ✅ Response type (if backend returns timestamps or metadata)
export interface RentContractResponse extends RentContractDto {
  createdAt?: string;
  updatedAt?: string;
}
