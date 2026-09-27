"use client";

import { useState } from "react";

export default function FeedbackControls() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="text-xs text-slate-500">
        Was this helpful?
      </span>

      <button
        type="button"
        onClick={() => setFeedback("up")}
        className={`rounded-md border px-3 py-1 text-sm ${
          feedback === "up"
            ? "border-slate-800 bg-slate-800 text-white"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        }`}
      >
        Helpful
      </button>

      <button
        type="button"
        onClick={() => setFeedback("down")}
        className={`rounded-md border px-3 py-1 text-sm ${
          feedback === "down"
            ? "border-slate-800 bg-slate-800 text-white"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        }`}
      >
        Not helpful
      </button>

      {feedback && (
        <span className="text-xs text-slate-500">
          Thanks for your feedback.
        </span>
      )}
    </div>
  );
}