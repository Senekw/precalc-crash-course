import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "BC Bridge — 3-Day Precalculus Sprint";
const description =
  "A ruthless 30-hour precalculus bridge containing only the algebra, functions, trigonometry, logarithms, parametric, polar, sequence, and limit skills required for Calculus BC.";

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
          alt: "BC Bridge — 3 days, 30 hours, Precalculus to Calculus BC",
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
