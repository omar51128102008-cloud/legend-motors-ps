import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Inventory — New & Used Cars",
  description:
    "Browse our full inventory of quality new and used cars in Nablus. Filter by make, model, price, and more. Toyota, Hyundai, Kia, Honda, Volkswagen, and Ford vehicles available.",
};

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
