interface AnalyticsCardProps {
  title: string;
  value: string;
  description: string;
}

export default function AnalyticsCard({
  title,
  value,
  description,
}: AnalyticsCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>

      <p className="mt-2 text-2xl font-semibold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}
