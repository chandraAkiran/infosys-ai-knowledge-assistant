export default function SecuritySettings() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Security
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Review your account security settings.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Password
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Keep your account credentials secure.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Change password
          </button>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4">
          <div>
            <p className="text-sm font-medium text-slate-900">
              Active sessions
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Review devices currently using your account.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Manage sessions
          </button>
        </div>
      </div>
    </section>
  );
}