"use client";

import { useState } from "react";

export default function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [queryUpdates, setQueryUpdates] = useState(true);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Notifications
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Control which notifications you receive.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        <div className="flex items-center justify-between gap-6 py-4">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Email notifications
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Receive important updates through email.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`min-w-16 rounded-full px-3 py-1.5 text-xs font-semibold ${
              emailNotifications
                ? "bg-slate-900 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {emailNotifications ? "ON" : "OFF"}
          </button>
        </div>

        <div className="flex items-center justify-between gap-6 py-4">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Query updates
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Receive updates related to your assistant activity.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setQueryUpdates(!queryUpdates)}
            className={`min-w-16 rounded-full px-3 py-1.5 text-xs font-semibold ${
              queryUpdates
                ? "bg-slate-900 text-white"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {queryUpdates ? "ON" : "OFF"}
          </button>
        </div>
      </div>
    </section>
  );
}