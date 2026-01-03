"use client";

import Link from "next/link";
import { Car, Wrench, LayoutDashboard, FileText } from "lucide-react"; // Added FileText icon

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-[#FFF3E0] border-r border-orange-200 shadow-lg p-6 flex flex-col">

      <h2 className="text-2xl font-extrabold text-[#F57C00] mb-10">
        Supplies
      </h2>

      <nav className="flex flex-col gap-3">
        <Link
          href="/Indunil/Transport/Supplies"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#FFE0B2] text-gray-800"
        >
          <LayoutDashboard /> Dashboard
        </Link>

        <Link
          href="/Indunil/Transport/Supplies/rent_vehicle"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#FFE0B2] text-gray-800"
        >
          <Car /> Rent Vehicle
        </Link>

        <Link
          href="/Indunil/Transport/Supplies/vehicle_service"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#FFE0B2] text-gray-800"
        >
          <Wrench /> Vehicle Service
        </Link>

        <Link
          href="/Indunil/Transport/Supplies/invoiceservice"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#FFE0B2] text-gray-800"
        >
          <FileText /> Service Invoice
        </Link>

      </nav>

      <p className="text-xs text-gray-500 mt-auto pt-6 text-center">
        © {new Date().getFullYear()} Transport Division
      </p>
    </aside>
  );
}
