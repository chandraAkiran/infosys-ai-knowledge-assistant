"use client";

import { useState } from "react";
import ChatMessage from "./ChatMessage";
import Chatinput from "./Chatinput";
import SuggestedPrompt from "./SuggestedPrompt";
import SourcePreview from "@/components/citation/SourcePreview";

interface Citation {
  id: string;
  title: string;
  department: string;
  page: string;
  snippet: string;
  content: string;
}

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  confidence?: string;
  citations?: Citation[];
}

const sampleCitations: Citation[] = [
  {
    id: "source-1",
    title: "Infosys Severity 1 Incident Escalation SOP",
    department: "Engineering",
    page: "Page 4",
    snippet:
      "Severity 1 incidents require immediate escalation to the incident commander and designated support teams.",
    content:
      "For a Severity 1 incident, the incident commander should be notified immediately. The designated support teams must be engaged according to the escalation matrix. Incident status should be communicated through the approved incident management process.",
  },
  {
    id: "source-2",
    title: "Infosys Microservices Architecture Specification",
    department: "Engineering",
    page: "Page 12",
    snippet:
      "The architecture guide describes service ownership and operational responsibilities.",
    content:
      "Each service should have clear ownership, documented operational responsibilities, and defined escalation paths.",
  },
];

const initialMessage: Message = {
  id: 1,
  role: "assistant",
  content:
    "Hello! I can help you search trusted enterprise knowledge. Ask me about policies, engineering guides, project manuals, SOPs, or other approved sources.",
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    initialMessage,
  ]);

  const [department, setDepartment] = useState("All Departments");
  const [loading, setLoading] = useState(false);
  const [selectedSource, setSelectedSource] =
    useState<Citation | null>(null);

  function handleQuestion(question: string) {
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((current) => [...current, userMessage]);
    setLoading(true);
    setSelectedSource(null);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "Based on the available enterprise sources, a Severity 1 incident should be escalated immediately through the approved incident management process. The incident commander and designated support teams should be engaged according to the escalation procedure.",
        confidence: "High",
        citations: sampleCitations,
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

      setLoading(false);
    }, 700);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Knowledge Search
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search approved enterprise sources and review cited answers.
          </p>
        </div>

        <select
          value={department}
          onChange={(event) => setDepartment(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
        >
          <option>All Departments</option>
          <option>HR</option>
          <option>Engineering</option>
          <option>Delivery Operations</option>
          <option>PMO</option>
          <option>Sales</option>
        </select>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            confidence={message.confidence}
            citations={message.citations}
            onCitationSelect={setSelectedSource}
          />
        ))}

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Searching trusted enterprise knowledge...
            </p>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div>
          <p className="mb-3 text-sm font-medium text-slate-700">
            Try a suggested question
          </p>

          <div className="grid gap-3 md:grid-cols-3">
            <SuggestedPrompt
              text="What is the Severity 1 incident process?"
              onSelect={handleQuestion}
            />

            <SuggestedPrompt
              text="How many annual leaves are available?"
              onSelect={handleQuestion}
            />

            <SuggestedPrompt
              text="What is the cloud transformation framework?"
              onSelect={handleQuestion}
            />
          </div>
        </div>
      )}

      {selectedSource && (
        <SourcePreview
          title={selectedSource.title}
          department={selectedSource.department}
          page={selectedSource.page}
          content={selectedSource.content}
          onClose={() => setSelectedSource(null)}
        />
      )}

      <Chatinput
        onSubmit={handleQuestion}
        disabled={loading}
      />
    </div>
  );
}