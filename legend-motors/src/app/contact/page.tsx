"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  Loader2,
  Send,
} from "lucide-react";
import { saveLeadToStorage } from "@/lib/utils";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(7, "Valid phone number required")
    .regex(/^[\d\s+\-()]+$/, "Invalid phone number"),
  email: z.string().email("Valid email required"),
  carInterest: z.string().optional(),
  message: z.string().min(5, "Please enter a message"),
});

type ContactForm = z.infer<typeof contactSchema>;

const team = [
  { name: "Fadi Mansour", role: "General Manager", initials: "FM" },
  { name: "Nour Abed", role: "Sales Director", initials: "NA" },
  { name: "Khaled Saeed", role: "Finance Manager", initials: "KS" },
  { name: "Dana Hasan", role: "Customer Relations", initials: "DH" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "+970 ",
      email: "",
      carInterest: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    saveLeadToStorage({ ...data, source: "contact-page" });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-surface-950 text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-surface-400 max-w-xl mx-auto text-sm sm:text-base">
              Whether you have a question about a vehicle, need financing help,
              or want to schedule a visit — our team is ready to assist.
            </p>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Left: Info + Map */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact cards */}
                <div className="space-y-4">
                  <a
                    href="tel:+970599000000"
                    className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl hover:bg-surface-100 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">
                        Call Us
                      </p>
                      <p className="text-sm text-surface-500">
                        +970 599 000 000
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/970599000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">
                        WhatsApp
                      </p>
                      <p className="text-sm text-surface-500">
                        Message us anytime
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@legendmotorsps.com"
                    className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl hover:bg-surface-100 transition-colors group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">
                        Email
                      </p>
                      <p className="text-sm text-surface-500">
                        info@legendmotorsps.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl">
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">
                        Location
                      </p>
                      <p className="text-sm text-surface-500">
                        Main Street, Nablus, Palestine
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-surface-50 rounded-xl">
                    <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-surface-900">
                        Hours
                      </p>
                      <p className="text-sm text-surface-500">
                        Sat–Thu: 9:00 AM – 7:00 PM
                      </p>
                      <p className="text-xs text-surface-400">
                        Friday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden border border-surface-200 aspect-[4/3]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53885.19764963!2d35.235!3d32.221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ce0e42f6517c5%3A0x35dad0f577e1ca1c!2sNablus!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Legend Motors PS Location"
                  />
                </div>
              </div>

              {/* Right: Form */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-surface-200 rounded-2xl p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-surface-900 mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-surface-500 mb-6">
                    Fill out the form below and we&apos;ll get back to you
                    within 1 hour during business hours.
                  </p>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-surface-900 mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-surface-500 max-w-md mx-auto">
                        Thank you for reaching out. A member of our team will
                        contact you shortly. For urgent inquiries, please call us
                        directly.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            Full Name <span className="text-brand-500">*</span>
                          </label>
                          <input
                            {...register("fullName")}
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-surface-700 mb-1.5">
                            Phone <span className="text-brand-500">*</span>
                          </label>
                          <input
                            {...register("phone")}
                            type="tel"
                            placeholder="+970 599 000 000"
                            className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">
                          Email <span className="text-brand-500">*</span>
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="you@email.com"
                          className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">
                          Vehicle of Interest
                        </label>
                        <input
                          {...register("carInterest")}
                          type="text"
                          placeholder="e.g., 2024 Toyota Camry, any SUV under $35k"
                          className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-surface-700 mb-1.5">
                          Message <span className="text-brand-500">*</span>
                        </label>
                        <textarea
                          {...register("message")}
                          rows={5}
                          placeholder="Tell us how we can help..."
                          className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm resize-none"
                        />
                        {errors.message && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:w-auto px-8 py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-14 sm:py-16 bg-surface-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">
                Our Team
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mt-1">
                Meet the Legend Motors Family
              </h2>
              <p className="text-surface-500 mt-2 max-w-lg mx-auto text-sm">
                Our experienced team is passionate about helping you find the
                perfect vehicle. We&apos;re here to make your car buying journey
                seamless and enjoyable.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="text-center bg-white rounded-xl p-5 border border-surface-100"
                >
                  <div className="w-16 h-16 rounded-full bg-surface-200 flex items-center justify-center mx-auto mb-3 text-surface-500 font-bold text-lg">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-surface-900 text-sm">
                    {member.name}
                  </h3>
                  <p className="text-xs text-surface-500 mt-0.5">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About blurb */}
        <section className="py-14 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 mb-4">
              About Legend Motors PS
            </h2>
            <p className="text-surface-600 leading-relaxed mb-4">
              Founded in the heart of Nablus, Legend Motors PS has been serving
              the Palestinian community with quality vehicles and exceptional
              customer service. Our mission is simple: to make car ownership
              accessible, affordable, and enjoyable for everyone.
            </p>
            <p className="text-surface-600 leading-relaxed">
              We carefully select each vehicle in our inventory, ensuring it
              meets our high standards for quality and reliability. Whether
              you&apos;re a first-time buyer or upgrading your family car, our
              team is dedicated to finding the perfect match for your needs and
              budget.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
