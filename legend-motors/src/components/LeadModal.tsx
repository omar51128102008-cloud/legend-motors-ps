"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { saveLeadToStorage } from "@/lib/utils";

const leadSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(7, "Valid phone number required")
    .regex(/^[\d\s+\-()]+$/, "Invalid phone number"),
  email: z.string().email("Valid email required"),
  message: z.string().optional(),
  carInterest: z.string().optional(),
  preferredContact: z.enum(["phone", "email", "whatsapp"]),
});

type LeadForm = z.infer<typeof leadSchema>;

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  carInterest?: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  title = "Get a Quote",
  carInterest = "",
}: LeadModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      fullName: "",
      phone: "+970 ",
      email: "",
      message: "",
      carInterest,
      preferredContact: "whatsapp",
    },
  });

  const onSubmit = async (data: LeadForm) => {
    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    saveLeadToStorage({ ...data, formTitle: title });
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-surface-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-lg font-bold text-surface-900">{title}</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-surface-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-surface-500" />
          </button>
        </div>

        {submitted ? (
          /* Success state */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-surface-900 mb-2">
              Thank You!
            </h3>
            <p className="text-surface-500 mb-6">
              We&apos;ll contact you within 1 hour during business hours. Feel
              free to call us directly for faster assistance.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-surface-900 text-white rounded-lg font-semibold hover:bg-surface-800 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-surface-700 mb-1.5"
              >
                Full Name <span className="text-brand-500">*</span>
              </label>
              <input
                {...register("fullName")}
                id="fullName"
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

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-surface-700 mb-1.5"
              >
                Phone Number <span className="text-brand-500">*</span>
              </label>
              <input
                {...register("phone")}
                id="phone"
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

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-surface-700 mb-1.5"
              >
                Email <span className="text-brand-500">*</span>
              </label>
              <input
                {...register("email")}
                id="email"
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

            {/* Car Interest */}
            {carInterest && (
              <div>
                <label
                  htmlFor="carInterest"
                  className="block text-sm font-medium text-surface-700 mb-1.5"
                >
                  Vehicle of Interest
                </label>
                <input
                  {...register("carInterest")}
                  id="carInterest"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-surface-200 bg-surface-50 text-sm text-surface-600"
                  readOnly
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-surface-700 mb-1.5"
              >
                Message / Questions
              </label>
              <textarea
                {...register("message")}
                id="message"
                rows={3}
                placeholder="Tell us what you're looking for..."
                className="w-full px-4 py-3 rounded-lg border border-surface-200 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all text-sm resize-none"
              />
            </div>

            {/* Preferred Contact */}
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">
                Preferred Contact Method
              </label>
              <div className="flex gap-3">
                {(["phone", "email", "whatsapp"] as const).map((method) => (
                  <label
                    key={method}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      {...register("preferredContact")}
                      type="radio"
                      value={method}
                      className="w-4 h-4 text-brand-500 focus:ring-brand-500"
                    />
                    <span className="text-sm text-surface-600 capitalize">
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Submit Inquiry"
              )}
            </button>

            <p className="text-xs text-surface-400 text-center">
              We respect your privacy. Your information will never be shared.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
