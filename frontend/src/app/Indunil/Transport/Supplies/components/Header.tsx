"use client";

import { Home, User } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBar from "../components/SearchBar";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-[#F57C00] text-white px-8 py-6 shadow-lg flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-wide">
          STATE PRINTING CORPORATION
        </h1>
        <p className="text-sm text-orange-100">
          Transport — Supplies Division
        </p>
      </div>

      {/* Center Search */}
      <div className="w-1/3">
        <SearchBar
          placeholder="Search modules, pages..."
          className="bg-white text-gray-700 rounded-full border border-orange-200 shadow-inner"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/Indunil/Transport/Supplies")}
          aria-label="Go to Supplies Dashboard"
          title="Home"
          className="p-2 rounded-full hover:bg-orange-500 transition"
        >
          <Home className="w-6 h-6" />
        </button>

        <button
          aria-label="User Profile"
          title="Profile"
          className="p-2 rounded-full hover:bg-orange-500 transition"
        >
          <User className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
