"use client";

import { useState } from "react";
import Logo from "@/components/common/Logo";
import ProfileMenu from "@/components/layout/ProfileMenu";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <Logo />

      <div className="relative flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">
            Pulkit Narang
          </p>
          <p className="text-xs text-slate-500">
            Employee
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700"
        >
          PN
        </button>

        {showProfileMenu && (
          <div className="absolute right-0 top-12 z-50 w-64">
            <ProfileMenu />
          </div>
        )}
      </div>
    </header>
  );
}