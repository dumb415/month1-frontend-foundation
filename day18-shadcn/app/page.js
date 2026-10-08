import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import WeeklyChart from "@/components/WeeklyChart"; // NEW: Client Component (has "use client" inside its own file)
import UsersTable from "@/components/UsersTable"; // NEW: Server Component, just renders rows
import { weeklyData, recentUsers } from "@/lib/mock-data"; // NEW: named imports ← names must match the exports exactly

// Mock data lives outside the component: not rebuilt on every render, easy to swap for an API later
const STATS = [
  { title: "Total Users", value: "12,480", change: "+12% from last month", icon: Users },
  { title: "Revenue", value: "$48,200", change: "+8% from last month", icon: DollarSign },
  { title: "Active", value: "1,903", change: "+3% from last week", icon: Activity },
  { title: "Growth %", value: "14.2%", change: "+1.1% from last month", icon: TrendingUp }, // title changed to match the plan's "Growth %"
];

export default function DashboardPage() {
  return (
    <div className="space-y-6"> {/* space-y-6 = vertical gap between direct children */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* mobile-first: 1 col -> 2 cols (sm) -> 4 cols (lg) */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} /> // {...stat} = spread: passes every field as a prop
        ))}
      </div>

      {/* NEW row: chart + table, stacked on mobile, side by side from lg up */}
      <div className="grid gap-6 lg:grid-cols-2">
        <WeeklyChart data={weeklyData} /> {/* data={weeklyData} ← array of 7 {day, users} objects, passed as a prop */}
        <UsersTable users={recentUsers} /> {/* users={recentUsers} ← array of 5 user objects */}
      </div>
    </div>
  );
}