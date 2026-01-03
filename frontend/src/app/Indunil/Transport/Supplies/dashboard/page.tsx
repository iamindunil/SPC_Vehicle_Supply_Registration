"use client";

import Header from "@/app/Indunil/Transport/Supplies/components/Header";
import Footer from "@/app/Indunil/Transport/Supplies/components/Footer";
import Sidebar from "@/app/Indunil/Transport/Supplies/components/Sidebar";
import { useRouter } from "next/navigation";
import { Car, Wrench, FileText } from "lucide-react"; // added FileText for invoice

export default function SuppliesDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-[#FFF8F0]">
      
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-grow px-10 py-10">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            Registration of Supplies Services
          </h1>
          <p className="text-gray-600 mb-10">
            Choose an option below to manage vehicle rentals or service stations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12"> {/* Changed to 3 columns */}

            {/* Rent Vehicle */}
            <div
              onClick={() => router.push("/Indunil/Transport/Supplies/rent_vehicle")}
              className="cursor-pointer bg-white rounded-3xl shadow-xl border border-orange-200 p-10 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-6">
                <div className="bg-[#F57C00]/10 p-6 rounded-full">
                  <Car className="w-16 h-16 text-[#F57C00]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Vehicle Rent Companies</h2>
                  <p className="text-gray-600 mt-1 w-64">
                    Manage cab companies and vehicle rental contracts.
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Service */}
            <div
              onClick={() => router.push("/Indunil/Transport/Supplies/vehicle_service")}
              className="cursor-pointer bg-white rounded-3xl shadow-xl border border-orange-200 p-10 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-6">
                <div className="bg-[#EF6C00]/10 p-6 rounded-full">
                  <Wrench className="w-16 h-16 text-[#EF6C00]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Vehicle Service Companies</h2>
                  <p className="text-gray-600 mt-1 w-64">
                    Register service stations and manage repair operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Service Invoice */}
            <div
              onClick={() => router.push("/Indunil/Transport/Supplies/invoiceservice")}
              className="cursor-pointer bg-white rounded-3xl shadow-xl border border-orange-200 p-10 hover:shadow-2xl hover:-translate-y-1 transition"
            >
              <div className="flex items-center gap-6">
                <div className="bg-[#FFA000]/10 p-6 rounded-full">
                  <FileText className="w-16 h-16 text-[#FFA000]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Vehicle Service Invoice</h2>
                  <p className="text-gray-600 mt-1 w-64">
                    View, create, and manage service invoices for vehicles.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
