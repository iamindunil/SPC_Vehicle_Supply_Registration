"use client";

import { useEffect, useState } from "react";
import { fetchAllContracts } from "../../serviceinvoice/api/serviceStationApi";
import { ServiceStationContractDto } from "../types/serviceStation";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<ServiceStationContractDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllContracts()
      .then((data) => setContracts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading contracts...
      </p>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F0] p-8 items-center justify-start">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 border border-orange-200 transition-all hover:shadow-xl hover:border-orange-300 duration-300">
        <h2 className="text-3xl font-bold text-[#F57C00] mb-6 text-center tracking-tight">
          All Service Station Contracts
        </h2>

        {contracts.length > 0 ? (
          <div className="space-y-6">
            {contracts.map((c) => (
              <div
                key={c.id}
                className="bg-[#FFF8F0] p-6 rounded-2xl border border-orange-100 shadow-sm hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <Detail label="Service Station" value={c.stationName || "N/A"} />
                  <Detail label="Service Category" value={c.serviceCategory} />
                  <Detail
                    label="Contracted Rate"
                    value={`${c.contractedRate} ${c.currency || ""}`}
                  />
                  <Detail label="Effective From" value={c.effectiveFrom || "N/A"} />
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
          <p className="text-center text-gray-500 italic">
            No contracts found.
          </p>
        )}
      </div>
    </div>
  );
}

/* Small helper for displaying contract info */
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
