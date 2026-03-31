import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturedCars from "@/components/FeaturedCars";
import QuickStats from "@/components/QuickStats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Legend Motors PS",
  description:
    "Premium new and used car dealership in Ramallah, Palestine. Browse Toyota, Hyundai, Kia, and more.",
  url: "https://legendmotorsps.com",
  telephone: "+970599000000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Street",
    addressLocality: "Ramallah",
    addressCountry: "PS",
  },
  openingHours: "Sa-Th 09:00-19:00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "500",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <HeroSection />
        <QuickStats />
        <FeaturedCars />
        <WhyChooseUs />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
