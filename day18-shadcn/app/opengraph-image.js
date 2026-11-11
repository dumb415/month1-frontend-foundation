// app/opengraph-image.js
import { ImageResponse } from "next/og"; // ← built-in helper that renders JSX to a PNG on the server

export const alt = "SaaS Dashboard"; // ← becomes og:image:alt (accessibility text)
export const size = { width: 1200, height: 630 }; // ← standard og:image size, don't change
export const contentType = "image/png"; // ← tells Next.js the output format

// ← Special filename: Next.js auto-wires this to <meta property="og:image">.
//   No manual tag needed. "Convention over configuration".
export default function OpengraphImage() {
  return new ImageResponse(
    (
      // ← Only flexbox + inline styles work here (no Tailwind classes)
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",            // ← required for every div with children in ImageResponse
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "white",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex" }}>SaaS Dashboard</div>
        <div style={{ display: "flex", fontSize: 32, color: "#94a3b8", marginTop: 16 }}>
          Next.js · Tailwind · shadcn/ui
        </div>
      </div>
    ),
    { ...size } // ← spread copies width/height into the options object (like struct copy)
  );
}