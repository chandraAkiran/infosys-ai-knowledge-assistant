import AuditTable from "@/components/admin/AuditTable";
import ConnectorCard from "@/components/admin/ConnectorCard";
import GovernancePanel from "@/components/admin/GovernancePanel";
import Rolecard from "@/components/admin/Rolecard";
import UserTable from "@/components/admin/UserTable";

export default function AdminPage() {
  return (
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
  );
}