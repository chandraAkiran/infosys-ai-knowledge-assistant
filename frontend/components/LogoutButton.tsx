"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
    >
      Logout
    </button>
  );
}