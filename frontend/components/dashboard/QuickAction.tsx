import Link from "next/link";

interface QuickActionProps {
  title: string;
  description: string;
  href: string;
}

export default function QuickAction({
  title,
  description,
  href,
}: QuickActionProps) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
    >
      <h3 className="text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

      <span className="mt-4 inline-block text-sm font-medium text-slate-700">
        Open →
      </span>
    </Link>
  );
}