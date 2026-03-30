import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-950 text-surface-300">
      {/* CTA Banner */}
      <div className="bg-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-brand-100 mb-6 max-w-lg mx-auto text-sm sm:text-base">
            Browse our inventory or talk to our team. We&apos;re here to help
            you drive away happy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/inventory"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-brand-600 rounded-lg font-semibold hover:bg-surface-50 transition-colors"
            >
              Browse Inventory
            </Link>
            <a
              href="tel:+970599000000"
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Call +970 599 000 000
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white font-bold text-base">L</span>
              </div>
              <span className="font-bold text-lg text-white">
                Legend Motors PS
              </span>
            </div>
            <p className="text-sm text-surface-400 mb-5 leading-relaxed">
              Your trusted destination for quality new and used vehicles in
              Nablus. We make car buying simple, transparent, and enjoyable.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/970599000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-green-600 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/inventory", label: "Browse Cars" },
                { href: "/finance", label: "Finance Options" },
                { href: "/contact", label: "Contact Us" },
                { href: "/inventory?condition=New", label: "New Arrivals" },
                {
                  href: "/inventory?condition=Certified+Pre-Owned",
                  label: "Certified Pre-Owned",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Makes */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Popular Makes
            </h3>
            <ul className="space-y-2.5">
              {["Toyota", "Hyundai", "Kia", "Honda", "Volkswagen", "Ford"].map(
                (make) => (
                  <li key={make}>
                    <Link
                      href={`/inventory?make=${make}`}
                      className="text-sm text-surface-400 hover:text-white transition-colors"
                    >
                      {make}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" />
                <span className="text-sm">
                  Main Street, Nablus
                  <br />
                  Palestine
                </span>
              </li>
              <li>
                <a
                  href="tel:+970599000000"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                  +970 599 000 000
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@legendmotorsps.com"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                  info@legendmotorsps.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Clock className="w-4 h-4 text-brand-400 shrink-0" />
                Sat–Thu: 9AM–7PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-surface-500">
          <p>&copy; {new Date().getFullYear()} Legend Motors PS. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-surface-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-surface-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
