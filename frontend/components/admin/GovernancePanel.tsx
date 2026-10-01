"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface GovernanceSettings {
  require_source_citation: boolean;
  allow_external_connectors: boolean;
  minimum_confidence: number;
  require_approved_sources: boolean;
}

const defaultSettings: GovernanceSettings = {
  require_source_citation: true,
  allow_external_connectors: false,
  minimum_confidence: 0.5,
  require_approved_sources: true,
};

export default function GovernancePanel() {
  const [settings, setSettings] =
    useState<GovernanceSettings>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadSettings() {
    try {
      setError("");
      setMessage("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await apiRequest<GovernanceSettings>(
        "/admin/governance",
        {
          method: "GET",
          token,
        }
      );

      setSettings(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Could not load governance settings.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSettings();
  }, []);

  async function saveSettings(
    updatedSettings: GovernanceSettings
  ) {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await apiRequest<GovernanceSettings>(
        "/admin/governance",
        {
          method: "PUT",
          token,
          body: JSON.stringify(updatedSettings),
        }
      );

      setSettings(response);
      setMessage("Governance settings saved.");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Could not save governance settings.";

      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  }

  function updateBooleanSetting(
    key:
      | "require_source_citation"
      | "allow_external_connectors"
      | "require_approved_sources"
  ) {
    const updatedSettings = {
      ...settings,
      [key]: !settings[key],
    };

    setSettings(updatedSettings);
    saveSettings(updatedSettings);
  }

  function updateConfidence(value: number) {
    const updatedSettings = {
      ...settings,
      minimum_confidence: value,
    };

    setSettings(updatedSettings);
  }

  function saveConfidence() {
    saveSettings(settings);
  }

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

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading governance settings...
        </p>
      ) : (
        <div className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-slate-900">
                Source citations
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Require answers to include citations to knowledge sources.
              </p>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                updateBooleanSetting("require_source_citation")
              }
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                settings.require_source_citation
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {settings.require_source_citation
                ? "Enabled"
                : "Disabled"}
            </button>
          </div>

          <div className="border-t border-slate-100" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-slate-900">
                External connectors
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Allow knowledge workflows to use external connectors.
              </p>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                updateBooleanSetting("allow_external_connectors")
              }
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                settings.allow_external_connectors
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {settings.allow_external_connectors
                ? "Enabled"
                : "Disabled"}
            </button>
          </div>

          <div className="border-t border-slate-100" />

          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-medium text-slate-900">
                Approved sources only
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Restrict knowledge access to approved enterprise sources.
              </p>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={() =>
                updateBooleanSetting("require_approved_sources")
              }
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                settings.require_approved_sources
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {settings.require_approved_sources
                ? "Enabled"
                : "Disabled"}
            </button>
          </div>

          <div className="border-t border-slate-100" />

          <div>
            <div className="flex items-center justify-between text-sm">
              <div>
                <h3 className="font-medium text-slate-900">
                  Minimum confidence
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Minimum confidence required for a grounded answer.
                </p>
              </div>

              <span className="font-semibold text-slate-900">
                {Math.round(settings.minimum_confidence * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.minimum_confidence}
              disabled={saving}
              onChange={(event) =>
                updateConfidence(Number(event.target.value))
              }
              className="mt-4 w-full"
            />

            <button
              type="button"
              disabled={saving}
              onClick={saveConfidence}
              className="mt-3 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save confidence threshold"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}