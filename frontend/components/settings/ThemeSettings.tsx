"use client";

import { useState } from "react";

export default function ThemeSettings() {
  const [theme, setTheme] = useState("Light");

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Appearance
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose how the application should appear.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Theme
        </label>

        <select
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-slate-400 sm:w-64"
        >
          <option>Light</option>
          <option>Dark</option>
          <option>System</option>
        </select>

        <p className="mt-2 text-xs text-slate-500">
          Selected theme: {theme}
        </p>
      </div>
    </section>
  );
}