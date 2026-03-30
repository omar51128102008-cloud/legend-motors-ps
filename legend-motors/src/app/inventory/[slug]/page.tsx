"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import FinanceCalculator from "@/components/FinanceCalculator";
import LeadModal from "@/components/LeadModal";
import CarCard from "@/components/CarCard";
import { cars } from "@/lib/cars";
import { formatPrice, formatMileage, addToRecentlyViewed } from "@/lib/utils";
import {
  ChevronRight,
  Phone,
  MessageCircle,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Palette,
  ShieldCheck,
  BadgeCheck,
  Check,
  Share2,
  Heart,
} from "lucide-react";

interface VDPProps {
  params: Promise<{ slug: string }>;
}

export default function VehicleDetailPage({ params }: VDPProps) {
  const { slug } = use(params);
  const car = cars.find((c) => c.slug === slug);

  const [activeTab, setActiveTab] = useState<"specs" | "features" | "description">("specs");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Get a Quote");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (car) addToRecentlyViewed(car.id);
  }, [car]);

  if (!car) return notFound();

  const isDiscounted = car.originalPrice && car.originalPrice > car.price;

  // Similar cars (same bodyType, different car)
  const similarCars = cars
    .filter((c) => c.id !== car.id && (c.bodyType === car.bodyType || c.make === car.make))
    .slice(0, 3);

  const openModal = (title: string) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  // Vehicle JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: car.title,
    brand: { "@type": "Brand", name: car.make },
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: car.mileage,
      unitCode: "SMI",
    },
    fuelType: car.fuel,
    vehicleTransmission: car.transmission,
    color: car.color,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: "Legend Motors PS",
      },
    },
    image: car.photos[0],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-surface-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-surface-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <nav
              className="flex items-center gap-1.5 text-sm text-surface-500"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-surface-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/inventory" className="hover:text-surface-700 transition-colors">
                Inventory
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-surface-900 font-medium truncate">
                {car.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* ─── Left: Gallery + Details ─── */}
            <div className="lg:col-span-3 space-y-6">
              {/* Gallery */}
              <ImageGallery photos={car.photos} title={car.title} />

              {/* Tabs */}
              <div className="bg-white rounded-2xl border border-surface-200 overflow-hidden">
                <div className="flex border-b border-surface-100">
                  {(["specs", "features", "description"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3.5 text-sm font-medium transition-colors capitalize ${
                        activeTab === tab
                          ? "text-brand-600 border-b-2 border-brand-500 bg-brand-50/30"
                          : "text-surface-500 hover:text-surface-700"
                      }`}
                    >
                      {tab === "specs" ? "Specifications" : tab}
                    </button>
                  ))}
                </div>

                <div className="p-5 sm:p-6">
                  {activeTab === "specs" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "Engine", value: car.specs.engine },
                        { label: "Horsepower", value: `${car.specs.horsepower} hp` },
                        { label: "Torque", value: car.specs.torque },
                        { label: "Fuel Economy", value: car.specs.fuelEconomy },
                        { label: "Drivetrain", value: car.specs.drivetrain },
                        { label: "Transmission", value: car.transmission },
                        { label: "Seating", value: `${car.specs.seating} passengers` },
                        { label: "Cargo", value: car.specs.cargo },
                        { label: "Dimensions", value: car.specs.dimensions },
                        { label: "Weight", value: car.specs.weight },
                      ].map((spec) => (
                        <div
                          key={spec.label}
                          className="flex justify-between items-baseline py-2.5 border-b border-surface-50"
                        >
                          <span className="text-sm text-surface-500">
                            {spec.label}
                          </span>
                          <span className="text-sm font-medium text-surface-800 text-right">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "features" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {car.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-2.5 py-2"
                        >
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          <span className="text-sm text-surface-700">{f}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "description" && (
                    <div className="prose prose-sm max-w-none text-surface-600 leading-relaxed">
                      <p>{car.description}</p>
                      <h4 className="text-surface-900 font-semibold mt-4 mb-2">
                        Key Highlights
                      </h4>
                      <ul className="space-y-1">
                        <li>{car.specs.engine} with {car.specs.horsepower} hp</li>
                        <li>{car.specs.fuelEconomy}</li>
                        <li>{car.specs.drivetrain} drivetrain</li>
                        <li>Seating for {car.specs.seating}</li>
                        <li>{car.warranty}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Finance Calculator */}
              <FinanceCalculator
                vehiclePrice={car.price}
                onGetPreApproved={() => openModal("Get Pre-Approved")}
              />
            </div>

            {/* ─── Right: Info + CTAs ─── */}
            <div className="lg:col-span-2 space-y-4">
              {/* Sticky panel */}
              <div className="lg:sticky lg:top-24 space-y-4">
                {/* Main info card */}
                <div className="bg-white rounded-2xl border border-surface-200 p-5 sm:p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-surface-100 text-xs font-medium text-surface-600">
                      {car.condition}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-surface-100 text-xs font-medium text-surface-600">
                      {car.year}
                    </span>
                    {car.certified && (
                      <span className="px-2.5 py-1 rounded-md bg-green-50 text-xs font-semibold text-green-700 flex items-center gap-1">
                        <BadgeCheck className="w-3.5 h-3.5" /> Certified
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-surface-900 mb-2 leading-tight">
                    {car.title}
                  </h1>

                  {/* Price */}
                  <div className="mb-4">
                    {isDiscounted && (
                      <span className="text-sm text-surface-400 line-through mr-2">
                        {formatPrice(car.originalPrice!)}
                      </span>
                    )}
                    <span className="text-2xl sm:text-3xl font-bold text-surface-900">
                      {formatPrice(car.price)}
                    </span>
                    {isDiscounted && (
                      <span className="ml-2 text-sm font-semibold text-green-600">
                        Save {formatPrice(car.originalPrice! - car.price)}
                      </span>
                    )}
                  </div>

                  {/* Quick specs */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { icon: Gauge, label: "Mileage", value: formatMileage(car.mileage) },
                      { icon: Fuel, label: "Fuel", value: car.fuel },
                      { icon: Settings2, label: "Trans", value: car.transmission },
                      { icon: Palette, label: "Color", value: car.color },
                      { icon: Calendar, label: "Year", value: String(car.year) },
                      { icon: ShieldCheck, label: "Warranty", value: "Yes" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-2.5 p-2.5 bg-surface-50 rounded-lg"
                      >
                        <s.icon className="w-4 h-4 text-surface-400 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[11px] text-surface-400">{s.label}</p>
                          <p className="text-xs font-medium text-surface-700 truncate">
                            {s.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Trust badge */}
                  {car.warranty && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-sm text-green-800 mb-5">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      {car.warranty}
                    </div>
                  )}

                  {/* Primary CTAs */}
                  <div className="space-y-2.5">
                    <button
                      onClick={() => openModal("Inquire About This Vehicle")}
                      className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors text-sm"
                    >
                      Inquire Now
                    </button>
                    <button
                      onClick={() => openModal("Schedule a Test Drive")}
                      className="w-full py-3.5 bg-surface-900 hover:bg-surface-800 text-white rounded-xl font-semibold transition-colors text-sm"
                    >
                      Schedule Test Drive
                    </button>
                    <div className="grid grid-cols-2 gap-2.5">
                      <a
                        href="tel:+970599000000"
                        className="flex items-center justify-center gap-2 py-3 border border-surface-200 rounded-xl text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors"
                      >
                        <Phone className="w-4 h-4" /> Call
                      </a>
                      <a
                        href={`https://wa.me/970599000000?text=Hi, I'm interested in the ${car.title} (${formatPrice(car.price)})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 border border-green-200 bg-green-50 rounded-xl text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Secondary actions */}
                  <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-surface-100">
                    <button
                      onClick={() => openModal("Value My Trade-In")}
                      className="text-xs text-surface-500 hover:text-brand-600 font-medium transition-colors"
                    >
                      Value My Trade-In
                    </button>
                    <span className="w-1 h-1 rounded-full bg-surface-300" />
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: car.title, url: window.location.href });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs text-surface-500 hover:text-brand-600 font-medium transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Share
                    </button>
                    <span className="w-1 h-1 rounded-full bg-surface-300" />
                    <button
                      onClick={() => setSaved(!saved)}
                      className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        saved ? "text-brand-500" : "text-surface-500 hover:text-brand-600"
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${saved ? "fill-brand-500" : ""}`}
                      />{" "}
                      {saved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Cars */}
          {similarCars.length > 0 && (
            <section className="mt-12 sm:mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-surface-900 mb-6">
                Similar Vehicles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {similarCars.map((c) => (
                  <CarCard key={c.id} car={c} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        carInterest={car.title}
      />
    </>
  );
}
