interface SuggestedPromptProps {
  text: string;
  onSelect: (text: string) => void;
}

export default function SuggestedPrompt({
  text,
  onSelect,
}: SuggestedPromptProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(text)}
      className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-left text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
    >
      {text}
    </button>
  );
}