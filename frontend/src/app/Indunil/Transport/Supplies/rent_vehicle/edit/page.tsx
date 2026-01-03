"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RentCompanyForm from "../components/RentCompanyForm";
import { fetchCabCompanyById, updateCabCompany } from "../api/rentVehicleApi";
import { CabCompanyResponse } from "../types/rentVehicle";

export default function EditCabCompanyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [company, setCompany] = useState<CabCompanyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCabCompanyById(id)
        .then((data) => setCompany(data))
        .catch((err) => console.error("Error fetching company:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  async function handleSubmit(data: CabCompanyResponse) {
    if (!id) return;
    try {
      await updateCabCompany(id, data);
      router.push("/Indunil/Transport/Supplies/rent_vehicle");
    } catch (err) {
      console.error("Error updating company:", err);
      alert("Failed to update cab company");
    }
  }

  if (loading || !company) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading company details...
      </p>
    );
  }

  return (
    <div className="p-8 bg-white shadow-inner rounded-tl-2xl">
      <h1 className="text-3xl font-semibold text-[#F57C00] mb-6 text-center">
        Edit Cab Company
      </h1>
      <div className="max-w-3xl mx-auto">
        <RentCompanyForm initialData={company} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
