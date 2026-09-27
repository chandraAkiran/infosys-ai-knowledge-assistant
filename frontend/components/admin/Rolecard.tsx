const roles = [
  {
    name: "Employee",
    description: "Can search approved knowledge and view permitted sources.",
    access: "Standard",
  },
  {
    name: "Manager",
    description: "Can access employee-level knowledge plus department resources.",
    access: "Department",
  },
  {
    name: "Admin",
    description: "Can manage users, governance settings, and system configuration.",
    access: "Full",
  },
];

export default function Rolecard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Roles & Access
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of role-based access permissions.
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((role) => (
          <div
            key={role.name}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-semibold text-slate-900">
                {role.name}
              </h3>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {role.access}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600">
              {role.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}