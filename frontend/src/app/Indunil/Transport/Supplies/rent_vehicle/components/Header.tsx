"use client";

import { Home, User } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Header() {
  const router = useRouter();

  const suggestions = [
    { name: "Service Stations", path: "/Indunil/vehicle_service" },
    { name: "Contracts", path: "/Indunil/vehicle_service/contracts" },
    { name: "Register Station", path: "/Indunil/vehicle_service/create" },
    { name: "Home", path: "/Indunil/vehicle_service" },
  ];

  return (
    <header className="bg-[#F57C00] text-white px-8 py-6 shadow-lg flex items-center justify-between relative z-50">
      {/* Left Section */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-extrabold tracking-wide leading-tight">
          STATE PRINTING CORPORATION
        </h1>
        <span className="text-sm text-orange-100 font-medium">
          Vehicle Service Management
        </span>
      </div>

      {/* Center Section - Reusable Search */}
      <div className="w-1/3">
        <SearchBar
          placeholder="Search stations, contracts..."
          suggestions={suggestions}
          className="bg-white text-gray-700 rounded-full border border-orange-200 shadow-inner focus-within:ring-2 focus-within:ring-orange-300 transition-all"
        />
      </div>

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
