import { ShieldCheck, BadgeCheck, Wallet, Headphones, RotateCcw, Truck } from "lucide-react";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Certified Quality",
    desc: "Every vehicle undergoes a rigorous multi-point inspection before it reaches our lot.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Protection",
    desc: "Comprehensive warranty options on all vehicles so you drive with complete confidence.",
  },
  {
    icon: Wallet,
    title: "Easy Financing",
    desc: "Flexible payment plans and fast pre-approval. We work with your budget to find the best rates.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Our team is available 6 days a week to answer questions and help after your purchase.",
  },
  {
    icon: RotateCcw,
    title: "Hassle-Free Trade-In",
    desc: "Get a fair, transparent value for your current vehicle — applied directly to your new purchase.",
  },
  {
    icon: Truck,
    title: "Delivery Available",
    desc: "Can't visit? We offer convenient delivery options to bring the car directly to you.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">
            Why Legend Motors
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">
            The Legend Motors Difference
          </h2>
          <p className="text-surface-500 mt-3 max-w-lg mx-auto text-sm sm:text-base">
            We&apos;re committed to making your car buying experience
            transparent, enjoyable, and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="group p-6 rounded-2xl border border-surface-100 hover:border-brand-200 hover:shadow-md transition-all duration-300 bg-white"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 group-hover:bg-brand-500 text-brand-500 group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                <r.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-surface-900 mb-2">{r.title}</h3>
              <p className="text-sm text-surface-500 leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
