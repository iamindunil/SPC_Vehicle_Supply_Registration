"use client";

import Link from "next/link";
import { FileText, PlusCircle, List } from "lucide-react";
import { usePathname } from "next/navigation";

export default function InvoiceSidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
     ${
       pathname === path
         ? "bg-orange-200 text-[#E65100]"
         : "text-gray-800 hover:bg-[#FFE0B2]"
     }`;

  return (
    <div className="h-full flex flex-col p-6">
      <h2 className="text-2xl font-extrabold text-[#F57C00] mb-10">
        Service Invoice
      </h2>

      <nav className="flex flex-col gap-2">
        <Link
          href="/Indunil/Transport/Supplies/invoiceservice"
          className={linkClass("/Indunil/Transport/Supplies/invoiceservice")}
        >
          <List size={20} /> Invoice List
        </Link>

        <Link
          href="/Indunil/Transport/Supplies/invoiceservice/create"
          className={linkClass(
            "/Indunil/Transport/Supplies/invoiceservice/create"
          )}
        >
          <PlusCircle size={20} /> Add Invoice
        </Link>
      </nav>

      <p className="text-xs text-gray-600 mt-auto pt-6 text-center">
        © {new Date().getFullYear()} Transport Division
      </p>
    </div>
  );
}
