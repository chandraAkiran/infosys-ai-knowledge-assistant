"use client";

import { useAuth } from "../../lib/auth-context";

export default function ProfileMenu() {
  const { user, logout } = useAuth();

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">
        {user?.name || "User"}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {user?.role || "Employee"}
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