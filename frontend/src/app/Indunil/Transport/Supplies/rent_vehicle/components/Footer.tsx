"use client";

import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#FFF3E0] to-orange-50 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Contact Info */}
          <div className="text-center md:text-left text-sm text-gray-600 space-y-2">
            <h3 className="font-semibold text-[#F57C00] mb-2">Contact Information</h3>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-4 h-4 text-[#F57C00]" />
              <span>+94 11 2 123 456</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4 text-[#F57C00]" />
              <span>vehicles@spc.lk</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin className="w-4 h-4 text-[#F57C00]" />
              <span>Colombo 10, Sri Lanka</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center text-sm">
            <h3 className="font-semibold text-[#F57C00] mb-2">Quick Links</h3>
            <div className="space-y-1">
              <a href="#" className="block hover:text-[#F57C00] transition-colors">Help Center</a>
              <a href="#" className="block hover:text-[#F57C00] transition-colors">Documentation</a>
              <a href="#" className="block hover:text-[#F57C00] transition-colors">API Status</a>
            </div>
          </div>

          {/* System Status */}
          <div className="text-center md:text-right text-sm">
            <h3 className="font-semibold text-[#F57C00] mb-2">System Status</h3>
            <div className="flex items-center justify-center md:justify-end gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600">All Systems Operational</span>
            </div>
            <p className="text-xs text-gray-500">Last updated: Just now</p>
          </div>
        </div>

        <div className="border-t border-orange-200 pt-3 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} STATE PRINTING CORPORATION — All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
