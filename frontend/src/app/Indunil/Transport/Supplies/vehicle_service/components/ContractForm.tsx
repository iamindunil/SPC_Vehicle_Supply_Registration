"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  createContract,
  fetchContractById,
  updateContract,
} from "../../serviceinvoice/api/serviceStationApi";
import { ServiceStationContractDto } from "../types/serviceStation";

interface Props {
  stationId?: number | string;
}

export default function ContractForm({ stationId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contractId = searchParams.get("id");

  const [form, setForm] = useState<ServiceStationContractDto>({
    id: undefined,
    serviceCategory: "",
    contractedRate: 0,
    currency: "",
    effectiveFrom: "",
    effectiveTo: "",
    active: true,
    maxWorkload: 0,
    priorityScore: 0,
  });

  const [loading, setLoading] = useState(false);

  // Load data when editing
  useEffect(() => {
    if (!contractId) return;

    setLoading(true);
    fetchContractById(contractId)
      .then((data) => data && setForm(data))
      .catch(() => alert("Failed to load contract data."))
      .finally(() => setLoading(false));
  }, [contractId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.currentTarget;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.currentTarget as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (contractId) {
        await updateContract(contractId, form);
        alert("✅ Contract updated successfully");
      } else if (stationId) {
        await createContract(stationId, form);
        alert("✅ Contract created successfully");
      }

      router.push(`/Indunil/vehicle_service/view?id=${stationId}`);
    } catch (err) {
      console.error("Save contract failed:", err);
      alert("❌ Failed to save contract.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading...
      </p>
    );

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Service station contract form"
      className="space-y-4 p-6 bg-white text-gray-800 rounded-xl border-2 border-transparent bg-clip-padding shadow-md transition-all duration-300 hover:shadow-lg [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#F57C00,#000000)_border-box]"
    >
      <h2 className="text-2xl font-semibold text-[#F57C00] text-center mb-4">
        {contractId ? "Edit Contract" : "New Contract"}
      </h2>

      {/* Service Category */}
      <div>
        <label
          htmlFor="serviceCategory"
          className="block text-gray-900 text-sm font-medium mb-1"
        >
          Service Category
        </label>
        <input
          id="serviceCategory"
          name="serviceCategory"
          value={form.serviceCategory || ""}
          onChange={handleChange}
          placeholder="e.g. Engine Repair"
          required
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Contracted Rate */}
      <div>
        <label
          htmlFor="contractedRate"
          className="block text-gray-900 text-sm font-medium mb-1"
        >
          Contracted Rate
        </label>
        <input
          id="contractedRate"
          name="contractedRate"
          type="number"
          value={form.contractedRate ?? 0}
          onChange={handleChange}
          placeholder="Enter rate"
          required
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Currency */}
      <div>
        <label
          htmlFor="currency"
          className="block text-gray-900 text-sm font-medium mb-1"
        >
          Currency
        </label>
        <input
          id="currency"
          name="currency"
          value={form.currency || ""}
          onChange={handleChange}
          placeholder="e.g. LKR"
          required
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="effectiveFrom"
            className="block text-gray-900 text-sm font-medium mb-1"
          >
            Effective From
          </label>
          <input
            id="effectiveFrom"
            name="effectiveFrom"
            type="date"
            value={form.effectiveFrom || ""}
            onChange={handleChange}
            required
            className="w-full border border-orange-200 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label
            htmlFor="effectiveTo"
            className="block text-gray-900 text-sm font-medium mb-1"
          >
            Effective To
          </label>
          <input
            id="effectiveTo"
            name="effectiveTo"
            type="date"
            value={form.effectiveTo || ""}
            onChange={handleChange}
            className="w-full border border-orange-200 p-3 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Active Checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <input
          id="active"
          name="active"
          type="checkbox"
          checked={form.active ?? true}
          onChange={handleChange}
          className="h-4 w-4 text-orange-600 border-gray-400 rounded focus:ring-orange-500"
        />
        <label htmlFor="active" className="text-gray-900 font-medium">
          Active
        </label>
      </div>

      {/* Workload + Priority */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="maxWorkload"
            className="block text-gray-900 text-sm font-medium mb-1"
          >
            Max Workload
          </label>
          <input
            id="maxWorkload"
            name="maxWorkload"
            type="number"
            value={form.maxWorkload ?? 0}
            onChange={handleChange}
            placeholder="Enter max workload"
            required
            className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label
            htmlFor="priorityScore"
            className="block text-gray-900 text-sm font-medium mb-1"
          >
            Priority Score
          </label>
          <input
            id="priorityScore"
            name="priorityScore"
            type="number"
            value={form.priorityScore ?? 0}
            onChange={handleChange}
            placeholder="Enter priority score"
            required
            className="w-full border border-orange-200 p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          aria-label="Save contract"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Contract"}
        </button>
      </div>
    </form>
  );
}
