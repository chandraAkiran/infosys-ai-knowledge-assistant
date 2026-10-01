import Pageheader from "@/components/common/Pageheader";
import StateCard from "@/components/dashboard/StateCard";
import QuickAction from "@/components/dashboard/QuickAction";
import ActivityCar from "@/components/dashboard/ActivityCar";
import DashBoardCharts from "@/components/dashboard/DashBoardCharts";
import ProtectedRoute from "@/app/auth/Protected_route";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>
        <Pageheader
          title="Dashboard"
          description="Overview of your knowledge assistant activity."
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StateCard
            title="Questions Asked"
            value="128"
            description="This month"
          />

          <StateCard
            title="Helpful Answers"
            value="92%"
            description="Based on recent feedback"
          />

          <StateCard
            title="Knowledge Sources"
            value="48"
            description="Available documents"
          />

          <StateCard
            title="Recent Searches"
            value="14"
            description="In the last 7 days"
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