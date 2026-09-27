const usageData = [
  { label: "Mon", value: 35 },
  { label: "Tue", value: 52 },
  { label: "Wed", value: 44 },
  { label: "Thu", value: 68 },
  { label: "Fri", value: 58 },
  { label: "Sat", value: 30 },
  { label: "Sun", value: 42 },
];

export default function DashBoardCharts() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Assistant Usage
        </h2>

        <p className="text-sm text-slate-500">
          Queries submitted over the past week.
        </p>
      </div>

      <div className="flex h-48 items-end justify-between gap-3">
        {usageData.map((item) => (
          <div
            key={item.label}
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className="w-full rounded-t-md bg-slate-800"
              style={{ height: `${item.value}%` }}
            />

            <span className="text-xs text-slate-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}