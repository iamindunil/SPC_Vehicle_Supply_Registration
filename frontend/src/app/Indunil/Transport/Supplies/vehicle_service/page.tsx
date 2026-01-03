"use client";

import { useEffect, useState } from "react";
import { Plus, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchStations, deleteStation } from "../vehicle_service/api/serviceStationApi";
import { ServiceStationResponse } from "./types/serviceStation";
import StationTable from "./components/StationTable";
import DetailsCard from "./components/DetailsCard";

export default function VehicleServiceDashboard() {
  const [stations, setStations] = useState<ServiceStationResponse[]>([]);
  const [filteredStations, setFilteredStations] = useState<
    ServiceStationResponse[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStation, setSelectedStation] = useState<ServiceStationResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    try {
      setLoading(true);
      const data = await fetchStations();
      setStations(data);
      setFilteredStations(data);
    } catch (err) {
      console.error("Error loading stations:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(value: string) {
    setSearchTerm(value);
    const term = value.trim().toLowerCase();
    if (!term) {
      setFilteredStations(stations);
      return;
    }
    setFilteredStations(
      stations.filter((station) =>
        (station.name || "").toLowerCase().includes(term)
      )
    );
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this station?")) return;

    try {
      await deleteStation(id);
      loadStations();
    } catch (err) {
      console.error(err);
    }
  }
  // Removed invalid import statement

return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-[#E65100]">
            Vehicle Service Stations
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all registered service stations and maintenance partners.
          </p>
        </div>

        <button
          onClick={() =>
            router.push(
              "/Indunil/Transport/Supplies/vehicle_service/create"
            )
          }
          className="flex items-center gap-2 bg-gradient-to-r from-[#F57C00] to-orange-500 text-white px-6 py-3 rounded-xl hover:from-[#E65100] hover:to-orange-600 transition-all shadow-md hover:shadow-lg font-semibold"
        >
          <Plus size={20} />
          Add New Station
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-blue-700">{stations.length}</div>
          <div className="text-sm text-blue-800 mt-1">Total Stations</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-green-700">
            {stations.filter((s) => s.active).length}
          </div>
          <div className="text-sm text-green-800 mt-1">Active Stations</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-orange-700">
            {stations.filter((s) => s.type === "Internal").length}
          </div>
          <div className="text-sm text-orange-800 mt-1">Internal</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-5 shadow-sm">
          <div className="text-3xl font-bold text-purple-700">
            {stations.filter((s) => s.type === "External").length}
          </div>
          <div className="text-sm text-purple-800 mt-1">External Partners</div>
        </div>
      </div>

      {/* Search Bar & Export */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white/70 backdrop-blur-sm border border-orange-100 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <input
            type="text"
            placeholder="Search stations..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full sm:w-80 px-4 py-2 border border-orange-200 rounded-xl placeholder:text-gray-600 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />

          <button className="flex items-center gap-2 px-5 py-2 border border-orange-200 rounded-lg hover:bg-orange-50 text-gray-700 transition-colors font-medium">
            <FileText size={18} />
            Export
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-[#E65100]">{filteredStations.length}</span> of {stations.length} stations
        </p>
      </div>

      {/* Table */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-orange-100 p-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F57C00]"></div>
          </div>
        ) : (
          <StationTable stations={filteredStations} onDelete={handleDelete} />
        )}
      </div>
          {/* Details Card */}
      {selectedStation && (
        <DetailsCard
          title="Station Details"
          data={{
            "Station ID": `SS-${String(selectedStation.id ?? 0).padStart(3, "0")}`,
            Name: selectedStation.name,
            Address: selectedStation.address ?? "-",
            Phone: selectedStation.phoneNumbers?? "-",
            Email: selectedStation.email ?? "-",
            Type: selectedStation.type ?? "-",
            Active: selectedStation.active ? "Yes" : "No",
            Remarks: selectedStation.remarks ?? "-",
          }}
          onClose={() => setSelectedStation(null)}
        />
      )}
    </div>
  );
}
