const connectors = [
  {
    name: "Knowledge Base",
    type: "RAG",
    status: "Connected",
    description: "Internal enterprise documents and approved knowledge.",
  },
  {
    name: "HR Service",
    type: "MCP",
    status: "Planned",
    description: "Future connector for HR-related employee services.",
  },
  {
    name: "Engineering Tools",
    type: "MCP",
    status: "Planned",
    description: "Future connector for engineering systems and runbooks.",
  },
];

export default function ConnectorCard() {
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

      <div className="space-y-4">
        {connectors.map((connector) => (
          <div
            key={connector.name}
            className="rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900">
                  {connector.name}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {connector.type}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  connector.status === "Connected"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {connector.status}
              </span>
            </div>

            <p className="mt-3 text-sm text-slate-600">
              {connector.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}