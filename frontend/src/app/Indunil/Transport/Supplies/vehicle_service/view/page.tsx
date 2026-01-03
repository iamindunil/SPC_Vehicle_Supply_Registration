"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// Update the path below to the correct location of serviceStationApi
import { fetchStationById } from "../api/serviceStationApi";
import { ServiceStationResponse } from "../types/serviceStation";
import { Pencil } from "lucide-react";

export default function ViewStationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [station, setStation] = useState<ServiceStationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchStationById(id)
      .then((data) => setStation(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading...
      </p>
    );

  if (!station)
    return (
      <p className="text-center mt-10 text-red-500">
        Service station not found.
      </p>
    );

  return (
    <div className="p-8 bg-white shadow-inner rounded-tl-2xl">
      <h1 className="text-3xl font-semibold text-[#F57C00] mb-6 text-center">
        Service Station Details
      </h1>

      {/* 🟧 Main Info Card */}
      <div className="max-w-4xl mx-auto bg-[#FFF8F0] p-8 rounded-2xl border border-orange-200 shadow-sm">
        {/* Station info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <Detail label="Name" value={station.name} />
          <Detail label="Email" value={station.email} />
          <Detail
            label="Phone Numbers"
            value={station.phoneNumbers?.join(", ") || "N/A"}
          />
          <Detail label="Address" value={station.address} />
          <Detail label="Contact Person" value={station.contactPerson} />
          <Detail label="Registration No" value={station.registrationNo} />
          <Detail label="Tender Status" value={station.tenderStatus} />
          <Detail
            label="Active"
            value={station.active ? "Yes" : "No"}
            color={station.active ? "text-green-600" : "text-red-500"}
          />
          <Detail label="Remarks" value={station.remarks || "N/A"} />
          <Detail
            label="Created At"
            value={
              station.createdAt
                ? new Date(station.createdAt).toLocaleString()
                : "N/A"
            }
          />
          <Detail
            label="Updated At"
            value={
              station.updatedAt
                ? new Date(station.updatedAt).toLocaleString()
                : "N/A"
            }
          />
        </div>

        {/* 🟧 Contracts Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#F57C00] mb-4">
            Contracts
          </h2>

          {station.contracts && station.contracts.length > 0 ? (
            <div className="space-y-6">
              {station.contracts.map((c, i) => (
                <div
                  key={c.id ?? `contract-${i}`}
                  className="relative bg-white p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition"
                >
                  {/* Mini Edit Button (per-contract) */}
                  <button
                    onClick={() => {
                      /*const contractId =c.id; */ // fallback if id exists later

                    if (c.id) {
                    router.push(`/Indunil/Transport/Supplies/vehicle_service/contracts/edit?id=${c.id}`);
                    } else {
                    alert("⚠️ This contract has no valid ID.");
                    }
                  }}
                    className="absolute top-4 right-4 text-[#F57C00] hover:text-[#E65100] transition"
                    title="Edit Contract"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Contract Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 leading-relaxed">
                    <Detail label="Service Category" value={c.serviceCategory} />
                    <Detail
                      label="Contracted Rate"
                      value={
                        c.contractedRate
                          ? `${c.contractedRate} ${c.currency || ""}`
                          : "N/A"
                      }
                    />
                    <Detail
                      label="Effective From"
                      value={c.effectiveFrom || "N/A"}
                    />
                    <Detail label="Effective To" value={c.effectiveTo || "N/A"} />
                    <Detail
                      label="Max Workload"
                      value={c.maxWorkload?.toString() || "N/A"}
                    />
                    <Detail
                      label="Priority Score"
                      value={c.priorityScore?.toString() || "N/A"}
                    />
                    <Detail
                      label="Active"
                      value={c.active ? "Yes" : "No"}
                      color={c.active ? "text-green-600" : "text-red-500"}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No contracts found.</p>
          )}
        </div>

        {/* 🟧 Navigation Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => router.push("/Indunil/Transport/Supplies/vehicle_service")}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Back
          </button>

          <button
            onClick={() =>
              router.push(`/Indunil/Transport/Supplies/vehicle_service/edit?id=${station.id}`)
            }
            className="px-6 py-2 rounded-lg bg-[#F57C00] text-white hover:bg-[#e36d00] transition"
          >
            Edit Station
          </button>

          {/* 🟧 Add Contract Button (redirects to create page) */}
          {station.id && (
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/Indunil/Transport/Supplies/vehicle_service/contracts/create?stationId=${station.id}`
                )
              }
              className="px-6 py-2 rounded-lg bg-[#F57C00] text-white hover:bg-[#e36d00] transition"
            >
              ➕ Add Contract
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* 🧩 Small helper component for better readability */
function Detail({
  label,
  value,
  color,
}: {
  label: string;
  value?: string | number | null;
  color?: string;
}) {
  return (
    <div>
      <p className="font-semibold text-[#F57C00] text-sm tracking-wide">
        {label}:
      </p>
      <p className={`text-base ${color || "text-gray-800"} mt-0.5`}>
        {value || "N/A"}
      </p>
    </div>
  );
}
