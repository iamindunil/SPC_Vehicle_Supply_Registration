"use client";

import { useRouter } from "next/navigation";
import { Pencil, Trash2, FileText } from "lucide-react";
import { useState } from "react";
import { CabCompanyResponse } from "../types/rentVehicle";
import DetailsCard from "../components/DetailsCard";

interface Props {
  companies: CabCompanyResponse[];
  onDelete: (id: string) => void;
}

export default function RentCompanyTable({ companies, onDelete }: Props) {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState<CabCompanyResponse | null>(null);

  if (!companies || companies.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">
        No cab companies found. Add one to get started.
      </p>
    );
  }

  return (
    <>
      {/* === DETAILS CARD MODAL === */}
      {selectedCompany && (
        <DetailsCard
          title="Company Details"
          data={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />
      )}

      <div className="overflow-x-auto bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100">
        <table className="min-w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-[#FFE0B2] to-[#FFF3E0] text-[#E65100] uppercase text-sm font-semibold tracking-wide">
              <th className="py-3 px-5 text-left border-b border-orange-100">Name</th>
              <th className="py-3 px-5 text-left border-b border-orange-100">Address</th>
              <th className="py-3 px-5 text-left border-b border-orange-100">Contact</th>
              <th className="py-3 px-5 text-left border-b border-orange-100">Email</th>
              <th className="py-3 px-5 text-center border-b border-orange-100 w-44">Actions</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company, index) => (
              <tr
                key={company.id}
                onClick={() => setSelectedCompany(company)} // ← OPEN DETAILS CARD
                className={`cursor-pointer transition-all ${
                  index % 2 === 0 ? "bg-[#FFF8F0]" : "bg-white"
                } hover:bg-orange-50 border-b border-orange-100`}
              >
                <td className="py-3 px-5 text-gray-800 font-medium">{company.name}</td>
                <td className="py-3 px-5 text-gray-700">{company.address || "—"}</td>
                <td className="py-3 px-5 text-gray-700">
                  {Array.isArray(company.phoneNumbers)
                    ? company.phoneNumbers.join(", ")
                    : company.phoneNumbers || "—"}
                </td>
                <td className="py-3 px-5 text-gray-700">{company.email || "—"}</td>

                <td className="py-3 px-5 flex justify-center items-center gap-3"
                    onClick={(e) => e.stopPropagation()} // ← STOP ROW CLICK
                >
                  {/* Edit */}
                  <button
                    onClick={() =>
                      router.push(
                        `/Indunil/Transport/Supplies/rent_vehicle/edit?id=${company.id}`
                      )
                    }
                    className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 transition-all shadow-sm hover:shadow-md"
                    title="Edit Company"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* View Contracts */}
                  <button
                    onClick={() =>
                      router.push(
                        `/Indunil/Transport/Supplies/rent_vehicle/contracts?companyId=${company.id}`
                      )
                    }
                    className="p-2.5 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 hover:from-amber-100 hover:to-amber-200 transition-all shadow-sm hover:shadow-md"
                    title="View Contracts"
                  >
                    <FileText size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(String(company.id))}
                    className="p-2.5 rounded-lg bg-gradient-to-br from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 transition-all shadow-sm hover:shadow-md"
                    title="Delete Company"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
