"use client";

const users = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@infosys.com",
    role: "Employee",
    department: "Engineering",
    status: "Active",
  },
  {
    name: "Meera Kapoor",
    email: "meera.kapoor@infosys.com",
    role: "Manager",
    department: "HR",
    status: "Active",
  },
  {
    name: "Rohan Mehta",
    email: "rohan.mehta@infosys.com",
    role: "Admin",
    department: "IT",
    status: "Active",
  },
  {
    name: "Neha Verma",
    email: "neha.verma@infosys.com",
    role: "Employee",
    department: "Sales",
    status: "Inactive",
  },
];

export default function UserTable() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Users & Roles
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage employee roles and department access.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Role</th>
              <th className="px-3 py-3 font-medium">Department</th>
              <th className="px-3 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.email}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-3 py-4">
                  <div className="font-medium text-slate-900">
                    {user.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {user.email}
                  </div>
                </td>

                <td className="px-3 py-4 text-slate-700">
                  {user.role}
                </td>

                <td className="px-3 py-4 text-slate-700">
                  {user.department}
                </td>

                <td className="px-3 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}