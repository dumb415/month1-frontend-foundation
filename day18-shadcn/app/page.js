import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";

// Mock data lives outside the component: not rebuilt on every render, easy to swap for an API later
const STATS = [
  { title: "Total Users", value: "12,480", change: "+12% from last month", icon: Users },
  { title: "Revenue", value: "$48,200", change: "+8% from last month", icon: DollarSign },
  { title: "Active", value: "1,903", change: "+3% from last week", icon: Activity },
  { title: "Growth", value: "14.2%", change: "+1.1% from last month", icon: TrendingUp },
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
    </div>
  );
}