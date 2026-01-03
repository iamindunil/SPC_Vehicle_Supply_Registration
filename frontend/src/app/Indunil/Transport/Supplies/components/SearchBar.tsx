"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ placeholder, className }: any) {
  const [query, setQuery] = useState("");

  return (
    <div className={`flex items-center px-4 py-2 ${className}`}>
      <Search className="text-gray-400 mr-2" size={18} />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent focus:outline-none text-sm"
      />
    </div>
  );
}
