"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#F57C00] text-white px-8 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">STATE PRINTING CORPORATION</h1>
          <p className="text-sm opacity-90">Invoice Service</p>
        </div>

        <nav className="flex gap-6 text-sm font-semibold">
          <Link href="/Indunil/Transport/Supplies/invoiceservice">
            Invoices
          </Link>
          <Link href="/Indunil/Transport/Supplies/invoiceservice/create">
            New Invoice
          </Link>
        </nav>
      </div>
    </header>
  );
}
