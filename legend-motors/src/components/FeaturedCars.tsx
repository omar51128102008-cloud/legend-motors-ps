"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cars } from "@/lib/cars";
import CarCard from "./CarCard";

export default function FeaturedCars() {
  // Show newest 6 cars
  const featured = [...cars]
    .sort(
      (a, b) =>
        new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime(),
    )
    .slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">
              New Arrivals
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">
              Recently Added Vehicles
            </h2>
          </div>
          <Link
            href="/inventory"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
          >
            View All Inventory
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
