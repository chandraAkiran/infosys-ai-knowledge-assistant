interface SourcePreviewProps {
  title: string;
  department: string;
  page: string;
  content: string;
  onClose: () => void;
}

export default function SourcePreview({
  title,
  department,
  page,
  content,
  onClose,
}: SourcePreviewProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Source Preview
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {department} • {page}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
        >
          Close
        </button>
      </div>

      <div className="mt-5 rounded-lg bg-slate-50 p-4">
        <p className="text-sm leading-6 text-slate-700">
          {content}
        </p>
      </div>
    </div>
  );
}