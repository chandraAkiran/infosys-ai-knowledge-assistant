interface ActivityItem {
  question: string;
  department: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    question: "What is the Severity 1 incident escalation process?",
    department: "Engineering",
    time: "Today, 10:30 AM",
  },
  {
    question: "How many annual leaves are available?",
    department: "HR",
    time: "Yesterday, 4:15 PM",
  },
  {
    question: "What is the cloud transformation framework?",
    department: "Sales",
    time: "Yesterday, 11:20 AM",
  },
];

export default function ActivityCar() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Activity
        </h2>

        <p className="text-sm text-slate-500">
          Your recent knowledge assistant queries.
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
          >
            <p className="text-sm font-medium text-slate-800">
              {activity.question}
            </p>

            <div className="mt-1 flex gap-3 text-xs text-slate-500">
              <span>{activity.department}</span>
              <span>•</span>
              <span>{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
