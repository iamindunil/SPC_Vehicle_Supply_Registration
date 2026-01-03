"use client";

import { useSearchParams } from "next/navigation";
import ContractForm from "@/app/Indunil/Transport/Supplies/vehicle_service/components/ContractForm";

export default function EditContractPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id || id === "null") {
    return (
      <p className="text-center text-red-500 mt-10">
        ❌ Missing or invalid contract ID for editing.
      </p>
    );
  }

  return (
    <div className="p-8 bg-[#FFF8F0] rounded-2xl max-w-3xl mx-auto shadow-md">
      <h1 className="text-3xl font-semibold text-[#F57C00] text-center mb-6">
        ✏️ Edit Contract
      </h1>
      <ContractForm contractId={id} />
    </div>
  );
}
