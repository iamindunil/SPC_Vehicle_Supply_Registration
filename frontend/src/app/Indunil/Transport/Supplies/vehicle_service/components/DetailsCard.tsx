"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DetailsCardProps {
  title: string;
  data: Record<string, any>;
  onClose: () => void;
}

export default function DetailsCard({ title, data, onClose }: DetailsCardProps) {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl p-6 w-[95%] max-w-[500px] border-t-4 border-[#F57C00]"
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
        >
          <button 
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition-colors"
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold text-[#F57C00] mb-5 text-center border-b border-orange-200 pb-2">
            {title}
          </h2>

          <div className="space-y-2 text-gray-800">
            {Object.entries(data).map(([key, value]) => (
              <p key={key}>
                <strong className="capitalize">{formatKey(key)}:</strong>{" "}
                {formatValue(value)}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(value: any): string {
  if (Array.isArray(value)) return value.join(", ");
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value == null || value === "") return "—";
  return String(value);
}
