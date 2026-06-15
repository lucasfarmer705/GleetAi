import React, { useState } from "react";
import { CheckCircle2, ShieldAlert, Sparkles, Loader2 } from "lucide-react";

interface DemoRequestFormProps {
  onSuccessSubmitted?: () => void;
}

export default function DemoRequestForm({ onSuccessSubmitted }: DemoRequestFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    industry: "HVAC",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const industriesList = [
    "HVAC",
    "Plumbing",
    "Electrical",
    "Roofing",
    "Real Estate",
    "Dental / Medical",
    "Other Field Services"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Form submission failed.");
      }

      setIsSuccess(true);
      // Notify parent to refresh lead listing metrics
      if (onSuccessSubmitted) {
        onSuccessSubmitted();
      }

      // Reset form fields
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        industry: "HVAC",
        message: ""
      });

    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Something went wrong submitting your request. Please check your network and retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="w-full bg-white border border-[#ccd2ce] rounded-[32px] p-8 sm:p-10 relative overflow-hidden transition-all duration-300"
      style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)" }}
    >
      {/* Visual background ambient lighting (very soft white/sage bloom) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sage-light/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage-light/20 rounded-full blur-3xl -z-10" />

      {isSuccess ? (
        <div className="text-center py-10 space-y-4 font-sans">
          <div className="inline-flex items-center justify-center p-4 bg-sage-light text-sage-primary rounded-full mb-2 border border-sage-border/30">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold font-sans text-text-primary tracking-tight">Demo Requested!</h3>
          <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
            Thank you for booking a demo with Gleet AI. Your personalized live tour details have been successfully reserved in our registry.
          </p>
          <div className="bg-bg-secondary p-4 border border-border-light rounded-2xl text-[11px] text-text-secondary font-mono inline-block max-w-sm">
            💡 <span className="text-sage-primary font-semibold">Incredibly Fast Setup:</span> Lucas or our concierge team will reach out directly via your provided number to schedule your live system walkthrough!
          </div>
          <button
            onClick={() => setIsSuccess(false)}
            className="block text-xs font-semibold text-text-secondary hover:text-text-primary underline mx-auto mt-4 cursor-pointer"
          >
            Submit Another Lead Form
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-text-secondary">
          <div className="mb-6 space-y-2">
            <h3 className="text-xl font-bold text-text-primary tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5c7564] shrink-0 animate-pulse" /> See How Gleet AI Can Help
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Tell us about your business and we'll show how Gleet AI can help you respond faster and book more jobs.
            </p>
            <p className="text-[10px] text-emerald-700/80 font-semibold tracking-wider uppercase">
              Currently accepting 10 founding customers.
            </p>
          </div>

          {submitError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs flex gap-2.5 items-start">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-[10px] font-brand font-normal text-text-secondary uppercase tracking-[0.08em] mb-1.5">
                Your Name <span className="text-sage-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full h-11 bg-white border border-[#D9DFDB] focus:border-[#5c7564] focus:ring-1 focus:ring-[#5c7564] rounded-xl px-4 text-xs text-text-primary placeholder-zinc-400 outline-none transition-all duration-300 shadow-xs"
                placeholder="John Smith"
              />
            </div>

            <div>
              <label htmlFor="businessName" className="block text-[10px] font-brand font-normal text-text-secondary uppercase tracking-[0.08em] mb-1.5">
                Business Name <span className="text-sage-primary">*</span>
              </label>
              <input
                id="businessName"
                type="text"
                name="businessName"
                required
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full h-11 bg-white border border-[#D9DFDB] focus:border-[#5c7564] focus:ring-1 focus:ring-[#5c7564] rounded-xl px-4 text-xs text-text-primary placeholder-zinc-400 outline-none transition-all duration-300 shadow-xs"
                placeholder="ABC Plumbing"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-[10px] font-brand font-normal text-text-secondary uppercase tracking-[0.08em] mb-1.5">
                Business Email <span className="text-sage-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-11 bg-white border border-[#D9DFDB] focus:border-[#5c7564] focus:ring-1 focus:ring-[#5c7564] rounded-xl px-4 text-xs text-text-primary placeholder-zinc-400 outline-none transition-all duration-300 shadow-xs"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[10px] font-brand font-normal text-text-secondary uppercase tracking-[0.08em] mb-1.5">
                Direct Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full h-11 bg-white border border-[#D9DFDB] focus:border-[#5c7564] focus:ring-1 focus:ring-[#5c7564] rounded-xl px-4 text-xs text-text-primary placeholder-zinc-400 outline-none transition-all duration-300 shadow-xs"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="industry" className="block text-[10px] font-brand font-normal text-[#5E6762] uppercase tracking-[0.08em] mb-1.5">
              Select Your Industry
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="w-full h-11 bg-white border border-[#D9DFDB] focus:border-[#5c7564] focus:ring-1 focus:ring-[#5c7564] rounded-xl px-4 text-xs text-text-primary placeholder-zinc-400 outline-none transition-all duration-300 cursor-pointer shadow-xs"
            >
              {industriesList.map((ind) => (
                <option key={ind} value={ind} className="bg-white text-text-primary">
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-[10px] font-brand font-normal text-[#5E6762] uppercase tracking-[0.08em] mb-1.5">
              What dispatch problems should Gleet AI solve?
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-white border border-[#D9DFDB] focus:border-[#5c7564] focus:ring-1 focus:ring-[#5c7564] rounded-xl p-4 text-xs text-[#1B1F1D] placeholder-zinc-400 outline-none transition-all resize-none duration-300 shadow-xs"
              placeholder="What are the main issues you want our AI agent to handle?"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 uppercase tracking-[0.12em] font-brand text-[11px] bg-[#2C3431] hover:bg-[#1F2623] hover:-translate-y-0.5 text-white font-bold px-8 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md transform active:translate-y-0 active:scale-[0.99] disabled:bg-zinc-200"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Processing...
                </span>
              ) : (
                "SCHEDULE MY DEMO"
              )}
            </button>
            <p className="text-[10px] sm:text-[11px] text-center text-zinc-400 mt-3 select-none">
              No spam. No obligation. We'll simply show you how Gleet AI works.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
