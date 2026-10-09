import Link from "next/link";

export default function NotFound() { // rendered for any URL with no matching route
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-muted-foreground">This page doesn&apos;t exist.</p> {/* &apos; = escaped ' (React lint rule) */}
      <Link href="/dashboard" className="underline">Back to dashboard</Link>
    </div>
  );
}