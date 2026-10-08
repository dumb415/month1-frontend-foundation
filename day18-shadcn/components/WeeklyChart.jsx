"use client"; // ← REQUIRED: Recharts uses hooks + browser measurement. This marks the server/client boundary.

import {
  LineChart,           // ← the chart container; takes the data array
  Line,                // ← one plotted line
  XAxis,               // ← bottom axis labels
  YAxis,               // ← left axis labels
  CartesianGrid,       // ← background grid lines
  Tooltip,             // ← hover popup
  ResponsiveContainer, // ← makes the chart fill its PARENT's width/height
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WeeklyChart({ data }) { // data comes in as a prop ← keeps the component reusable, no hardcoded import inside
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Active Users</CardTitle>
      </CardHeader>
      <CardContent>
        {/* h-72 ← fixed height (288px). ResponsiveContainer reads its parent's size, so the parent MUST have one. */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%"> {/* "100%" ← fill the h-72 div above */}
            <LineChart data={data}> {/* data={data} ← array of {day, users} objects */}
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /> {/* "3 3" ← 3px dash, 3px gap; var(--border) ← theme color, so dark mode works */}
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} /> {/* dataKey="day" ← read the "day" field from each object */}
              <YAxis stroke="var(--muted-foreground)" fontSize={12} />
              <Tooltip />
              <Line
                type="monotone"        // ← smooth curve between points
                dataKey="users"        // ← read the "users" field for Y values
                stroke="var(--primary)" // ← line color from your shadcn theme
                strokeWidth={2}
                dot={{ r: 4 }}         // ← show a 4px-radius dot on each of the 7 points
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}