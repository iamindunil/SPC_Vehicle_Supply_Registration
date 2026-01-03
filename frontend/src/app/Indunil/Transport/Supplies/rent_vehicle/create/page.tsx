"use client";

import { useRouter } from "next/navigation";
import RentCompanyForm from "../components/RentCompanyForm";
import { createCabCompany } from "../api/rentVehicleApi";

export default function CreateCabCompanyPage() {
  const router = useRouter();

  async function handleSubmit(data: any) {
    try {
      // ✅ Create the cab company and get its response
      const createdCompany = await createCabCompany(data);

      if (createdCompany?.id) {
        // ✅ Redirect to contracts page with companyId in query
        router.push(
          `/Indunil/Transport/Supplies/rent_vehicle/contracts?companyId=${createdCompany.id}`
        );
      } else {
        alert("Cab company created, but no ID returned from server.");
      }

      return createdCompany;
    } catch (error) {
      console.error("Failed to create cab company:", error);
      alert("Error creating cab company");
      return null;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F0] p-8 items-center justify-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-orange-200 transition-all hover:shadow-xl hover:border-orange-300 duration-300">
        <h1 className="text-3xl font-bold text-[#F57C00] mb-6 text-center tracking-tight">
          Register New Cab Company
        </h1>
        <RentCompanyForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
