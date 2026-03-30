import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat("en-US").format(mileage) + " mi";
}

export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  months: number,
): number {
  if (annualRate === 0) return principal / months;
  const monthlyRate = annualRate / 100 / 12;
  return (
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("lm-recently-viewed") || "[]");
  } catch {
    return [];
  }
}

export function addToRecentlyViewed(carId: string): void {
  if (typeof window === "undefined") return;
  try {
    const current = getRecentlyViewed().filter((id) => id !== carId);
    current.unshift(carId);
    localStorage.setItem(
      "lm-recently-viewed",
      JSON.stringify(current.slice(0, 10)),
    );
  } catch {
    // localStorage not available
  }
}

export function saveLeadToStorage(lead: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    const leads = JSON.parse(localStorage.getItem("lm-leads") || "[]");
    leads.push({ ...lead, timestamp: new Date().toISOString() });
    localStorage.setItem("lm-leads", JSON.stringify(leads));
    console.log("✅ Lead saved:", lead);
  } catch {
    console.log("Lead (localStorage unavailable):", lead);
  }
}
