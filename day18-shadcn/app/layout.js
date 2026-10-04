import { Geist, Geist_Mono } from "next/font/google"; // Next downloads and self-hosts the font at build time
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// variable: exposes the font as a CSS variable that globals.css can reference
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Acme Dashboard",
  description: "SaaS dashboard template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* template literal injects both variable class names onto <body> so the CSS variables exist */}
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main className="p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}