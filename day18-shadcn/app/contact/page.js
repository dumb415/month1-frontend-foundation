import ContactDialog from "@/components/ContactDialog"; // ← NO "use client" here: a Server Component can render a Client Component

export default function ContactPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <ContactDialog />
    </main>
  );
}