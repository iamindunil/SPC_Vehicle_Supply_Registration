"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchBarProps {
  suggestions?: { name: string; path: string }[];
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  suggestions = [],
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filteredSuggestions = suggestions.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className={`relative flex items-center bg-white text-gray-700 px-4 py-2 rounded-full shadow-inner ${className}`}
    >
      <Search className="text-gray-400 mr-2" size={18} />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent outline-none text-sm"
      />

      {query && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-orange-200 rounded-xl shadow-lg z-50">
          {filteredSuggestions.map((item) => (
            <div
              key={item.path}
              className="px-4 py-2 text-gray-700 hover:bg-orange-50 cursor-pointer"
              onClick={() => {
                router.push(item.path);
                setQuery("");
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
