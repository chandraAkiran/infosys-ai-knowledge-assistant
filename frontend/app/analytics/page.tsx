import AnalyticsCard from "@/components/analytics/AnalyticsCard";
import QueryChart from "@/components/analytics/QueryChart";
import UsageChart from "@/components/analytics/UsageChart";
import FeedbackChart from "@/components/analytics/FeedbackChart";

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Usage & Quality Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor knowledge assistant usage, retrieval quality, and
            employee feedback.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnalyticsCard
            title="Total Queries"
            value="1,248"
            description="Queries processed this month"
          />

          <AnalyticsCard
            title="Avg Response Time"
            value="2.4s"
            description="Average answer generation time"
          />

          <AnalyticsCard
            title="No Answer Rate"
            value="8.2%"
            description="Queries with insufficient evidence"
          />

          <AnalyticsCard
            title="Positive Feedback"
            value="91%"
            description="Responses marked helpful"
          />
        </div>

        {/* Query Volume */}
        <div className="mt-6">
          <QueryChart />
        </div>

        {/* Department + Feedback */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <UsageChart />
          <FeedbackChart />
        </div>

        {/* Retrieval Health */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Retrieval Health
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Current health indicators for the knowledge retrieval pipeline.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Successful Retrievals
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                91.8%
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Source Gaps
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                24
              </p>
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Repeated Questions
              </p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                67
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}