const departmentData = [
  { department: "Engineering", queries: 420 },
  { department: "HR", queries: 265 },
  { department: "Delivery", queries: 238 },
  { department: "PMO", queries: 185 },
  { department: "Sales", queries: 140 },
];

export default function UsageChart() {
  const maxQueries = Math.max(
    ...departmentData.map((item) => item.queries)
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Department Usage
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Query activity by department.
      </p>

      <div className="mt-6 space-y-5">
        {departmentData.map((item) => (
          <div key={item.department}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-slate-700">
                {item.department}
              </span>

              <span className="text-slate-500">
                {item.queries}
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-slate-700"
                style={{
                  width: `${(item.queries / maxQueries) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}