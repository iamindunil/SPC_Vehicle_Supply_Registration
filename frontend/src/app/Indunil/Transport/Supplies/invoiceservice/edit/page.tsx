"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InvoiceForm, {
  InvoiceCreateRequest,
} from "../components/InvoiceForm";
import {
  fetchInvoiceById,
  updateInvoice,
} from "../api/invoiceserviceApi";
import { InvoiceResponse } from "../types/invoice";

function mapResponseToRequest(
  inv: InvoiceResponse
): InvoiceCreateRequest {
  return {
    vehicleNo: inv.vehicleNo,
    serviceStationId: inv.serviceStationId,
    serviceDate: inv.serviceDate,
    mileage: inv.mileage ?? 0,
    currency: inv.currency,
    remarks: inv.remarks,
    activities: inv.activities ?? [],
  };
}

export default function EditInvoicePage() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const [data, setData] = useState<InvoiceCreateRequest | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchInvoiceById(Number(id)).then((res: InvoiceResponse) =>
      setData(mapResponseToRequest(res))
    );
  }, [id]);

  if (!data) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-[#E65100] mb-6">
        Edit Service Invoice
      </h1>

      <InvoiceForm
        initialData={data}
        onSubmit={async (updated) => {
          await updateInvoice(Number(id), updated);
          router.push("/Indunil/Transport/Supplies/invoiceservice");
        }}
      />
    </div>
  );
}
