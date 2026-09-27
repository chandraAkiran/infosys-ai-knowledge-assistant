"use client";

import { useState } from "react";

export default function GovernancePanel() {
  const [sourceApproval, setSourceApproval] = useState(true);
  const [redaction, setRedaction] = useState(true);
  const [accessRules, setAccessRules] = useState(true);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Governance Controls
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure high-level knowledge governance policies.
        </p>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-slate-900">
              Source approval
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Require approval before a document becomes searchable.
            </p>
          </div>

          <button
            onClick={() => setSourceApproval(!sourceApproval)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              sourceApproval
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {sourceApproval ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="border-t border-slate-100" />

        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-slate-900">
              Sensitive data redaction
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Apply redaction checks before knowledge is exposed.
            </p>
          </div>

          <button
            onClick={() => setRedaction(!redaction)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              redaction
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {redaction ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="border-t border-slate-100" />

        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-slate-900">
              Permission-aware retrieval
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Restrict retrieved knowledge according to user access.
            </p>
          </div>

          <button
            onClick={() => setAccessRules(!accessRules)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              accessRules
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {accessRules ? "Enabled" : "Disabled"}
          </button>
        </div>

        <div className="border-t border-slate-100" />

        <div>
          <h3 className="font-medium text-slate-900">
            Answer quality threshold
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Minimum confidence threshold before an answer is presented.
          </p>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Minimum confidence</span>
              <span className="font-semibold text-slate-900">70%</span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-slate-700"
                style={{ width: "70%" }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100" />

        <div>
          <h3 className="font-medium text-slate-900">
            Document retention
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Default retention period for uploaded knowledge documents.
          </p>

          <select className="mt-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900">
            <option>12 months</option>
            <option>24 months</option>
            <option>36 months</option>
            <option>Indefinite</option>
          </select>
        </div>
      </div>
    </div>
  );
}