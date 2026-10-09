import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import WeeklyChart from "@/components/WeeklyChart";
import UsersTable from "@/components/UsersTable";
import { weeklyData, recentUsers } from "@/lib/mock-data";

const STATS = [
  { title: "Total Users", value: "12,480", change: "+12% from last month", icon: Users },
  { title: "Revenue", value: "$48,200", change: "+8% from last month", icon: DollarSign },
  { title: "Active", value: "1,903", change: "+3% from last week", icon: Activity },
  { title: "Growth %", value: "14.2%", change: "+1.1% from last month", icon: TrendingUp },
];

export default function DashboardPage() { 
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <WeeklyChart data={weeklyData} />
        <UsersTable users={recentUsers} />
      </div>
    </div>
  );
}