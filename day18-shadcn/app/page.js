import { redirect } from "next/navigation"; // server-side redirect helper

export default function Home() {
  redirect("/dashboard"); // visiting "/" instantly sends the browser to /dashboard
}