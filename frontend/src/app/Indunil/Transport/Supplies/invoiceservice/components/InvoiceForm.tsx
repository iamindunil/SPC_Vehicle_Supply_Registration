"use client";

import { useState } from "react";

/* =====================
   Backend-aligned types
===================== */

export interface InvoiceActivityDto {
  description: string;
  cost: number;
}

export interface InvoiceCreateRequest {
  vehicleNo: string;
  serviceStationId: number;
  serviceDate: string;
  mileage: number;
  currency: string;
  remarks?: string;
  activities: InvoiceActivityDto[];
}

interface InvoiceFormProps {
  onSubmit: (data: InvoiceCreateRequest) => Promise<void>;
  initialData?: InvoiceCreateRequest;
}

export default function InvoiceForm(
  { onSubmit, initialData }: InvoiceFormProps
): JSX.Element {
  const [form, setForm] = useState<InvoiceCreateRequest>(
    initialData ?? {
      vehicleNo: "",
      serviceStationId: 0,
      serviceDate: "",
      mileage: 0,
      currency: "LKR",
      remarks: "",
      activities: [],
    }
  );

  /* =====================
     Handle form input changes
  ===================== */
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }

  /* =====================
     Handle activity changes
  ===================== */
  function handleActivityChange<K extends keyof InvoiceActivityDto>(
    index: number,
    field: K,
    value: InvoiceActivityDto[K]
  ) {
    setForm((prev) => {
      const activities = [...prev.activities];
      activities[index] = {
        ...activities[index],
        [field]: value,
      };
      return { ...prev, activities };
    });
  }

  function addActivity() {
    setForm((prev) => ({
      ...prev,
      activities: [...prev.activities, { description: "", cost: 0 }],
    }));
  }

  function removeActivity(index: number) {
    setForm((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  }

  /* =====================
     Handle submit
  ===================== */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(form);
  }

  /* =====================
     Render
  ===================== */
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded shadow-md max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Create Invoice</h2>

      {/* Vehicle No */}
      <div>
        <label htmlFor="vehicleNo" className="block font-medium mb-1">Vehicle Number</label>
        <input
          id="vehicleNo"
          name="vehicleNo"
          value={form.vehicleNo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Service Station */}
      <div>
        <label htmlFor="serviceStationId" className="block font-medium mb-1">Service Station ID</label>
        <input
          id="serviceStationId"
          name="serviceStationId"
          type="number"
          value={form.serviceStationId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Service Date */}
      <div>
        <label htmlFor="serviceDate" className="block font-medium mb-1">Service Date</label>
        <input
          id="serviceDate"
          name="serviceDate"
          type="date"
          value={form.serviceDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Mileage */}
      <div>
        <label htmlFor="mileage" className="block font-medium mb-1">Mileage</label>
        <input
          id="mileage"
          name="mileage"
          type="number"
          value={form.mileage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      {/* Remarks */}
      <div>
        <label htmlFor="remarks" className="block font-medium mb-1">Remarks</label>
        <textarea
          id="remarks"
          name="remarks"
          value={form.remarks}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Activities */}
      <div>
        <label className="block font-medium mb-2">Activities</label>

        {form.activities.map((activity, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              placeholder="Description"
              value={activity.description}
              onChange={(e) =>
                handleActivityChange(index, "description", e.target.value)
              }
              className="flex-1 border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Cost"
              value={activity.cost}
              onChange={(e) =>
                handleActivityChange(index, "cost", Number(e.target.value))
              }
              className="w-28 border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => removeActivity(index)}
              className="bg-red-500 text-white px-3 rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addActivity}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Activity
        </button>
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-2 rounded"
      >
        Save Invoice
      </button>
    </form>
  );
}

