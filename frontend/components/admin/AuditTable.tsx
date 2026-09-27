const auditEvents = [
  {
    user: "Aarav Sharma",
    action: "Document uploaded",
    resource: "Microservices Architecture Guide",
    time: "Today, 10:42 AM",
  },
  {
    user: "Meera Kapoor",
    action: "Policy reviewed",
    resource: "Global Leave Policy",
    time: "Today, 09:18 AM",
  },
  {
    user: "Rohan Mehta",
    action: "Role updated",
    resource: "Neha Verma",
    time: "Yesterday, 04:35 PM",
  },
  {
    user: "Aarav Sharma",
    action: "Knowledge query",
    resource: "Incident escalation SOP",
    time: "Yesterday, 02:11 PM",
  },
];

export default function AuditTable() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Audit Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Recent administrative and knowledge-system events.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="px-3 py-3 font-medium">User</th>
              <th className="px-3 py-3 font-medium">Action</th>
              <th className="px-3 py-3 font-medium">Resource</th>
              <th className="px-3 py-3 font-medium">Time</th>
            </tr>
          </thead>

          <tbody>
            {auditEvents.map((event, index) => (
              <tr
                key={`${event.user}-${index}`}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-3 py-4 font-medium text-slate-900">
                  {event.user}
                </td>

                <td className="px-3 py-4 text-slate-700">
                  {event.action}
                </td>

                <td className="px-3 py-4 text-slate-700">
                  {event.resource}
                </td>

                <td className="px-3 py-4 text-slate-500">
                  {event.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
