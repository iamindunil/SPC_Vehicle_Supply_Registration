"use client";

import { useSearchParams } from "next/navigation";
import ContractForm from "@/app/Indunil/Transport/Supplies/vehicle_service/components/ContractForm";

export default function CreateContractPage() {
  const searchParams = useSearchParams();
  const stationId = searchParams.get("stationId");

  if (!stationId) {
    return (
      <p className="text-center text-red-500 mt-10">
        ❌ Missing station ID for creating contract.
      </p>
    );
  }

  return (
    <div className="p-8 bg-[#FFF8F0] rounded-2xl max-w-3xl mx-auto shadow-md">
      <h1 className="text-3xl font-semibold text-[#F57C00] text-center mb-6">
        Add New Contract
      </h1>
      <ContractForm stationId={stationId} />
    </div>
  );
}
