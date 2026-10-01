"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface Connector {
  id: number;
  name: string;
  connector_type: string;
  description: string | null;
  is_enabled: boolean;
  status: string;
  created_at: string;
}

export default function ConnectorCard() {
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function loadConnectors() {
    try {
      setError("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await apiRequest<Connector[]>("/connectors/", {
        method: "GET",
        token,
      });

      setConnectors(response);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not load connectors.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadConnectors();
  }, []);

  async function updateConnector(
    connectorId: number,
    isEnabled: boolean
  ) {
    try {
      setUpdatingId(connectorId);
      setError("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const updatedConnector = await apiRequest<Connector>(
        `/connectors/${connectorId}/status?is_enabled=${isEnabled}`,
        {
          method: "PATCH",
          token,
        }
      );

      setConnectors((currentConnectors) =>
        currentConnectors.map((connector) =>
          connector.id === connectorId
            ? updatedConnector
            : connector
        )
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not update connector.";

      setError(message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Connectors
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor connected knowledge sources and enterprise tools.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading connectors...
        </p>
      ) : connectors.length === 0 ? (
        <p className="text-sm text-slate-500">
          No connectors configured.
        </p>
      ) : (
        <div className="space-y-4">
          {connectors.map((connector) => (
            <div
              key={connector.id}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {connector.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {connector.connector_type}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    connector.is_enabled
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {connector.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                {connector.description || "No description provided."}
              </p>

              <button
                type="button"
                disabled={updatingId === connector.id}
                onClick={() =>
                  updateConnector(
                    connector.id,
                    !connector.is_enabled
                  )
                }
                className="mt-4 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updatingId === connector.id
                  ? "Updating..."
                  : connector.is_enabled
                    ? "Disable connector"
                    : "Enable connector"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}