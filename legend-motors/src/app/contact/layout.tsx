import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Visit Legend Motors PS in Ramallah",
  description:
    "Contact Legend Motors PS in Ramallah, Palestine. Call, WhatsApp, or visit our showroom. Our team is ready to help you find the perfect car.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
