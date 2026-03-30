"use client";

import Link from "next/link";
import Image from "next/image";
import { Fuel, Gauge, Settings2, Calendar, BadgeCheck } from "lucide-react";
import { Car } from "@/lib/types";
import { formatPrice, formatMileage } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  layout?: "grid" | "list";
}

export default function CarCard({ car, layout = "grid" }: CarCardProps) {
  const isDiscounted = car.originalPrice && car.originalPrice > car.price;

  if (layout === "list") {
    return (
      <Link
        href={`/inventory/${car.slug}`}
        className="group flex flex-col sm:flex-row bg-white border border-surface-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-surface-300 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative sm:w-72 lg:w-80 h-48 sm:h-auto shrink-0 overflow-hidden bg-surface-100">
          <Image
            src={car.photos[0]}
            alt={car.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, 320px"
          />
          {car.certified && (
            <span className="absolute top-3 left-3 flex items-center gap-1 bg-green-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
              <BadgeCheck className="w-3.5 h-3.5" /> Certified
            </span>
          )}
          {isDiscounted && (
            <span className="absolute top-3 right-3 bg-brand-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
              SAVE {formatPrice(car.originalPrice! - car.price)}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-lg text-surface-900 group-hover:text-brand-600 transition-colors leading-tight">
                {car.title}
              </h3>
            </div>
            <p className="text-sm text-surface-500 mb-3 line-clamp-2">
              {car.description}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-surface-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {car.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4" /> {formatMileage(car.mileage)}
              </span>
              <span className="flex items-center gap-1.5">
                <Fuel className="w-4 h-4" /> {car.fuel}
              </span>
              <span className="flex items-center gap-1.5">
                <Settings2 className="w-4 h-4" /> {car.transmission}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <div>
              {isDiscounted && (
                <span className="text-sm text-surface-400 line-through mr-2">
                  {formatPrice(car.originalPrice!)}
                </span>
              )}
              <span className="text-xl font-bold text-surface-900">
                {formatPrice(car.price)}
              </span>
            </div>
            <span className="text-sm font-semibold text-brand-600 group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/inventory/${car.slug}`}
      className="group bg-white border border-surface-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-surface-300 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-100">
        <Image
          src={car.photos[0]}
          alt={car.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {car.certified && (
          <span className="absolute top-3 left-3 flex items-center gap-1 bg-green-600 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
            <BadgeCheck className="w-3.5 h-3.5" /> Certified
          </span>
        )}
        {isDiscounted && (
          <span className="absolute top-3 right-3 bg-brand-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
            SAVE {formatPrice(car.originalPrice! - car.price)}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-base text-surface-900 group-hover:text-brand-600 transition-colors mb-1 leading-tight">
          {car.title}
        </h3>

        {/* Specs row */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-surface-500 mb-3">
          <span className="flex items-center gap-1">
            <Gauge className="w-3.5 h-3.5" /> {formatMileage(car.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="w-3.5 h-3.5" /> {car.fuel}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="w-3.5 h-3.5" /> {car.transmission}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-surface-100 flex items-end justify-between">
          <div>
            {isDiscounted && (
              <span className="text-xs text-surface-400 line-through block">
                {formatPrice(car.originalPrice!)}
              </span>
            )}
            <span className="text-lg font-bold text-surface-900">
              {formatPrice(car.price)}
            </span>
          </div>
          <span className="text-xs font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
