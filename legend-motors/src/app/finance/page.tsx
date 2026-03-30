"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinanceCalculator from "@/components/FinanceCalculator";
import LeadModal from "@/components/LeadModal";
import {
  ChevronDown,
  ShieldCheck,
  Clock,
  BadgePercent,
  FileCheck,
} from "lucide-react";
import type { Metadata } from "next";

const faqs = [
  {
    q: "What do I need to apply for financing?",
    a: "You'll need a valid ID, proof of income (pay stubs or bank statements), proof of residence, and a down payment. Our team will guide you through the exact requirements based on your situation.",
  },
  {
    q: "Can I get financed with no credit history?",
    a: "Yes! We work with multiple lenders, including those who specialize in first-time buyers. We'll do our best to find a financing solution that works for you.",
  },
  {
    q: "How much should I put as a down payment?",
    a: "We recommend 10-20% of the vehicle price. A larger down payment reduces your monthly payments and total interest. However, we offer flexible options starting from 0% down depending on your credit profile.",
  },
  {
    q: "How long does the approval process take?",
    a: "Most applications receive a decision within 30 minutes to 1 hour during business hours. In some cases, it may take up to 24 hours for final approval.",
  },
  {
    q: "Can I refinance my existing car loan?",
    a: "Absolutely. If you have a high-interest loan from another lender, we can help you explore refinancing options that could lower your monthly payment.",
  },
  {
    q: "Is there a penalty for paying off my loan early?",
    a: "Most of our financing partners do not charge early payoff penalties. We'll make sure to clarify this before you sign any agreement.",
  },
];

const benefits = [
  {
    icon: BadgePercent,
    title: "Competitive Rates",
    desc: "We partner with multiple lenders to get you the best possible interest rate for your credit profile.",
  },
  {
    icon: Clock,
    title: "Fast Approval",
    desc: "Get a financing decision in as little as 30 minutes. No long waits or complicated paperwork.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Terms",
    desc: "No hidden fees, no surprises. We walk you through every detail of your financing agreement.",
  },
  {
    icon: FileCheck,
    title: "Flexible Options",
    desc: "From 36 to 72-month terms with various down payment options. We tailor the plan to your budget.",
  },
];

export default function FinancePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-surface-950 text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">
              Financing Options
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Drive Today, Pay Your Way
            </h1>
            <p className="text-surface-400 max-w-xl mx-auto text-sm sm:text-base mb-8">
              Flexible financing solutions tailored to your budget. Get
              pre-approved in minutes with competitive rates from our trusted
              lending partners.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-semibold transition-colors text-base"
            >
              Get Pre-Approved Now
            </button>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-14 sm:py-16 border-b border-surface-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-3">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-surface-900 mb-1">
                    {b.title}
                  </h3>
                  <p className="text-sm text-surface-500">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-14 sm:py-16 bg-surface-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-surface-900">
                Payment Calculator
              </h2>
              <p className="text-surface-500 mt-2 text-sm">
                Estimate your monthly payments based on your budget
              </p>
            </div>
            <FinanceCalculator
              onGetPreApproved={() => setModalOpen(true)}
            />
          </div>
        </section>

        {/* How it works */}
        <section className="py-14 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 text-center mb-10">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Apply Online",
                  desc: "Fill out our simple pre-approval form. It takes less than 5 minutes.",
                },
                {
                  step: "2",
                  title: "Get Approved",
                  desc: "Receive your financing decision quickly, often within the same hour.",
                },
                {
                  step: "3",
                  title: "Drive Home",
                  desc: "Choose your car, sign the paperwork, and drive away in your new vehicle.",
                },
              ].map((s) => (
                <div key={s.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-500 text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-surface-900 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-surface-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-16 bg-surface-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-surface-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white border border-surface-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-surface-900 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-surface-400 shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-surface-600 leading-relaxed border-t border-surface-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Get Pre-Approved for Financing"
      />
    </>
  );
}
