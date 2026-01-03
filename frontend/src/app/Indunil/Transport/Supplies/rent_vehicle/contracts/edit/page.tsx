"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchContractById, updateContract } from "../../api/rentVehicleApi";
import { RentContractDto } from "../../types/rentVehicle";

export default function EditRentContractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const urlCompanyId = searchParams.get("companyId");

  const [contract, setContract] = useState<RentContractDto | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(urlCompanyId);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch contract by ID and infer companyId if missing
  useEffect(() => {
    if (id) {
      fetchContractById(id)
        .then((data) => {
          setContract(data);
          if (!urlCompanyId && data.companyId) {
            setCompanyId(String(data.companyId));
          }
        })
        .catch((err) => console.error("Failed to load contract:", err))
        .finally(() => setLoading(false));
    }
  }, [id, urlCompanyId]);

  // ✅ Handle form field changes
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!contract) return;

    const { name, type, value, checked } = e.target as HTMLInputElement;

    setContract({
      ...contract,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    });
  }

  // ✅ Submit updated contract
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id || !contract) return;

    try {
      setSaving(true);
      await updateContract(id, contract);
      alert("✅ Contract updated successfully!");

      // 🧭 Navigate safely back
      if (companyId && companyId !== "null") {
        router.push(
          `/Indunil/Transport/Supplies/rent_vehicle/contracts?companyId=${companyId}`
        );
      } else {
        router.push(`/Indunil/Transport/Supplies/rent_vehicle/contracts`);
      }
    } catch (err) {
      console.error("Error updating contract:", err);
      alert("❌ Failed to update contract");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !contract) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Loading contract details...
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8F0] p-8 items-center justify-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8 border border-orange-200 transition-all hover:shadow-xl hover:border-orange-300 duration-300">
        <h1 className="text-3xl font-bold text-[#F57C00] mb-6 text-center tracking-tight">
          Edit Rent Contract
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle Type */}
          <div>
            <label htmlFor="text"className="block text-sm font-semibold text-gray-700 mb-2">
              Vehicle Type
            </label>
            <input
              id="text"
              type="text"
              name="vehicleType"
              value={contract.vehicleType || ""}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 rounded-lg p-2 bg-[#FFF8F0] text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          {/* Rental Rate */}
          <div>
            <label htmlFor="number" className="block text-sm font-semibold text-gray-700 mb-2">
              Rental Rate
            </label>
            <input
              id="number"
              type="number"
              name="rentalRate"
              value={contract.rentalRate ?? ""}
              onChange={handleChange}
              step="0.01"
              required
              className="w-full border border-orange-300 rounded-lg p-2 bg-[#FFF8F0] text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
          </div>

          {/* Currency */}
          <div>
            <label htmlFor="currency"className="block text-sm font-semibold text-gray-700 mb-2">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={contract.currency || "LKR"}
              onChange={handleChange}
              className="w-full border border-orange-300 rounded-lg p-2 bg-[#FFF8F0] text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="LKR">LKR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Effective Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date"className="block text-sm font-semibold text-gray-700 mb-2">
                Effective From
              </label>
              <input
                id="date"
                type="date"
                name="effectiveFrom"
                value={contract.effectiveFrom || ""}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 rounded-lg p-2 bg-[#FFF8F0] text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Effective To
              </label>
              <input
                id="date"
                type="date"
                name="effectiveTo"
                value={contract.effectiveTo || ""}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 rounded-lg p-2 bg-[#FFF8F0] text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Max Vehicles & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="number"className="block text-sm font-semibold text-gray-700 mb-2">
                Max Vehicles
              </label>
              <input
                id="number"
                type="number"
                name="maxVehicles"
                value={contract.maxVehicles ?? ""}
                onChange={handleChange}
                min={1}
                className="w-full border border-orange-300 rounded-lg p-2 bg-[#FFF8F0] text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-semibold text-gray-700 mb-2">
                Priority Score
              </label>
              <input
                id="number"
                type="number"
                name="priorityScore"
                value={contract.priorityScore ?? ""}
                onChange={handleChange}
                min={0}
                className="w-full border border-orange-300 rounded-lg p-2 bg-[#FFF8F0] text-gray-800 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Active Checkbox */}
          <div className="flex items-center gap-2">
            <input
                  id="active"
                  type="checkbox"
                  name="active"
                  checked={!!contract.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                />
            <label htmlFor="active" className="text-sm font-semibold text-gray-700">
              Active
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#F57C00] text-white px-6 py-2 rounded-lg hover:bg-[#E65100] transition-all disabled:opacity-60"
            >
              {saving ? "Saving..." : "Update Contract"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.push(
                  companyId && companyId !== "null"
                    ? `/Indunil/Transport/Supplies/rent_vehicle/contracts?companyId=${companyId}`
                    : `/Indunil/Transport/Supplies/rent_vehicle/contracts`
                )
              }
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
