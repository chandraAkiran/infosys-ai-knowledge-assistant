"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";

interface FeedbackControlsProps {
  query: string;
}

export default function FeedbackControls({
  query,
}: FeedbackControlsProps) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitFeedback(
    selectedFeedback: "up" | "down"
  ) {
    if (submitting || feedback) {
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      await apiRequest("/feedback", {
        method: "POST",
        token,
        body: JSON.stringify({
          query,
          rating: selectedFeedback === "up" ? 5 : 1,
        }),
      });

      setFeedback(selectedFeedback);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not submit feedback.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <span className="text-xs text-slate-500">
        Was this helpful?
      </span>

      <button
        type="button"
        disabled={submitting || feedback !== null}
        onClick={() => submitFeedback("up")}
        className={`rounded-md border px-3 py-1 text-sm ${
          feedback === "up"
            ? "border-slate-800 bg-slate-800 text-white"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        Helpful
      </button>

      <button
        type="button"
        disabled={submitting || feedback !== null}
        onClick={() => submitFeedback("down")}
        className={`rounded-md border px-3 py-1 text-sm ${
          feedback === "down"
            ? "border-slate-800 bg-slate-800 text-white"
            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
        } disabled:cursor-not-allowed disabled:opacity-60`}
      >
        Not helpful
      </button>

      {submitting && (
        <span className="text-xs text-slate-500">
          Submitting...
        </span>
      )}

      {feedback && !submitting && (
        <span className="text-xs text-slate-500">
          Thanks for your feedback.
        </span>
      )}

      {error && (
        <span className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}