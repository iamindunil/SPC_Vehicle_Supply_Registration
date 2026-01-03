"use client";

import { useRouter } from "next/navigation";
import InvoiceForm, {
  InvoiceCreateRequest,
} from "../components/InvoiceForm";
import { createInvoice } from "../api/invoiceserviceApi";

export default function CreateInvoicePage() {
  const router = useRouter();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#E65100] mb-6">
        Create Service Invoice
      </h1>

      <InvoiceForm
        onSubmit={async (data: InvoiceCreateRequest) => {
          await createInvoice(data);
          router.push("/Indunil/Transport/Supplies/invoiceservice");
        }}
      />
    </div>
  );
}
