import Header from "@/components/dashboard/layout/header";
// import Sidebar from "@/components/dashboard/layout/sidebar-old";
import Sidebar from "@/components/dashboard/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artisan Nepal Dashboard",
  description: "Artisan Nepal Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
