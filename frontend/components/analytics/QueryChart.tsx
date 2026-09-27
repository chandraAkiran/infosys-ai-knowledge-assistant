const queryData = [
  { day: "Mon", queries: 145 },
  { day: "Tue", queries: 182 },
  { day: "Wed", queries: 164 },
  { day: "Thu", queries: 215 },
  { day: "Fri", queries: 238 },
  { day: "Sat", queries: 176 },
  { day: "Sun", queries: 128 },
];

export default function QueryChart() {
  const maxQueries = Math.max(...queryData.map((item) => item.queries));

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Query Volume
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Number of knowledge assistant queries over the last seven days.
        </p>
      </div>

      <div className="mt-6 flex h-56 items-end gap-3">
        {queryData.map((item) => (
          <div
            key={item.day}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <span className="text-xs font-medium text-slate-600">
              {item.queries}
            </span>

            <div
              className="w-full rounded-t-md bg-slate-800"
              style={{
                height: `${(item.queries / maxQueries) * 100}%`,
              }}
            />

            <span className="text-xs text-slate-500">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}