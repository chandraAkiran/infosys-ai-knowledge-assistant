"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "AI Assistant", href: "/chat" },
  { name: "Upload", href: "/upload" },
  { name: "Analytics", href: "/analytics" },
  { name: "Admin", href: "/admin" },
  { name: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}