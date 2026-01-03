"use client";

import { useState } from "react";
import { CabCompanyCreateRequest } from "../types/rentVehicle";

interface Props {
  initialData?: CabCompanyCreateRequest;
  onSubmit: (data: CabCompanyCreateRequest) => Promise<any>;
}

export default function RentCompanyForm({ initialData, onSubmit }: Props) {
  const [formData, setFormData] = useState<CabCompanyCreateRequest>({
    name: initialData?.name ?? "",
    registrationNo: initialData?.registrationNo ?? "",
    address: initialData?.address ?? "",
    contactPerson: initialData?.contactPerson ?? "",
    email: initialData?.email ?? "",
    phoneNumbers: initialData?.phoneNumbers ?? [""],
    remarks: initialData?.remarks ?? "",
    licenseStatus: initialData?.licenseStatus ?? "",
    active: initialData?.active ?? true,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  const { name, value } = target;
  const isCheckbox = (target as HTMLInputElement).type === "checkbox";
  const checked = (target as HTMLInputElement).checked;

  setFormData((prev) => ({
    ...prev,
    [name]: isCheckbox ? checked : value,
  }));
};

  const handlePhoneChange = (index: number, value: string) => {
    const updatedPhones = [...formData.phoneNumbers];
    updatedPhones[index] = value;
    setFormData((prev) => ({ ...prev, phoneNumbers: updatedPhones }));
  };

  const addPhoneField = () => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, ""],
    }));
  };

  const removePhoneField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumbers: prev.phoneNumbers.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      alert("✅ Rent company saved successfully!");
    } catch (err) {
      console.error("Error saving company:", err);
      alert("❌ Failed to save rent company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white text-gray-800 rounded-xl border-2 border-transparent bg-clip-padding shadow-md transition-all duration-300 hover:shadow-lg [background:linear-gradient(white,white)_padding-box,linear-gradient(135deg,#F57C00,#000000)_border-box]"
    >
      <h2 className="text-2xl font-semibold text-[#F57C00] text-center mb-4">
        {initialData ? "Edit Rent Company" : "New Rent Company"}
      </h2>

      {/* Company Name */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Company Name
        </label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
          placeholder="Enter company name"
        />
      </div>

      {/* Registration Number */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Registration Number
        </label>
        <input
          name="registrationNo"
          value={formData.registrationNo}
          onChange={handleChange}
          required
          className="w-full border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
          placeholder="Enter registration number"
        />
      </div>

      {/* Contact Person */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Contact Person
        </label>
        <input
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
          placeholder="Enter contact person"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
          placeholder="Enter email"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          rows={3}
          className="w-full border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
          placeholder="Enter company address"
        />
      </div>

      {/* Phone Numbers */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-2">
          Contact Numbers
        </label>
        {formData.phoneNumbers.map((phone, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={phone}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
              placeholder={`Phone number ${index + 1}`}
              className="flex-1 border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
            />
            {formData.phoneNumbers.length > 1 && (
              <button
                type="button"
                onClick={() => removePhoneField(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addPhoneField}
          className="text-[#F57C00] font-medium mt-1 hover:underline"
        >
          + Add another number
        </button>
      </div>

      {/* Remarks */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          Remarks
        </label>
        <textarea
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          rows={2}
          className="w-full border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
          placeholder="Add remarks if any"
        />
      </div>

      {/* License Status */}
      <div>
        <label className="block text-gray-900 text-sm font-medium mb-1">
          License Status
        </label>
        <input
          name="licenseStatus"
          value={formData.licenseStatus}
          onChange={handleChange}
          className="w-full border border-orange-200 p-3 rounded-md focus:ring-2 focus:ring-orange-300"
          placeholder="Enter license status"
        />
      </div>

      {/* Active */}
      <div className="flex items-center space-x-2 pt-2">
        <input
          id="active"
          type="checkbox"
          name="active"
          checked={formData.active}
          onChange={handleChange}
          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-400"
        />
        <label htmlFor="active"  className="text-gray-900 font-medium">Active</label>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-md transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Company"}
        </button>
      </div>
    </form>
  );
}
