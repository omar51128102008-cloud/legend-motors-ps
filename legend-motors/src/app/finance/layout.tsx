import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Car Financing — Easy Approval & Competitive Rates",
  description:
    "Get pre-approved for car financing at Legend Motors PS. Flexible payment plans, competitive rates, and fast approval. Calculate your monthly payments online.",
};

export default function FinanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
