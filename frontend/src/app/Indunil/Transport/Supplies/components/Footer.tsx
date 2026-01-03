"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FFF3E0] border-t border-orange-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Contact */}
        <div className="text-sm text-gray-700">
          <h3 className="text-[#F57C00] font-semibold mb-2">Contact</h3>
          <p className="flex gap-2 items-center"><Phone className="w-4" /> +94 11 2 123 456</p>
          <p className="flex gap-2 items-center"><Mail className="w-4" /> transport@spc.lk</p>
          <p className="flex gap-2 items-center"><MapPin className="w-4" /> Colombo 10, Sri Lanka</p>
        </div>

        {/* Quick Links */}
        <div className="text-center text-sm">
          <h3 className="text-[#F57C00] font-semibold mb-2">Quick Links</h3>
          <p className="hover:text-orange-600 cursor-pointer">Documentation</p>
          <p className="hover:text-orange-600 cursor-pointer">API Status</p>
          <p className="hover:text-orange-600 cursor-pointer">Help Center</p>
        </div>

        {/* Status */}
        <div className="text-right text-sm">
          <h3 className="text-[#F57C00] font-semibold mb-2">System Status</h3>
          <p className="flex justify-end gap-2 items-center text-gray-700">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Operational
          </p>
        </div>
      </div>

      <div className="border-t border-orange-200 text-center py-3 text-xs text-gray-600">
        © {new Date().getFullYear()} STATE PRINTING CORPORATION — Transport Division
      </div>
    </footer>
  );
}
