"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, FileText, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import TableSearchBar from "./components/TableSearchBar";
import DetailsCard from "./components/DetailsCard";
import { CabCompanyResponse } from "./types/rentVehicle";
import { fetchCabCompanies, deleteCabCompany } from "./api/rentVehicleApi";

export default function RentVehicleDashboard() {
  const [companies, setCompanies] = useState<CabCompanyResponse[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<CabCompanyResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<CabCompanyResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      setLoading(true);
      const data = await fetchCabCompanies();
      setCompanies(data);
      setFilteredCompanies(data);
    } catch (err) {
      console.error("Error loading cab companies:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(value: string) {
    setSearchTerm(value);
    const term = value.trim().toLowerCase();
    if (!term) {
      setFilteredCompanies(companies);
      return;
    }
    setFilteredCompanies(
      companies.filter((company) =>
        (company.name || "").toLowerCase().includes(term) ||
        (company.registrationNo || "").toLowerCase().includes(term)
      )
    );
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this cab company?")) return;
    try {
      await deleteCabCompany(id);
      await loadCompanies();
    } catch (err) {
      console.error("Error deleting company:", err);
      alert("Failed to delete company.");
    }
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-[#E65100]">Cab Companies</h1>
          <p className="text-gray-600 mt-1">Manage all registered cab companies and their contracts efficiently.</p>
        </div>

        <button
          onClick={() => router.push("/Indunil/Transport/Supplies/rent_vehicle/create")}
          className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] to-orange-500 text-white px-6 py-3 rounded-xl hover:from-[#E65100] hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-semibold"
        >
          <Plus size={20} />
          Add New Company
        </button>
      </div>

      {/* Quick stats (kept) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-blue-700">{companies.length}</div>
          <div className="text-sm text-blue-800 mt-1">Total Companies</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-green-700">{companies.filter((c) => c.active).length}</div>
          <div className="text-sm text-green-800 mt-1">Active Companies</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-orange-700">{companies.reduce((acc, c) => acc + (c.contracts?.length || 0), 0)}</div>
          <div className="text-sm text-orange-800 mt-1">Total Contracts</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-purple-700">{companies.filter((c) => c.licenseStatus === "Active").length}</div>
          <div className="text-sm text-purple-800 mt-1">Licensed</div>
        </div>
      </div>

      {/* Search & actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/70 backdrop-blur-sm border border-orange-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1">
            <TableSearchBar placeholder="Search companies..." value={searchTerm} onChange={handleSearch} />
          </div>

          <button className="flex items-center gap-2 px-5 py-2 border border-orange-200 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors font-medium">
            <FileText size={18} />
            Export
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-[#E65100]">{filteredCompanies.length}</span> of {companies.length} companies
        </p>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F57C00]"></div>
        </div>
      ) : filteredCompanies.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No cab companies found.</p>
      ) : (
        <div className="overflow-x-auto bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-4">
          <table className="min-w-full border-collapse rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-[#FFE0B2] to-[#FFF3E0] text-[#E65100] uppercase text-sm font-semibold">
                <th className="py-3 px-5 text-left border-b border-orange-100">Name</th>
                <th className="py-3 px-5 text-left border-b border-orange-100">Address</th>
                <th className="py-3 px-5 text-left border-b border-orange-100">Contact</th>
                <th className="py-3 px-5 text-left border-b border-orange-100">Email</th>
                <th className="py-3 px-5 text-center border-b border-orange-100 w-44">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company, index) => (
                <tr
                  key={company.id}
                  className={`transition-all ${index % 2 === 0 ? "bg-[#FFF8F0]" : "bg-white"} hover:bg-orange-50 border-b border-orange-100 cursor-pointer`}
                  onClick={() => setSelectedCompany(company)} // row click opens details
                >
                  <td className="py-3 px-5 text-gray-800 font-medium">{company.name}</td>
                  <td className="py-3 px-5 text-gray-700">{company.address || "—"}</td>
                  <td className="py-3 px-5 text-gray-700">{Array.isArray(company.phoneNumbers) ? company.phoneNumbers.join(", ") : company.phoneNumbers || "—"}</td>
                  <td className="py-3 px-5 text-gray-700">{company.email || "—"}</td>
                  <td
                    className="py-3 px-5 flex justify-center items-center gap-3"
                    onClick={(e) => e.stopPropagation()} // keep actions clickable without opening row
                  >
                    {/* Contracts button -> navigate to contracts for this company */}
                    <button
                      onClick={() => router.push(`/Indunil/Transport/Supplies/rent_vehicle/contracts?companyId=${company.id}`)}
                      className="p-2.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all shadow-sm"
                      title="View Contracts"
                    >
                      <FileText size={18} />
                    </button>

                    <button
                      onClick={() => router.push(`/Indunil/Transport/Supplies/rent_vehicle/edit?id=${company.id}`)}
                      className="p-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all shadow-sm"
                      title="Edit Company"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(String(company.id))}
                      className="p-2.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all shadow-sm"
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
      )}

      {/* Details Card for company */}
      {selectedCompany && (
        <DetailsCard
          title="Company Details"
          data={{
            "Company ID": `CC-${String(selectedCompany.id ?? 0).padStart(3, "0")}`,
            Name: selectedCompany.name,
            "Registration No": selectedCompany.registrationNo,
            Address: selectedCompany.address ?? "-",
            "Contact Person": selectedCompany.contactPerson ?? "-",
            Phones: selectedCompany.phoneNumbers?.join(", ") ?? "-",
            Email: selectedCompany.email ?? "-",
            "License Status": selectedCompany.licenseStatus ?? "-",
            Active: selectedCompany.active ? "Yes" : "No",
            Remarks: selectedCompany.remarks ?? "-",
          }}
          onClose={() => setSelectedCompany(null)}
        />
      )}
    </div>
  );
}
