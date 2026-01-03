"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Home, User } from "lucide-react";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);
  const router = useRouter();

  const suggestions = [
    { name: "Service Stations", path: "/Indunil/vehicle_service" },
    { name: "Contracts", path: "/Indunil/vehicle_service/contracts" },
    { name: "Register Station", path: "/Indunil/vehicle_service/create" },
    { name: "Home", path: "/Indunil/vehicle_service" },
  ];

  const filtered = suggestions.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    const found = filtered[highlightIndex] || filtered[0];
    if (found) router.push(found.path);

    setQuery("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filtered[highlightIndex] || filtered[0];
      if (selected) router.push(selected.path);
      setQuery("");
    }
  }

  return (
    <header className="bg-[#F57C00] text-white px-6 py-4 shadow-md flex items-center justify-between relative z-50">
      {/* Left Section */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-extrabold tracking-wide leading-tight">
          STATE PRINTING CORPORATION
        </h1>
        <span className="text-sm text-orange-100 font-medium">
          Vehicle Service Management
        </span>
      </div>

      {/* Search Section */}
      <form
        onSubmit={handleSearch}
        className="relative flex items-center bg-white rounded-full px-3 py-1 w-1/3 shadow-inner border border-orange-200 focus-within:ring-2 focus-within:ring-orange-300 transition-all"
      >
        <Search className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlightIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search stations, contracts..."
          className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
        />

        {/* Auto-suggest dropdown */}
        {query && filtered.length > 0 && (
          <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-orange-200 rounded-lg shadow-lg overflow-hidden text-gray-800 text-sm">
            {filtered.map((item, i) => (
              <li
                key={item.name}
                onClick={() => router.push(item.path)}
                className={`px-4 py-2 cursor-pointer ${
                  i === highlightIndex
                    ? "bg-[#FFF3E0] text-[#E65100]"
                    : "hover:bg-[#FFE0B2]"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/Indunil/vehicle_service")}
          className="p-2 rounded-full hover:bg-orange-500 transition-all"
          title="Home"
        >
          <Home className="w-6 h-6 text-white" />
        </button>

        <button
          title="My Account"
          className="p-2 rounded-full hover:bg-orange-500 transition-all"
        >
          <User className="w-6 h-6 text-white" />
        </button>
      </div>
    </header>
  );
}
