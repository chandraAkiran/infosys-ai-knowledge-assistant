export default function ProfileCard() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-lg font-semibold text-white">
          PN
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Pulkit Narang
          </h2>

          <p className="text-sm text-slate-500">
            Employee
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Engineering Department
          </p>
        </div>
      </div>
    </section>
  );
}