"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import StationForm from "../components/StationForm";
// Update the import path below to the correct relative path where serviceStationApi.ts exists

import { ServiceStationResponse } from "../types/serviceStation";

export default function EditStationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [station, setStation] = useState<ServiceStationResponse | null>(null);

  useEffect(() => {
    if (id) fetchStationById(id).then(setStation).catch(console.error);
  }, [id]);

  async function handleSubmit(data: any): Promise<void> {
    if (!id) return;

    await updateStation(id, data);

    router.push(
      `/Indunil/Transport/Supplies/vehicle_service/view?id=${id}`
    );
  }

  if (!station)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-8 bg-white shadow-inner rounded-tl-2xl">
      <h1 className="text-3xl font-semibold text-[#F57C00] mb-6 text-center">
        Edit Service Station
      </h1>

      <div className="max-w-3xl mx-auto">
        <StationForm initialData={station} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
