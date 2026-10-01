"use client";

import { useAuth } from "../../lib/auth-context";

export default function ProfileMenu() {
  const { user, logout } = useAuth();

  const displayName = user?.full_name || "User";

  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Employee";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">
        {displayName}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {displayRole}
      </p>

      <button
        onClick={logout}
        className="mt-4 w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Logout
      </button>
    </div>
  );
}