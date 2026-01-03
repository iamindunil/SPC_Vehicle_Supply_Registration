"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import InvoiceDetailsCard from "./InvoiceDetailsCard";
import { InvoiceResponse } from "../types/invoice";
import { useRouter } from "next/navigation";

interface Props {
  invoices: InvoiceResponse[];
  onDelete: (id: number) => void;
}

export default function InvoiceTable({ invoices, onDelete }: Props) {
  const [selected, setSelected] = useState<InvoiceResponse | null>(null);
  const router = useRouter();

  return (
    <>
      <InvoiceDetailsCard
        invoice={selected}
        onClose={() => setSelected(null)}
      />

      <table className="min-w-full">
        <thead className="bg-[#FFE0B2] text-[#E65100]">
          <tr>
            <th className="p-3 text-left">Invoice</th>
            <th className="p-3">Vehicle</th>
            <th className="p-3">Date</th>
            <th className="p-3">Total</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv) => (
            <tr
              key={inv.id}
              onClick={() => setSelected(inv)}
              className="cursor-pointer hover:bg-orange-50 border-t"
            >
              <td className="p-3">{inv.invoiceNo}</td>
              <td className="p-3">{inv.vehicleNo}</td>
              <td className="p-3">{inv.serviceDate}</td>
              <td className="p-3 font-semibold">
                {inv.totalAmount.toFixed(2)}
              </td>
              <td
                className="p-3 flex gap-3 justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  title="View"
                  onClick={() => setSelected(inv)}
                >
                  <Eye />
                </button>

                <button
                  title="Edit"
                  onClick={() =>
                    router.push(
                      `/Indunil/Transport/Supplies/invoiceservice/edit?id=${inv.id}`
                    )
                  }
                >
                  <Pencil />
                </button>

                <button
                  title="Delete"
                  onClick={() => onDelete(inv.id)}
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
