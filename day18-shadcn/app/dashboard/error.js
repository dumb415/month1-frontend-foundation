"use client"; // MANDATORY: error boundaries must be Client Components

import { Button } from "@/components/ui/button"; // shadcn, from Day 18

export default function DashboardError({ error, reset }) { // named DashboardError, not Error: avoids shadowing the global Error class
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message}</p> {/* the message from the thrown Error */}
      <Button onClick={reset}>Try again</Button> {/* reset() re-renders the segment = retry */}
    </div>
  );
}