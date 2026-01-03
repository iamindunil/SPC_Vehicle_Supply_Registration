import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

export default function VehicleServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      {/* Header — identical to RentVehicle */}
      <div className="shadow-md z-50">
        <Header />
      </div>

      {/* Main content layout */}
      <div className="flex flex-1 min-h-[calc(100vh-200px)] overflow-hidden">
        {/* Sidebar — identical styling */}
        <aside className="w-64 bg-[#FFF3E0] border-r border-orange-200 shadow-inner flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </aside>

        {/* Main content — rounded TL corner & shadow match */}
        <main className="flex-1 overflow-y-auto p-8 bg-white rounded-tl-2xl shadow-inner">
          {children}
        </main>
      </div>

      {/* Footer — same thin border */}
      <footer className="mt-auto border-t border-orange-200">
        <Footer />
      </footer>
    </div>
  );
}
