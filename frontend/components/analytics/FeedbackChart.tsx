const feedbackData = [
  { label: "Helpful", value: 91 },
  { label: "Not Helpful", value: 9 },
];

export default function FeedbackChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">
        Feedback Quality
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Employee feedback on assistant responses.
      </p>

      <div className="mt-6 space-y-5">
        {feedbackData.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium text-slate-700">
                {item.label}
              </span>

              <span className="text-slate-500">
                {item.value}%
              </span>
            </div>

            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-slate-800"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-slate-50 p-4">
        <p className="text-sm text-slate-600">
          Current positive feedback rate
        </p>

        <p className="mt-1 text-2xl font-semibold text-slate-900">
          91%
        </p>
      </div>
    </div>
  );
}