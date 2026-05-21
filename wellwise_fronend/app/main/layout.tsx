import type { ReactNode } from "react";
import MainSidebar from "./_components/sidebar";

export default function MainLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <MainSidebar />
      <div className="md:pl-72 min-h-screen">
        <main className="w-full px-6 md:px-12 py-24 md:py-10 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}