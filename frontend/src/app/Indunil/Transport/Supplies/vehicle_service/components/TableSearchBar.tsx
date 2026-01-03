"use client";

import { Search, X } from "lucide-react";
import React from "react";

interface TableSearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function TableSearchBar({
  placeholder = "Search...",
  value,
  onChange,
}: TableSearchBarProps) {
  return (
    <div className="flex items-center mb-6">
      <div className="relative flex-1">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-[#F57C00] focus:outline-none bg-white text-gray-700"
        />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
            title="Clear"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
