"use client";

import { useEffect, useState } from "react";
import { Plus, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchInvoices, deleteInvoice } from "../invoiceservice/api/invoiceserviceApi";
import { InvoiceResponse } from "./types/invoice";
import InvoiceTable from "./components/InvoiceTable";

export default function InvoiceDashboard() {
  const [invoices, setInvoices] = useState<InvoiceResponse[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchInvoices();
      setInvoices(data);
      setFilteredInvoices(data);
    } catch (err) {
      console.error("Error loading invoices:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(value: string) {
    setSearchTerm(value);
    const term = value.trim().toLowerCase();

    if (!term) {
      setFilteredInvoices(invoices);
      return;
    }

    setFilteredInvoices(
      invoices.filter(
        (inv) =>
          inv.invoiceNo?.toLowerCase().includes(term) ||
          inv.vehicleNo?.toLowerCase().includes(term)
      )
    );
  }

  const totalAmount = invoices.reduce(
    (sum, i) => sum + i.totalAmount,
    0
  );

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-[#E65100]">
            Service Invoices
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all vehicle service invoices and maintenance records.
          </p>
        </div>

        <button
          onClick={() =>
            router.push(
              "/Indunil/Transport/Supplies/invoiceservice/create"
            )
          }
          className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] to-orange-500 text-white px-6 py-3 rounded-xl hover:from-[#E65100] hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-semibold"
        >
          <Plus size={20} />
          New Invoice
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-blue-700">
            {invoices.length}
          </div>
          <div className="text-sm text-blue-800 mt-1">
            Total Invoices
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-green-700">
            {totalAmount.toFixed(2)}
          </div>
          <div className="text-sm text-green-800 mt-1">
            Total Amount ({invoices[0]?.currency ?? ""})
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-orange-700">
            {new Set(invoices.map((i) => i.vehicleNo)).size}
          </div>
          <div className="text-sm text-orange-800 mt-1">
            Vehicles Serviced
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-purple-700">
            {invoices.reduce(
              (sum, i) => sum + i.activities.length,
              0
            )}
          </div>
          <div className="text-sm text-purple-800 mt-1">
            Total Activities
          </div>
        </div>
      </div>

      {/* Search & actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/70 backdrop-blur-sm border border-orange-100 rounded-2xl p-5 shadow-sm">
        <input
          type="text"
          placeholder="Search by invoice no or vehicle no..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-orange-200 rounded-xl placeholder:text-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />

        <button className="flex items-center gap-2 px-5 py-2 border border-orange-200 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors font-medium">
          <FileText size={18} />
          Export
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F57C00]" />
        </div>
      ) : filteredInvoices.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No invoices found.
        </p>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-4">
          <InvoiceTable
            invoices={filteredInvoices}
            onDelete={async (id) => {
              await deleteInvoice(id);
              load();
            }}
          />
        </div>
      )}
    </div>
  );
}
