import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Footer from "./components/Footer";

export default function InvoiceServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0]">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#FFF3E0] border-r border-orange-200">
          <Sidebar />
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#FFF8F0]">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
