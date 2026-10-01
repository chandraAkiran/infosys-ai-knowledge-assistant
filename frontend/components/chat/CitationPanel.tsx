interface Citation {
  id: string;
  title: string;
  department: string;
  page: string;
  snippet: string;
  content: string;
}

interface CitationPanelProps {
  citations: Citation[];
  onSelect: (citation: Citation) => void;
}

export default function CitationPanel({
  citations,
  onSelect,
}: CitationPanelProps) {
  return (
    <div className="mt-5">
      <h3 className="mb-3 text-sm font-semibold text-slate-900">
        Sources
      </h3>

      <div className="space-y-3">
        {citations.map((citation, index) => (
          <button
            key={
              citation.id ||
              citation.title ||
              `citation-${index}`
            }
            type="button"
            onClick={() => onSelect(citation)}
            className="block w-full rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {citation.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {citation.department} • {citation.page}
                </p>
              </div>

              <span className="text-xs font-medium text-slate-600">
                Open
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {citation.snippet}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}