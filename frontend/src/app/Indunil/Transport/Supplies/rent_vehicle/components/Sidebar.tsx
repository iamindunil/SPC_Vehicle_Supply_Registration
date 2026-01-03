"use client";

import Link from "next/link";
import { Home, FileText, PlusCircle, Building2, Settings, LogOut } from "lucide-react";

export default function RentVehicleSidebar() {
  return (
    <aside className="flex flex-col justify-between h-full min-h-screen w-full bg-[#FFF3E0] shadow-xl border-r border-orange-200">
      {/* Top Section */}
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-extrabold text-[#F57C00] mb-8 tracking-tight">
          Rent Vehicle
        </h2>

        <nav className="flex flex-col gap-3">
          {/* Cab Companies */}
          <Link
            href="/Indunil/Transport/Supplies/rent_vehicle"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <Building2 className="w-5 h-5 text-[#F57C00]" />
            <span>Cab Companies</span>
          </Link>

          {/* Contracts */}
          <Link
            href="/Indunil/Transport/Supplies/rent_vehicle/contracts"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <FileText className="w-5 h-5 text-[#F57C00]" />
            <span>Contracts</span>
          </Link>

          {/* Register Cab Company */}
          <Link
            href="/Indunil/Transport/Supplies/rent_vehicle/create"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <PlusCircle className="w-5 h-5 text-[#F57C00]" />
            <span>Register Cab Company</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-orange-100">
        <div className="flex flex-col gap-2 mb-3">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <Settings className="w-5 h-5 text-[#F57C00]" />
            <span>Settings</span>
          </Link>

          <button
            onClick={() => alert("Logging out...")}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <LogOut className="w-5 h-5 text-[#F57C00]" />
            <span>Logout</span>
          </button>
        </div>

        {/* Footer Branding */}
        <p className="text-center text-xs text-gray-500 mt-auto">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#F57C00] font-semibold">AutoCare</span>
        </p>
      </div>
    </aside>
  );
}
