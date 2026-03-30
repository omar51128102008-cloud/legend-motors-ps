import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Legend Motors PS — Find Your Dream Car in Nablus",
    template: "%s | Legend Motors PS",
  },
  description:
    "Premium new & used cars in Nablus, Palestine. Browse Toyota, Hyundai, Kia, Volkswagen & more. Easy financing, certified pre-owned, and trusted by 500+ customers.",
  keywords: [
    "cars for sale Nablus",
    "used cars Palestine",
    "Legend Motors",
    "Toyota Nablus",
    "Hyundai Palestine",
    "car dealership Nablus",
    "auto finance Palestine",
  ],
  openGraph: {
    title: "Legend Motors PS — Find Your Dream Car in Nablus",
    description:
      "Premium new & used cars. Easy financing. Trusted by 500+ customers in Nablus.",
    type: "website",
    locale: "en_US",
    siteName: "Legend Motors PS",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
