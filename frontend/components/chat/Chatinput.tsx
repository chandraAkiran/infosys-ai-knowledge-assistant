"use client";

import { FormEvent, useState } from "react";

interface ChatinputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
}

export default function Chatinput({
  onSubmit,
  disabled = false,
}: ChatinputProps) {
  const [question, setQuestion] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    onSubmit(trimmedQuestion);
    setQuestion("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"
    >
      <input
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Ask a question about enterprise knowledge..."
        disabled={disabled}
        className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={disabled}
        className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {disabled ? "Thinking..." : "Send"}
      </button>
    </form>
  );
}