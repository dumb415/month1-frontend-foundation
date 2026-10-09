export default function DashboardLoading() { // filename must be exactly loading.js; export name is free
  return (
    <div className="space-y-4">
      <div className="h-8 w-48 animate-pulse rounded-md bg-muted" /> {/* animate-pulse = built-in fade loop */}
      <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
      <div className="h-32 animate-pulse rounded-md bg-muted" />
    </div>
  );
}