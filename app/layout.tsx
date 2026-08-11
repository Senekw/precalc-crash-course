import type { Metadata } from "next";
import { headers } from "next/headers";
import "katex/dist/katex.min.css";
import "./globals.css";

const title = "BC Bridge: 1-Day Precalculus Sprint";
const description =
  "A ruthless one-day precalculus bridge containing only the algebra, function, trigonometry, logarithm, and limit-readiness skills that Calculus BC assumes from day one.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  const origin = protocol + "://" + host;

  return {
    metadataBase: new URL(origin),
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: origin + "/og.png",
          width: 1731,
          height: 909,
          alt: "BC Bridge: one day, 13.5 hours, Precalculus to Calculus BC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [origin + "/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
