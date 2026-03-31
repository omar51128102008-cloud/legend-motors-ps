"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/inventory?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/inventory");
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface-950 min-h-[520px] sm:min-h-[600px] flex items-center">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-950 to-black" />
        {/* Decorative car silhouette overlay (CSS-only) */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 50% at 70% 60%, rgba(220, 38, 38, 0.15), transparent)`,
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Red accent glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 translate-x-1/4 bg-brand-500/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 sm:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 animate-fade-up opacity-0">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-xs sm:text-sm text-surface-300 font-medium">
              22 Cars Available Now
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 animate-fade-up opacity-0 stagger-1">
            Find Your Dream Car{" "}
            <span className="text-brand-400">in&nbsp;Ramallah</span>
          </h1>

          <p className="text-surface-400 text-base sm:text-lg max-w-xl mb-8 animate-fade-up opacity-0 stagger-2 leading-relaxed">
            Browse premium new and used vehicles from trusted brands. Easy
            financing, certified quality, and a team that puts you first.
          </p>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="animate-fade-up opacity-0 stagger-3"
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, price..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 text-base backdrop-blur-sm transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold text-base transition-colors shadow-lg shadow-brand-500/20 shrink-0"
              >
                Search Cars
              </button>
            </div>
          </form>

          {/* Quick category chips */}
          <div className="flex flex-wrap gap-2 mt-6 animate-fade-up opacity-0 stagger-4">
            {["SUV", "Sedan", "Hybrid", "Truck", "Under $30k"].map(
              (chip) => (
                <button
                  key={chip}
                  onClick={() =>
                    router.push(
                      `/inventory?search=${encodeURIComponent(chip)}`,
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-surface-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  {chip}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-surface-500 animate-bounce">
          <span className="text-xs">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
