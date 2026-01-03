"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchContractsByCompany, fetchAllContracts, deleteContract } from "../api/rentVehicleApi";
import { Plus, Pencil, Trash2 } from "lucide-react";
import TableSearchBar from "../components/TableSearchBar";
import DetailsCard from "../components/DetailsCard";

export default function RentContractsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");

  const [contracts, setContracts] = useState<any[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState<any | null>(null);

  useEffect(() => {
    if (companyId) loadContractsByCompany(companyId);
    else loadAllContracts();
  }, [companyId]);

  async function loadContractsByCompany(id: string) {
    try {
      setLoading(true);
      const data = await fetchContractsByCompany(id);
      setContracts(data);
      setFilteredContracts(data);
      setError(null);
    } catch (err) {
      console.error("Error loading contracts by company:", err);
      setError("Failed to load contracts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function loadAllContracts() {
    try {
      setLoading(true);
      const data = await fetchAllContracts();
      setContracts(data);
      setFilteredContracts(data);
      setError(null);
    } catch (err) {
      console.error("Error loading all contracts:", err);
      setError("Failed to load all contracts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(value: string) {
    const term = value.toLowerCase();
    setSearchTerm(value);
    setFilteredContracts(
      contracts.filter((c: any) =>
        (c.vehicleType || "").toLowerCase().includes(term) ||
        (c.currency || "").toLowerCase().includes(term) ||
        (c.companyName || "").toLowerCase().includes(term)
      )
    );
  }

  function handleAddContract() {
    if (!companyId) return alert("Please select a company to add contracts.");
    router.push(`/Indunil/Transport/Supplies/rent_vehicle/contracts/create?companyId=${companyId}`);
  }

  function handleEdit(contract: any) {
    if (!contract?.id) return;
    const cid = companyId ?? contract.companyId ?? undefined;
    const url = cid
      ? `/Indunil/Transport/Supplies/rent_vehicle/contracts/edit?id=${contract.id}&companyId=${cid}`
      : `/Indunil/Transport/Supplies/rent_vehicle/contracts/edit?id=${contract.id}`;
    router.push(url);
  }

  async function handleDelete(contract: any) {
    if (!contract?.id) return;
    // ensure we have a company id to call delete endpoint
    const cid = companyId ?? contract.companyId ?? null;
    if (!cid) {
      return alert("Can't delete contract without company context.");
    }
    if (!confirm("Are you sure you want to delete this contract?")) return;
    try {
      await deleteContract(cid, contract.id);
      setContracts((prev) => prev.filter((c) => c.id !== contract.id));
      setFilteredContracts((prev) => prev.filter((c) => c.id !== contract.id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete contract.");
    }
  }

  // helper to render contract code (CT-001)
  function contractCode(c: any) {
    return c.id ? `CT-${String(c.id).padStart(3, "0")}` : "-";
  }

  return (
    <div className="p-8 bg-[#FFF8F0] min-h-screen rounded-tl-2xl relative">
      <div className="flex justify-between items-center mb-8 border-b pb-3 border-orange-200">
        <h1 className="text-3xl font-semibold text-[#F57C00]">Rent Vehicle Contracts</h1>
        {companyId && (
          <button
            onClick={handleAddContract}
            className="flex items-center bg-[#F57C00] text-white px-4 py-2 rounded-lg hover:bg-[#E65100] transition-all"
          >
            <Plus className="mr-2" size={18} />
            Add New Contract
          </button>
        )}
      </div>

      <TableSearchBar
        placeholder="Search by vehicle type, currency, or company..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {loading ? (
        <div className="flex justify-center items-center mt-16">
          <div className="animate-spin h-8 w-8 border-4 border-[#F57C00] border-t-transparent rounded-full" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : filteredContracts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No contracts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-orange-200 rounded-xl shadow-md">
            <thead>
              <tr className="bg-[#FFE0B2] text-[#E65100] uppercase text-sm font-semibold">
                <th className="py-3 px-4 text-left border-b border-orange-200">Contract Code</th>
                <th className="py-3 px-4 text-left border-b border-orange-200">Vehicle Type</th>
                <th className="py-3 px-4 text-left border-b border-orange-200">Rate</th>
                <th className="py-3 px-4 text-left border-b border-orange-200">Period</th>
                <th className="py-3 px-4 text-left border-b border-orange-200">Active</th>
                <th className="py-3 px-4 text-left border-b border-orange-200">Max Vehicles</th>
                <th className="py-3 px-4 text-left border-b border-orange-200">Company</th>
                <th className="py-3 px-4 text-center border-b border-orange-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract: any) => (
                <tr
                  key={`${contract.id}-${contract.companyId ?? "all"}`}
                  onClick={() => setSelectedContract(contract)}
                  className="hover:bg-orange-50 cursor-pointer transition-colors border-b border-orange-100"
                >
                  <td className="py-3 px-4 text-gray-700">{contractCode(contract)}</td>
                  <td className="py-3 px-4 text-gray-700">{contract.vehicleType}</td>
                  <td className="py-3 px-4 text-gray-700">{contract.rentalRate} {contract.currency}</td>
                  <td className="py-3 px-4 text-gray-700">{contract.effectiveFrom} → {contract.effectiveTo}</td>
                  <td className="py-3 px-4 text-gray-700">{contract.active ? "Yes" : "No"}</td>
                  <td className="py-3 px-4 text-gray-700">{contract.maxVehicles ?? "-"}</td>
                  <td className="py-3 px-4 text-gray-700">{contract.companyName ?? "-"}</td>
                  <td className="py-3 px-4 text-center flex justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => handleEdit(contract)} className="text-[#F57C00] hover:text-[#E65100]" title="Edit Contract">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(contract)} className="text-red-500 hover:text-red-700" title="Delete Contract">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* details modal */}
      {selectedContract && (
        <DetailsCard
          title="Contract Details"
          data={{
            "Contract ID": contractCode(selectedContract),
            "Vehicle Type": selectedContract.vehicleType,
            "Rental Rate": `${selectedContract.rentalRate} ${selectedContract.currency}`,
            "Effective From": selectedContract.effectiveFrom,
            "Effective To": selectedContract.effectiveTo,
            "Max Vehicles": selectedContract.maxVehicles ?? "-",
            "Priority Score": selectedContract.priorityScore ?? "-",
            Active: selectedContract.active ? "Yes" : "No",
            Company: selectedContract.companyName ?? "-",
          }}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </div>
  );
}
