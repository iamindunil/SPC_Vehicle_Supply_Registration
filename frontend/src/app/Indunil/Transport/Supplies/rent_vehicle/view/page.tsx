"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCabCompanyById } from "../api/rentVehicleApi";
import { CabCompanyResponse } from "../types/rentVehicle";
import { Pencil } from "lucide-react";

export default function ViewCabCompanyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [company, setCompany] = useState<CabCompanyResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCabCompanyById(id)
      .then((data) => setCompany(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading...
      </p>
    );

  if (!company)
    return (
      <p className="text-center mt-10 text-red-500">
        Cab company not found.
      </p>
    );

  return (
    <div className="p-8 bg-white shadow-inner rounded-tl-2xl">
      <h1 className="text-3xl font-semibold text-[#F57C00] mb-6 text-center">
        Cab Company Details
      </h1>

      {/* 🟧 Main Info Card */}
      <div className="max-w-4xl mx-auto bg-[#FFF8F0] p-8 rounded-2xl border border-orange-200 shadow-sm">
        {/* Company info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800">
          <Detail label="Name" value={company.name} />
          <Detail label="Email" value={company.email} />
          <Detail
            label="Phone Numbers"
            value={company.phoneNumbers?.join(", ") || "N/A"}
          />
          <Detail label="Address" value={company.address} />
          <Detail label="Contact Person" value={company.contactPerson} />
          <Detail label="Registration No" value={company.registrationNo} />
          <Detail label="License Status" value={company.licenseStatus} />
          <Detail
            label="Active"
            value={company.active ? "Yes" : "No"}
            color={company.active ? "text-green-600" : "text-red-500"}
          />
          <Detail label="Remarks" value={company.remarks || "N/A"} />
          <Detail
            label="Created At"
            value={
              company.createdAt
                ? new Date(company.createdAt).toLocaleString()
                : "N/A"
            }
          />
          <Detail
            label="Updated At"
            value={
              company.updatedAt
                ? new Date(company.updatedAt).toLocaleString()
                : "N/A"
            }
          />
        </div>

        {/* 🟧 Contracts Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#F57C00] mb-4">
            Rent Contracts
          </h2>

          {company.contracts && company.contracts.length > 0 ? (
            <div className="space-y-6">
              {company.contracts.map((c, i) => (
                <div
                  key={c.id ?? `contract-${i}`}
                  className="relative bg-white p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition"
                >
                  {/* Mini Edit Button (per-contract) */}
                  <button
                    onClick={() => {
                      if (c.id) {
                        router.push(
                          `/Indunil/rent_vehicle/contracts/edit?id=${c.id}&companyId=${company.id}`
                        );
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
                    <Detail label="Vehicle Type" value={c.vehicleType} />
                    <Detail
                      label="Rental Rate"
                      value={
                        c.rentalRate
                          ? `${c.rentalRate} ${c.currency || ""}`
                          : "N/A"
                      }
                    />
                    <Detail
                      label="Effective From"
                      value={c.effectiveFrom || "N/A"}
                    />
                    <Detail label="Effective To" value={c.effectiveTo || "N/A"} />
                    <Detail
                      label="Max Vehicles"
                      value={c.maxVehicles?.toString() || "N/A"}
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
            <p className="text-gray-500 italic">No rent contracts found.</p>
          )}
        </div>

        {/* 🟧 Navigation Buttons */}
        <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={() => router.push("/Indunil/rent_vehicle")}
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Back
          </button>

          <button
            onClick={() =>
              router.push(`/Indunil/rent_vehicle/edit?id=${company.id}`)
            }
            className="px-6 py-2 rounded-lg bg-[#F57C00] text-white hover:bg-[#e36d00] transition"
          >
            Edit Company
          </button>

          {/* 🟧 Add Contract Button */}
          {company.id && (
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/Indunil/rent_vehicle/contracts/create?companyId=${company.id}`
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
