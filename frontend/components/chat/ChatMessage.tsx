import FeedbackControls from "./FeedbackControls";
import CitationPanel from "./CitationPanel";

interface Citation {
  id: string;
  title: string;
  department: string;
  page: string;
  snippet: string;
  content: string;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  confidence?: string;
  citations?: Citation[];
  onCitationSelect?: (citation: Citation) => void;
}

export default function ChatMessage({
  role,
  content,
  confidence,
  citations,
  onCitationSelect,
}: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`rounded-xl border p-5 ${
        isAssistant
          ? "border-slate-200 bg-white"
          : "border-slate-100 bg-slate-50"
      }`}
    >
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {isAssistant ? "AI Assistant" : "You"}
      </div>

      <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
        {content}
      </p>

      {isAssistant && confidence && (
        <div className="mt-4">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Confidence: {confidence}
          </span>
        </div>
      )}

      {isAssistant && citations && citations.length > 0 && onCitationSelect && (
        <CitationPanel
          citations={citations}
          onSelect={onCitationSelect}
        />
      )}

      {isAssistant && <FeedbackControls />}
    </div>
  );
}