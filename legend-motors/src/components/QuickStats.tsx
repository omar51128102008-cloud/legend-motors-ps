import { Car, ShieldCheck, Clock, Users } from "lucide-react";

const stats = [
  {
    icon: Car,
    value: "22+",
    label: "Cars in Stock",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Quality Inspected",
  },
  {
    icon: Clock,
    value: "Fast",
    label: "Financing Approval",
  },
  {
    icon: Users,
    value: "500+",
    label: "Happy Customers",
  },
];

export default function QuickStats() {
  return (
    <section className="py-12 sm:py-14 bg-surface-50 border-y border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-surface-900 mb-0.5">
                {stat.value}
              </span>
              <span className="text-sm text-surface-500">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
