import { Geist, Geist_Mono } from "next/font/google"; // Next downloads and self-hosts the font at build time
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// variable: exposes the font as a CSS variable that globals.css can reference
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Exactly ONE `metadata` export per file (the old "Acme Dashboard" block is removed)
export const metadata = {
  // `metadataBase`: turns relative og:image paths into absolute URLs for social crawlers
  metadataBase: new URL("https://saas-dashboard-woad-pi.vercel.app"),

  title: {
    default: "SaaS Dashboard",       // used when a page sets no title of its own
    template: "%s | SaaS Dashboard", // %s is replaced by a child page's title (like printf)
  },

  description: "A modern SaaS dashboard built with Next.js, Tailwind and shadcn/ui.",

  openGraph: {
    title: "SaaS Dashboard",
    description: "Analytics dashboard built with Next.js 15.",
    type: "website",
    siteName: "SaaS Dashboard",
  },

  twitter: {
    card: "summary_large_image", // large image preview on Twitter/X
  },
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