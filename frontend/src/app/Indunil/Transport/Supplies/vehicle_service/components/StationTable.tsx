"use client";

import { ServiceStationResponse } from "../types/serviceStation";
import { useRouter } from "next/navigation";
import { Trash2, Pencil, Eye } from "lucide-react";
import { useState } from "react";
import DetailsCard from "./DetailsCard";

interface Props {
  stations: ServiceStationResponse[];
  onDelete: (id: string) => void;
}

export default function StationTable({ stations, onDelete }: Props) {
  const router = useRouter();

  // ✅ For opening the DetailsCard modal
  const [selectedStation, setSelectedStation] = useState<ServiceStationResponse | null>(null);

  // Navigate handlers
  const handleView = (id: string) => {
    router.push(`/Indunil/Transport/Supplies/vehicle_service/view?id=${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/Indunil/Transport/Supplies/vehicle_service/edit?id=${id}`);
  };

  return (
    <>
      {/* === DETAILS CARD MODAL === */}
      {selectedStation && (
        <DetailsCard
          title="Service Station Details"
          data={selectedStation}
          onClose={() => setSelectedStation(null)}
        />
      )}

      <div className="overflow-x-auto bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100">
        <table className="min-w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-[#FFE0B2] to-[#FFF3E0] text-[#E65100] uppercase text-sm font-semibold tracking-wide">
              <th className="py-3 px-5 text-left border-b border-orange-100">Name</th>
              <th className="py-3 px-5 text-left border-b border-orange-100">Email</th>
              <th className="py-3 px-5 text-left border-b border-orange-100">Phone</th>
              <th className="py-3 px-5 text-left border-b border-orange-100">Address</th>
              <th className="py-3 px-5 text-center border-b border-orange-100 w-40">Actions</th>
            </tr>
          </thead>

          <tbody>
            {stations.map((station, index) => (
              <tr
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`cursor-pointer transition-all ${
                  index % 2 === 0 ? "bg-[#FFF8F0]" : "bg-white"
                } hover:bg-orange-50 border-b border-orange-100`}
              >
                <td className="py-3 px-5 font-medium text-gray-800">{station.name}</td>
                <td className="py-3 px-5 text-gray-700">{station.email || "—"}</td>
                <td className="py-3 px-5 text-gray-700">
                  {Array.isArray(station.phoneNumbers)
                    ? station.phoneNumbers.join(", ")
                    : station.phoneNumbers || "—"}
                </td>
                <td className="py-3 px-5 text-gray-700">{station.address || "—"}</td>

                <td
                  className="py-3 px-5 flex justify-center items-center gap-3"
                  onClick={(e) => e.stopPropagation()} // prevent opening modal on action buttons
                >
                  {/* View */}
                  <button
                    onClick={() => handleView(station.id)}
                    className="p-2.5 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 hover:from-amber-100 hover:to-amber-200 transition-all shadow-sm hover:shadow-md"
                    title="View"
                  >
                    <Eye size={18} />
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(station.id)}
                    className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm hover:shadow-md"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(station.id)}
                    className="p-2.5 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 transition-all shadow-sm hover:shadow-md"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {stations.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6 italic">
                  No stations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
