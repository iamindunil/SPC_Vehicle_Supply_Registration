"use client";

import { useRouter } from "next/navigation";
import StationForm from "../components/StationForm";
import { createStation } from "../../invoiceservice/api/invoiceserviceApi";

export default function CreateStationPage() {
  const router = useRouter();

  async function handleSubmit(data: any): Promise<void> {
    try {
      const createdStation = await createStation(data);

      if (createdStation?.id) {
        router.push(
          `/Indunil/Transport/Supplies/vehicle_service/view?id=${createdStation.id}`
        );
        return;
      }

      alert("Station created, but ID missing.");
    } catch (err) {
      console.error(err);
      alert("Failed to create station.");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F0] p-8 items-center justify-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
        <h1 className="text-3xl font-bold text-[#F57C00] mb-6 text-center">
          Add New Service Station
        </h1>

        <StationForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
