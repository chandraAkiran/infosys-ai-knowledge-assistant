"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface AuditEvent {
  id?: number;
  user_id?: number | null;
  action?: string;
  resource_type?: string;
  resource_id?: number | null;
  details?: string | null;
  created_at?: string;
}

export default function AuditTable() {
  const [events, setEvents] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAuditLogs() {
    try {
      setError("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await apiRequest<AuditEvent[]>(
        "/admin/audit-logs",
        {
          method: "GET",
          token,
        }
      );

      setEvents(response);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not load audit logs.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAuditLogs();
  }, []);

  function formatTime(value?: string) {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  }

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

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading audit activity...
        </p>
      ) : events.length === 0 ? (
        <p className="text-sm text-slate-500">
          No audit events found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-medium">User ID</th>
                <th className="px-3 py-3 font-medium">Action</th>
                <th className="px-3 py-3 font-medium">Resource</th>
                <th className="px-3 py-3 font-medium">Details</th>
                <th className="px-3 py-3 font-medium">Time</th>
              </tr>
            </thead>

            <tbody>
              {events.map((event, index) => (
                <tr
                  key={event.id ?? index}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-3 py-4 font-medium text-slate-900">
                    {event.user_id ?? "—"}
                  </td>

                  <td className="px-3 py-4 text-slate-700">
                    {event.action ?? "—"}
                  </td>

                  <td className="px-3 py-4 text-slate-700">
                    {event.resource_type
                      ? `${event.resource_type}${
                          event.resource_id
                            ? ` #${event.resource_id}`
                            : ""
                        }`
                      : "—"}
                  </td>

                  <td className="max-w-xs px-3 py-4 text-slate-600">
                    {event.details || "—"}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-slate-500">
                    {formatTime(event.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}