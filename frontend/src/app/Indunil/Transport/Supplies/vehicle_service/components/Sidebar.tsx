"use client";

import Link from "next/link";
import { Home, FileText, PlusCircle, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="flex flex-col justify-between h-full w-full bg-[#FFF3E0] shadow-xl border-r border-orange-200">
      {/* Top Section */}
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-extrabold text-[#F57C00] mb-8 tracking-tight">
          Vehicle Service
        </h2>

        <nav className="flex flex-col gap-3">
          <Link
            href="/Indunil/Transport/Supplies/vehicle_service"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <Home className="w-5 h-5 text-[#F57C00]" />
            <span>Service Stations</span>
          </Link>

          <Link
            href="/Indunil/Transport/Supplies/vehicle_service/contracts"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <FileText className="w-5 h-5 text-[#F57C00]" />
            <span>Contracts</span>
          </Link>

          <Link
            href="/Indunil/Transport/Supplies/vehicle_service/create"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-900 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <PlusCircle className="w-5 h-5 text-[#F57C00]" />
            <span>Register Station</span>
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
            onClick={() => alert('Logging out...')}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-[#FFE0B2] hover:text-[#E65100] transition-all"
          >
            <LogOut className="w-5 h-5 text-[#F57C00]" />
            <span>Logout</span>
          </button>
        </div>

        {/* Footer Branding */}
        <p className="text-center text-sm text-gray-500 mt-auto">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#F57C00] font-semibold">AutoCare</span>
        </p>
      </div>
    </aside>
  );
}
