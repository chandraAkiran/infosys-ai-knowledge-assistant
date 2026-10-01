"use client";

import { useEffect, useState } from "react";
import AuditTable from "@/components/admin/AuditTable";
import ConnectorCard from "@/components/admin/ConnectorCard";
import GovernancePanel from "@/components/admin/GovernancePanel";
import Rolecard from "@/components/admin/Rolecard";
import UserTable from "@/components/admin/UserTable";
import ProtectedRoute from "@/app/auth/Protected_route";
import { useAuth } from "@/lib/auth-context";

export default function AdminPage() {
  const { user } = useAuth();
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    if (user && user.role !== "admin") {
      setAccessDenied(true);
    }
  }, [user]);

  return (
    <ProtectedRoute>
      {accessDenied ? (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <div className="w-full max-w-md rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-semibold text-slate-900">
              Access denied
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Administrator permissions are required to access this page.
            </p>
          </div>
        </main>
      ) : (
        <main className="min-h-screen bg-slate-50 px-6 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-medium text-slate-500">
                Administration
              </p>

              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Admin & Governance
              </h1>

              <p className="mt-2 max-w-3xl text-slate-600">
                Manage users, roles, connectors, audit activity, and governance
                policies for the enterprise knowledge assistant.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <UserTable />
              <Rolecard />
              <ConnectorCard />
              <GovernancePanel />
            </div>

            <div className="mt-6">
              <AuditTable />
            </div>
          </div>
        </main>
      )}
    </ProtectedRoute>
  );
}