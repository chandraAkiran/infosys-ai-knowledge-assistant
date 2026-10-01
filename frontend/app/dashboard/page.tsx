"use client";

import { useEffect, useState } from "react";
import Pageheader from "@/components/common/Pageheader";
import StateCard from "@/components/dashboard/StateCard";
import QuickAction from "@/components/dashboard/QuickAction";
import ActivityCar from "@/components/dashboard/ActivityCar";
import DashBoardCharts from "@/components/dashboard/DashBoardCharts";
import ProtectedRoute from "@/app/auth/Protected_route";
import { apiRequest } from "@/lib/api";

interface AnalyticsOverview {
  total_queries: number;
  total_feedback: number;
  positive_feedback: number;
  negative_feedback: number;
  total_audit_events: number;
}

const initialAnalytics: AnalyticsOverview = {
  total_queries: 0,
  total_feedback: 0,
  positive_feedback: 0,
  negative_feedback: 0,
  total_audit_events: 0,
};

export default function DashboardPage() {
  const [analytics, setAnalytics] =
    useState<AnalyticsOverview>(initialAnalytics);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const token = localStorage.getItem("enterprise_token");

        if (!token) {
          throw new Error("You are not logged in.");
        }

        const response =
          await apiRequest<AnalyticsOverview>(
            "/analytics/overview",
            {
              method: "GET",
              token,
            }
          );

        setAnalytics(response);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Could not load analytics.";

        setError(message);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  const positiveFeedbackRate =
    analytics.total_feedback > 0
      ? Math.round(
          (analytics.positive_feedback /
            analytics.total_feedback) *
            100
        )
      : 0;

  return (
    <ProtectedRoute>
      <div>
        <Pageheader
          title="Dashboard"
          description="Overview of your knowledge assistant activity."
        />

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StateCard
            title="Questions Asked"
            value={
              loading
                ? "..."
                : analytics.total_queries.toString()
            }
            description="Total recorded queries"
          />

          <StateCard
            title="Positive Feedback"
            value={
              loading
                ? "..."
                : `${positiveFeedbackRate}%`
            }
            description={
              analytics.total_feedback > 0
                ? `${analytics.positive_feedback} positive of ${analytics.total_feedback} total`
                : "No feedback submitted yet"
            }
          />

          <StateCard
            title="Feedback Received"
            value={
              loading
                ? "..."
                : analytics.total_feedback.toString()
            }
            description="Total feedback submissions"
          />

          <StateCard
            title="Audit Events"
            value={
              loading
                ? "..."
                : analytics.total_audit_events.toString()
            }
            description="Recorded backend events"
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <QuickAction
            title="Ask the Assistant"
            description="Search trusted enterprise knowledge and get cited answers."
            href="/chat"
          />

          <QuickAction
            title="Upload Knowledge"
            description="Upload approved documents and monitor indexing status."
            href="/upload"
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-2">
          <ActivityCar />
          <DashBoardCharts />
        </section>
      </div>
    </ProtectedRoute>
  );
}