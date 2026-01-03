"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createRentContract } from "../../api/rentVehicleApi";
import { RentContractDto } from "../../types/rentVehicle";

export default function CreateRentContractPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");

  const [form, setForm] = useState<RentContractDto>({
    vehicleType: "",
    rentalRate: 0,
    currency: "LKR",
    effectiveFrom: "",
    effectiveTo: "",
    active: true,
    maxVehicles: 1,
    priorityScore: 0,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const target = e.target;
    const { name, value, type } = target;

    let newValue: string | number | boolean = value;

    if (type === "checkbox") {
      newValue = (target as HTMLInputElement).checked;
    } else if (["rentalRate", "maxVehicles", "priorityScore"].includes(name)) {
      newValue = Number(value);
    }

    setForm((prev) => ({ ...prev, [name]: newValue }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!companyId) {
      alert("Missing company ID. Please go back and select a company.");
      return;
    }

    try {
      setLoading(true);
      await createRentContract(companyId, form);
      alert("✅ Contract successfully created!");
      router.push(
        `/Indunil/Transport/Supplies/rent_vehicle/contracts?companyId=${companyId}`
      );
    } catch (err) {
      console.error("Error creating contract:", err);
      alert("❌ Failed to create contract.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-start justify-center p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl border border-orange-300 p-8 hover:shadow-xl transition-all">
        <h1 className="text-3xl font-semibold text-[#F57C00] mb-6 text-center">
          Create Rent Vehicle Contract
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Vehicle Type */}
          <div>
            <label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-800 mb-1">
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              required
              className="w-full border border-orange-300 bg-orange-50 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] outline-none"
            >
              <option value="">-- Select Vehicle Type --</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Bus">Bus</option>
              <option value="Lorry">Lorry</option>
              <option value="Three Wheeler">Three Wheeler</option>
              <option value="Truck">Truck</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Rental Rate */}
          <div>
            <label htmlFor="rentalRate" className="block text-sm font-semibold text-gray-800 mb-1">
              Rental Rate
            </label>
            <input
              id="rentalRate"
              type="number"
              name="rentalRate"
              value={form.rentalRate}
              onChange={handleChange}
              min={0}
              required
              className="w-full border border-orange-300 bg-orange-50 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] outline-none"
            />
          </div>

          {/* Currency */}
          <div>
            <label  htmlFor="currency" className="block text-sm font-semibold text-gray-800 mb-1">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full border border-orange-300 bg-orange-50 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] outline-none"
            >
              <option value="LKR">LKR (Sri Lankan Rupee)</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Effective Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="effectiveFrom" className="block text-sm font-semibold text-gray-800 mb-1">
                Effective From
              </label>
              <input
                id="effectiveFrom"
                type="date"
                name="effectiveFrom"
                value={form.effectiveFrom}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 bg-orange-50 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] outline-none"
              />
            </div>

            <div>
              <label htmlFor="effectiveTo" className="block text-sm font-semibold text-gray-800 mb-1">
                Effective To
              </label>
              <input
                id="effectiveTo"
                type="date"
                name="effectiveTo"
                value={form.effectiveTo}
                onChange={handleChange}
                required
                className="w-full border border-orange-300 bg-orange-50 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] outline-none"
              />
            </div>
          </div>

          {/* Active Checkbox (FIXED) */}
          <div className="flex items-center gap-2 mt-2">
            <input
              id="active"
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="h-4 w-4 text-[#F57C00] focus:ring-[#F57C00] border-gray-300 rounded"
            />
            <label
              htmlFor="active"
              className="text-sm font-semibold text-gray-800"
            >
              Active
            </label>
          </div>

          {/* Max Vehicles */}
          <div>
            <label htmlFor="maxVehicles" className="block text-sm font-semibold text-gray-800 mb-1">
              Max Vehicles
            </label>
            <input
              id="maxVehicles"
              type="number"
              name="maxVehicles"
              value={form.maxVehicles}
              onChange={handleChange}
              min={1}
              required
              className="w-full border border-orange-300 bg-orange-50 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] outline-none"
            />
          </div>

          {/* Priority Score */}
          <div>
            <label htmlFor="priorityScore" className="block text-sm font-semibold text-gray-800 mb-1">
              Priority Score
            </label>
            <input
              id="priorityScore"
              type="number"
              name="priorityScore"
              value={form.priorityScore}
              onChange={handleChange}
              min={0}
              max={100}
              className="w-full border border-orange-300 bg-orange-50 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#F57C00] outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F57C00] text-white py-2 rounded-lg font-semibold hover:bg-[#E65100] transition-all disabled:opacity-60"
          >
            {loading ? "Saving..." : "Create Contract"}
          </button>
        </form>
      </div>
    </div>
  );
}
