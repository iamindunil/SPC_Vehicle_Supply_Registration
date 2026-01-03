"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchInvoiceById } from "../api/invoiceserviceApi";
import { formatCurrency } from "../utils/currency";

export default function ViewInvoicePage() {
  const params = useSearchParams();
  const id = params.get("id");
  const router = useRouter();
  const [invoice, setInvoice] = useState<any>(null);

  useEffect(() => {
    if (id) fetchInvoiceById(Number(id)).then(setInvoice);
  }, [id]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-[#E65100] mb-6">
        Invoice #{invoice.invoiceNo}
      </h1>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><b>Vehicle:</b> {invoice.vehicleNo}</p>
        <p><b>Date:</b> {invoice.serviceDate}</p>
        <p><b>Station:</b> {invoice.serviceStationId}</p>
        <p><b>Total:</b> {formatCurrency(invoice.totalAmount)}</p>
      </div>

      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 border rounded-lg"
      >
        Back
      </button>
    </div>
  );
}
