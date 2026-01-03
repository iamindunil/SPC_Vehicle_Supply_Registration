"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ServiceStationCreateRequest,
  ServiceStationResponse,
} from "../types/serviceStation";

interface Props {
  initialData?: ServiceStationResponse;
  onSubmit: (data: ServiceStationCreateRequest) => Promise<void>;
}

export default function StationForm({ initialData, onSubmit }: Props) {
  const [form, setForm] = useState<ServiceStationCreateRequest>({
    name: initialData?.name || "",
    registrationNo: initialData?.registrationNo || "",
    email: initialData?.email || "",
    phoneNumbers: initialData?.phoneNumbers || [""],
    address: initialData?.address || "",
    remarks: initialData?.remarks || "",
  });

 const [stationId, setStationId] = useState<number | null>(
  initialData?.id ? Number(initialData.id) : null
);

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, phoneNumbers: [e.target.value] });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result: any = await onSubmit(form);
    if (result?.id) {
      setStationId(result.id); // ✅ store the created station ID
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white text-gray-800 rounded-xl border-2 border-transparent bg-clip-padding shadow-md transition-all duration-300 hover:shadow-lg [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#F57C00,#000000)_border-box]"
    >
      {/* === Name === */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Name
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Enter service station name"
          required
        />
      </div>

      {/* === Email === */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Email
        </label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="example@email.com"
          type="email"
          required
        />
      </div>

      {/* === Phone === */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Phone Number
        </label>
        <input
          name="phoneNumbers"
          value={form.phoneNumbers?.[0] || ""}
          onChange={handlePhoneChange}
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Enter contact number"
        />
      </div>

      {/* === Address === */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Address
        </label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Enter address"
        />
      </div>

      {/* === Registration Number === */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Registration Number
        </label>
        <input
          name="registrationNo"
          value={form.registrationNo || ""}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Enter Registration Number"
          required
        />
      </div>

      {/* === Remarks === */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Remarks
        </label>
        <input
          name="remarks"
          value={form.remarks || ""}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
          placeholder="Any remarks (optional)"
        />
      </div>

      {/* === Buttons === */}
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all"
        >
          {initialData ? "Update Station" : "Save Station"}
        </button>

        
      </div>
    </form>
  );
}
