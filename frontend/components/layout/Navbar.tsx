"use client";

import { useState } from "react";
import Logo from "@/components/common/Logo";
import ProfileMenu from "@/components/layout/ProfileMenu";
import { useAuth } from "@/lib/auth-context";

export default function Navbar() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user } = useAuth();

  const displayName = user?.full_name || "User";

  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Employee";

  const initials =
    displayName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <Logo />

      <div className="relative flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-900">
            {displayName}
          </p>

          <p className="text-xs text-slate-500">
            {displayRole}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700"
        >
          {initials}
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