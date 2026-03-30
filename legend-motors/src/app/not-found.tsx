import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center bg-surface-50">
        <div className="text-center px-4 py-20">
          <p className="text-6xl font-bold text-surface-200 mb-4">404</p>
          <h1 className="text-2xl font-bold text-surface-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-surface-500 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/inventory"
              className="px-6 py-3 border border-surface-200 text-surface-700 rounded-lg font-semibold hover:bg-surface-50 transition-colors"
            >
              Browse Inventory
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
