"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InvoiceResponse } from "../types/invoice";

interface Props {
  invoice: InvoiceResponse | null;
  onClose: () => void;
}

export default function InvoiceDetailsCard({ invoice, onClose }: Props) {
  if (!invoice) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl p-6 w-[95%] max-w-[600px] border-t-4 border-[#F57C00]"
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
        >
          <button
            onClick={onClose}
            aria-label="Close invoice details"
            title="Close"
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-[#F57C00] mb-4 text-center">
            Invoice Details
          </h2>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <p><b>Invoice No:</b> {invoice.invoiceNo}</p>
            <p><b>Vehicle No:</b> {invoice.vehicleNo}</p>
            <p><b>Station ID:</b> {invoice.serviceStationId}</p>
            <p><b>Date:</b> {invoice.serviceDate}</p>
            <p><b>Mileage:</b> {invoice.mileage ?? "—"}</p>
            <p><b>Currency:</b> {invoice.currency}</p>
          </div>

          <hr className="my-4" />

          <h3 className="font-semibold mb-2">Service Activities</h3>

          {invoice.activities.length === 0 ? (
            <p className="text-gray-500 italic">No activities</p>
          ) : (
            <ul className="space-y-2">
              {invoice.activities.map((a, i) => (
                <li
                  key={i}
                  className="flex justify-between bg-orange-50 px-3 py-2 rounded-lg"
                >
                  <span>{a.description}</span>
                  <span className="font-semibold">
                    {a.cost.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 text-right font-bold text-lg">
            Total: {invoice.totalAmount.toFixed(2)} {invoice.currency}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
