"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/cars";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="py-16 sm:py-20 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">
            What Our Customers Say
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-surface-100 text-center relative">
            <Quote className="w-10 h-10 text-brand-100 mx-auto mb-5" />

            <p className="text-surface-700 text-base sm:text-lg leading-relaxed mb-6 min-h-[4.5rem]">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-surface-200"}`}
                />
              ))}
            </div>

            {/* Name */}
            <div>
              <div className="w-10 h-10 rounded-full bg-surface-200 mx-auto mb-2 flex items-center justify-center text-surface-500 font-bold text-sm">
                {t.name.charAt(0)}
              </div>
              <p className="font-semibold text-surface-900">{t.name}</p>
              <p className="text-sm text-surface-500">{t.car}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-surface-200 hover:border-surface-300 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-surface-600" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? "bg-brand-500 w-5" : "bg-surface-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-surface-200 hover:border-surface-300 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-surface-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
