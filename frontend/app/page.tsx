import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
          Infosys
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          AI Knowledge Assistant
        </h1>

        <p className="mt-4 text-slate-600">
          Search trusted enterprise knowledge, review cited answers,
          and explore the sources behind every response.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
          >
            Open Dashboard
          </Link>

          <Link
            href="/chat"
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Ask Assistant
          </Link>
        </div>
      </div>
    </main>
  );
}