import Pageheader from "@/components/common/Pageheader";

export default function AdminPage() {
  return (
    <div>
      <Pageheader
        title="Admin & Governance"
        description="Manage access, sources, connectors, and governance controls."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        Admin panel coming next.
      </div>
    </div>
  );
}