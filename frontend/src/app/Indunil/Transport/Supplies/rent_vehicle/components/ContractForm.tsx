"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createRentContract,
  fetchContractById,
  updateContract,
} from "../api/rentVehicleApi";
import { RentContractDto } from "../types/rentVehicle";

interface Props {
  companyId?: string | number;
}

export default function ContractForm({ companyId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qContractId = searchParams.get("id");
  const contractId = qContractId ?? undefined;

  const [form, setForm] = useState<RentContractDto>({
    id: undefined,
    vehicleType: "",
    rentalRate: 0,
    currency: "",
    effectiveFrom: "",
    effectiveTo: "",
    active: true,
    maxVehicles: 0,
    priorityScore: 0,
  });

  const [loading, setLoading] = useState(false);

  // Load existing contract
  useEffect(() => {
    if (!contractId) return;
    setLoading(true);

    fetchContractById(contractId)
      .then((data) => {
        if (data) {
          setForm({
            ...data,
            effectiveFrom: data.effectiveFrom ? String(data.effectiveFrom) : "",
            effectiveTo: data.effectiveTo ? String(data.effectiveTo) : "",
            rentalRate: data.rentalRate ?? 0,
            maxVehicles: data.maxVehicles ?? 0,
            priorityScore: data.priorityScore ?? 0,
            active: data.active ?? true,
          });
        }
      })
      .catch((err) => {
        console.error("Failed to load contract:", err);
        alert("Failed to load contract data.");
      })
      .finally(() => setLoading(false));
  }, [contractId]);

  // Universal change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, type } = target;
    let newValue: any = target.value;

    if (type === "checkbox") {
      newValue = (target as HTMLInputElement).checked;
    } else if (type === "number") {
      newValue = target.value === "" ? 0 : Number(target.value);
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contractId) {
        await updateContract(contractId, form);
        alert("Contract updated successfully");
      } else if (companyId) {
        await createRentContract(companyId, form);
        alert("Contract created successfully");
      } else {
        throw new Error("Missing companyId for contract creation");
      }

      const cid = companyId ?? searchParams.get("companyId") ?? "";
      router.push(`/Indunil/Transport/Supplies/rent_vehicle/contracts?companyId=${cid}`);
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save contract");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">Loading...</p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white text-gray-800 rounded-xl border-2 border-transparent bg-clip-padding shadow-md transition-all duration-300 hover:shadow-lg [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#F57C00,#000000)_border-box]"
    >
      <h2 className="text-2xl font-semibold text-[#F57C00] text-center mb-4">
        {contractId ? "Edit Rent Contract" : "New Rent Contract"}
      </h2>

      {/* Vehicle Type */}
      <div>
        <label htmlFor="vehicleType" className="block text-gray-900 text-sm font-medium mb-1">
          Vehicle Type
        </label>
        <input
          id="vehicleType"
          name="vehicleType"
          value={form.vehicleType}
          onChange={handleChange}
          placeholder="e.g. Cab / Van / Mini-Bus"
          required
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Rental Rate */}
      <div>
        <label htmlFor="rentalRate" className="block text-gray-900 text-sm font-medium mb-1">
          Rental Rate
        </label>
        <input
          id="rentalRate"
          name="rentalRate"
          type="number"
          step="0.01"
          value={form.rentalRate}
          onChange={handleChange}
          placeholder="Enter rate"
          required
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Currency */}
      <div>
        <label htmlFor="currency" className="block text-gray-900 text-sm font-medium mb-1">
          Currency
        </label>
        <input
          id="currency"
          name="currency"
          value={form.currency}
          onChange={handleChange}
          placeholder="e.g. LKR"
          required
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Effective Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="effectiveFrom" className="block text-gray-900 text-sm font-medium mb-1">
            Effective From
          </label>
          <input
            id="effectiveFrom"
            name="effectiveFrom"
            type="date"
            value={form.effectiveFrom}
            onChange={handleChange}
            required
            className="w-full border border-orange-200 p-3 rounded-md text-gray-700 focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <div>
          <label htmlFor="effectiveTo" className="block text-gray-900 text-sm font-medium mb-1">
            Effective To
          </label>
          <input
            id="effectiveTo"
            name="effectiveTo"
            type="date"
            value={form.effectiveTo}
            onChange={handleChange}
            required
            className="w-full border border-orange-200 p-3 rounded-md text-gray-700 focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      {/* Active Checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <input
          id="active"
          name="active"
          type="checkbox"
          checked={!!form.active}
          onChange={handleChange}
          className="w-4 h-4 text-orange-600 border-gray-400 focus:ring-orange-500"
        />
        <label htmlFor="active" className="text-gray-900 font-medium">
          Active
        </label>
      </div>

      {/* Max Vehicles & Priority Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="maxVehicles" className="block text-gray-900 text-sm font-medium mb-1">
            Max Vehicles
          </label>
          <input
            id="maxVehicles"
            name="maxVehicles"
            type="number"
            value={form.maxVehicles}
            onChange={handleChange}
            required
            className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:ring-2 focus:ring-orange-300"
          />
        </div>

        <div>
          <label htmlFor="priorityScore" className="block text-gray-900 text-sm font-medium mb-1">
            Priority Score
          </label>
          <input
            id="priorityScore"
            name="priorityScore"
            type="number"
            value={form.priorityScore}
            onChange={handleChange}
            required
            className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:ring-2 focus:ring-orange-300"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Contract"}
        </button>
      </div>
    </form>
  );
}
