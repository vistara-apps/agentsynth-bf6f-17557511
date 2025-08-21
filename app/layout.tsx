import "./globals.css";
import "@coinbase/onchainkit/styles.css";
import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AgentSynth",
  description: "Synthesize your thoughts, amplify your content.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "/api/og",
      button: {
        title: "Launch AgentSynth",
        action: {
          type: "launch_frame",
          name: "AgentSynth",
          url: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
          splashImageUrl: "/api/og",
          splashBackgroundColor: "#f1f5f9",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
