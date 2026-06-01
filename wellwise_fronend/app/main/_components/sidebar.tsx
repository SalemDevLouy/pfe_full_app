"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { markSignedOut } from "@/app/lib/session-flow";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const navItems = [
  { href: "/main/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/main/tracker", label: "My Plan", icon: "event_note" },
  { href: "/main/insights", label: "Recommendations", icon: "auto_awesome" },
  { href: "/main/assessment", label: "Assessment", icon: "check_circle" },
  { href: "/main/store", label: "Store", icon: "local_mall" },
  { href: "/main/orders", label: "Orders", icon: "shopping_bag" },
  { href: "/main/profile", label: "Profile", icon: "person" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-9 h-9 text-sm" : "w-12 h-12 text-base";
  return (
    <div className={`${cls} rounded-2xl overflow-hidden bg-green-100 flex items-center justify-center shrink-0`}>
      <span className="font-headline font-bold text-green-800">{initials}</span>
    </div>
  );
}

export default function MainSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const userName = session?.user?.name ?? "Guest";
  const userEmail = session?.user?.email ?? "";
  const initials = getInitials(userName);

  const close = () => setIsOpen(false);

  const handleLogout = async () => {
    markSignedOut();
    await signOut({ redirect: false });
    router.replace("/signin");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white/90 backdrop-blur-xl border-b border-slate-200/50 px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 -ml-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
          <span className="text-xl font-bold tracking-tighter text-green-900 font-headline">sihatek market</span>
        </div>
        <Avatar initials={initials} size="sm" />
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-50 w-72 h-screen overflow-y-auto flex-col border-r border-slate-200/70 bg-slate-50/95 backdrop-blur-xl shadow-[8px_0_24px_rgba(26,28,28,0.04)] transition-transform duration-300 ease-in-out md:flex md:translate-x-0 ${
        isOpen ? "translate-x-0 flex" : "-translate-x-full"
      }`}>

        {/* Logo */}
        <div className="px-8 py-10 flex items-center justify-between">
          <span className="text-2xl font-bold tracking-tighter text-green-900 font-headline">sihatek market</span>
          <button
            className="md:hidden p-2 -mr-2 text-stone-500 hover:bg-stone-200 rounded-full transition-colors"
            onClick={close}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* User card */}
        <Link
          href="/main/profile"
          onClick={close}
          className="mx-5 -mt-4 mb-4 flex items-center gap-3 p-4 rounded-2xl bg-white border border-stone-100 shadow-sm hover:border-green-200 hover:shadow-md transition-all group"
        >
          <Avatar initials={initials} />
          <div className="min-w-0">
            <h3 className="font-headline font-bold text-on-surface leading-tight truncate group-hover:text-green-900 transition-colors">
              {userName}
            </h3>
            <p className="text-xs text-stone-400 font-medium truncate">{userEmail}</p>
          </div>
          <span className="material-symbols-outlined text-stone-300 group-hover:text-green-700 transition-colors ml-auto shrink-0 text-lg">chevron_right</span>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors duration-300 ${
                  active
                    ? "bg-green-100/60 text-green-900 font-semibold"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 space-y-3">
          <button
            onClick={() => toast("Habit log opened", { description: "Select a habit to record today's progress." })}
            className="w-full editorial-gradient text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 wellness-glow active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>add</span>
            Log a Habit
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full bg-white text-stone-700 py-3 px-6 rounded-2xl font-semibold border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
