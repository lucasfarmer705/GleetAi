import React, { useState, useRef } from "react";
import {
  MessageSquare,
  Phone,
  Shield,
  Zap,
  Calendar,
  TrendingUp,
  BarChart3,
  Inbox,
  AlertCircle,
  MapPin,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  User,
  Clock,
  ArrowUpRight,
  Menu,
  X,
  HelpCircle,
  Check,
  Star,
  Users,
  Award,
  DollarSign,
  Briefcase
} from "lucide-react";
import DemoRequestForm from "./components/DemoRequestForm";
import GleetLogo from "./components/GleetLogo";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<string>("hvac");

  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const whoItIsForRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    elementRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const industries = [
    {
      id: "hvac",
      name: "HVAC",
      problem: "When an AC breaks down in 95-degree heat or a furnace stops in dead winter, emergency calls flood in after-hours. If calls go to voicemail, customers immediately dial the next listing on Google.",
      solution: "Gleet AI answers text messages and web leads instantly. It qualifies emergency replacements vs regular tune-ups, explains diagnostic fees, and schedules a dispatch slot directly onto your service grid.",
      metric: "94% of after-hours emergency leads engaged & booked instantly."
    },
    {
      id: "plumbing",
      name: "Plumbing",
      problem: "A leaking pipe or backup cannot wait. Homeowners skip companies that take hours to reply and book whichever plumber responds first.",
      solution: "Instantly reply to incoming text leads in under 15 seconds. Standardize scheduling workflows for water heater swaps, line clearings, and dispatching fast response trucks.",
      metric: "4.2x increase in speed-to-lead booking conversion."
    },
    {
      id: "electrical",
      name: "Electrical",
      problem: "Troubleshooting electrical blackouts and panel upgrade leads requires careful triage to maximize billing rates for your master electricians.",
      solution: "Automatically screen inquiries based on scope, quote panel replacements using your custom pricebook tables, and book consultation diagnostic blocks.",
      metric: "Save 16+ hours per week of manual coordinate calls."
    },
    {
      id: "roofing",
      name: "Roofing",
      problem: "Storm surges leave roofing teams overloaded with inspection requests. Managing incoming storm damage leads manually results under-servicing major claims.",
      solution: "Deploy text lead collection directly on local ads. Screen roofing claims, collect insurance photos via text links, and schedule storm inspections automatically.",
      metric: "Capture triple the lead density during weather events."
    },
    {
      id: "contractors",
      name: "General Contractors",
      problem: "Playing endless phone tag with customers trying to book remodeling or project consultation appointments takes techs away from active billable sites.",
      solution: "Triage remodeling, drywall, and deck requests. Pre-qualify budgets, gather project zip codes, and schedule estimator site visits flawlessly.",
      metric: "100% of quote forms booked into consultation slots instantly."
    }
  ];

  const workflowSteps = [
    {
      number: "1",
      title: "Lead Arrives",
      description: "A customer submits a web form, clicks a local Google ad, or texts your business line.",
      badge: "Inbound Lead"
    },
    {
      number: "2",
      title: "AI Responds Instantly",
      description: "Gleet AI triggers a polite, fully-customized response in under 15 seconds.",
      badge: "< 15s Latency"
    },
    {
      number: "3",
      title: "Customer Gets Answers",
      description: "The AI answers custom diagnostic fees, service areas, and company licensing questions according to your exact business playbook.",
      badge: "Instant Trust"
    },
    {
      number: "4",
      title: "Appointment Booked",
      description: "The AI offers live open dispatch slots, matching tech skills, and books the customer into your calendar.",
      badge: "Calendar Synced"
    },
    {
      number: "5",
      title: "Business Notified",
      description: "Your dispatch desk receives a highly-detailed lead dossier with full context pushed straight to their mobile dispatch screen.",
      badge: "Job Secured"
    }
  ];

  const resultsMetrics = [
    {
      title: "Capture Demand 24/7",
      desc: "Emergency repair needs often peak at night or on weekends. Capture premium emergency service dispatch calls while your competitors sleep, without paying overtime to office dispatch staff.",
      metric: "24/7 Coverage",
      icon: Clock
    },
    {
      title: "Skyrocket Booking Rates",
      desc: "Answering an inquiry within 60 seconds raises booking conversions by up to 391% compared to a 10-minute delay. Instant response stops leads from shopping around.",
      metric: "+391% Conv",
      icon: TrendingUp
    },
    {
      title: "Reclaim Owner & Admin Time",
      desc: "Stop wasting hours listening to bad voicemails, calling back unresponsive window inquiries, and copy-pasting customer details. Free up your desk team to bill more hours.",
      metric: "Save 20+ Hrs",
      icon: Inbox
    },
    {
      title: "Perfect Brand Credibility",
      desc: "Professional, grammatically-perfect responses that respect your exact pricing tables and diagnostic policies. Customers get professional support immediately, maximizing 5-star Google review rates.",
      metric: "100% Policy Sync",
      icon: Shield
    }
  ];


  const faqs = [
    {
      question: "Which field service management CRMs do you integrate with?",
      answer: "Gleet AI is designed to integrate seamlessly with the tools you already use, including ServiceTitan, Housecall Pro, Jobber, FieldEdge, Google Calendar, and top email providers. During our concierge onboarding, we map open dispatch slots directly onto your active visual calendar grid."
    },
    {
      question: "Will the AI say something incorrect to my customers or agree to a price I don't support?",
      answer: "No. You have absolute, 100% control over the Business Playbook. Gleet AI operates within strict boundaries that we define together—including your specific hourly diagnostic fees, service boundaries, emergency surcharge policies, and technician capabilities. If a customer asks a question outside these exact rules, the AI immediately flags a human dispatcher to take over."
    },
    {
      question: "How long does the concierge setup and training process take?",
      answer: "We handle the heavy lifting. In under 7 days, our team builds your customized playbook, loads your prices, tests client messaging parameters, and installs the live integrations. You won't have to write a single line of code or build complex flows yourself."
    },
    {
      question: "Is there a setup fee under the Founding Customer Program?",
      answer: "No. Setup fees are waived for our initial cohort under the Founding Customer Program. We configure your custom playbook, map your calendar grids, and provide dedicated priority phone support from the founder at zero upfront cost."
    },
    {
      question: "How do we prevent duplicate bookings or dispatching techs to out-of-boundary zip codes?",
      answer: "Before offering any calendar slots representing your business, Gleet AI checks the zip code provided against your operational list. If an inquiry originates outside your dispatch radius, it lets them know you do not currently service that area and offers standard referral processes."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B1F1D] font-sans selection:bg-[#5c7564] selection:text-white">
      {/* Header Navigation */}
      <nav className="border-b border-[#6c8675] sticky top-0 bg-[#5c7564] z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <GleetLogo size={36} strokeColor="white" />
              <span className="font-brand font-normal text-white text-sm tracking-[0.12em] uppercase">
                Gleet <span className="bg-white/10 text-white text-[9px] font-brand font-normal px-2 py-0.5 rounded border border-white/20 ml-1">AI</span>
              </span>
            </div>

            {/* Desktop Navigation Link Menu */}
            <div className="hidden md:flex items-center gap-8 text-[11px] font-brand font-normal text-white/80 tracking-[0.1em] uppercase">
              <button 
                onClick={() => scrollToSection(howItWorksRef)}
                className="hover:text-white transition-colors cursor-pointer animate-none"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection(whoItIsForRef)}
                className="hover:text-white transition-colors cursor-pointer animate-none"
              >
                Who It's For
              </button>
              <button 
                onClick={() => scrollToSection(pricingRef)}
                className="hover:text-white transition-colors cursor-pointer animate-none"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection(faqRef)}
                className="hover:text-white transition-colors cursor-pointer animate-none"
              >
                FAQ
              </button>
            </div>

            {/* CTA Book Demo Button (Desktop) - Highly visible white button on green header */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection(heroRef)}
                className="bg-white hover:bg-[#ebf0ec] text-[#5c7564] text-[11px] font-brand font-bold tracking-[0.12em] uppercase px-5 py-3 rounded-lg transition-all duration-300 shadow-xs cursor-pointer"
              >
                Book a Demo
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/90 hover:text-white rounded-lg focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#6c8675] bg-[#5c7564] px-4 pt-4 pb-6 space-y-3 absolute w-full left-0 shadow-lg">
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="block w-full text-left py-2.5 text-xs font-brand font-normal tracking-[0.1em] uppercase text-white/80 hover:text-white animate-none"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection(whoItIsForRef)}
              className="block w-full text-left py-2.5 text-xs font-brand font-normal tracking-[0.1em] uppercase text-white/80 hover:text-white animate-none"
            >
              Who It's For
            </button>
            <button
              onClick={() => scrollToSection(pricingRef)}
              className="block w-full text-left py-2.5 text-xs font-brand font-normal tracking-[0.1em] uppercase text-white/80 hover:text-white animate-none"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection(faqRef)}
              className="block w-full text-left py-2.5 text-xs font-brand font-normal tracking-[0.1em] uppercase text-white/80 hover:text-white animate-none"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection(heroRef)}
              className="w-full text-center uppercase tracking-[0.12em] bg-white text-[#5c7564] font-brand font-bold py-3.5 px-4 rounded-lg block text-[10px] hover:bg-[#ebf0ec]"
            >
              Book a Demo
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section (Conversion-Focused Double Column - Clean White Background) */}
      <section ref={heroRef} className="w-full bg-white pt-20 pb-28 lg:pt-32 lg:pb-42 relative overflow-hidden border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Outcome-Focused Copy & Trust list */}
            <div className="lg:col-span-7 space-y-10">
              {/* Top Micro Trust Ribbon (Michroma font for micro labels) */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5c7564]/5 border border-[#5c7564]/15 rounded-full">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5c7564] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5c7564]"></span>
                </span>
                <span className="text-[9px] font-brand font-normal text-[#5c7564] tracking-[0.12em] uppercase">
                  BUILT EXCLUSIVELY FOR SERVICE CONTRACTORS
                </span>
              </div>

              {/* Core Outcome Headline */}
              <div className="relative">
                <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#1B1F1D] leading-[1.25] font-sans">
                  Turn Missed Calls Into <span className="text-[#5c7564]">Booked</span> Jobs
                </h1>
              </div>

              {/* ROI Subheadline */}
              <p className="text-base sm:text-lg text-[#5E6762] leading-relaxed font-sans max-w-[620px]">
                Gleet AI responds to new leads, answers customer questions, and books appointments automatically so you never miss an opportunity.
              </p>

              {/* Call to Action Button Group in Michroma */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => scrollToSection(heroRef)}
                  className="bg-[#2C3431] hover:bg-[#1F2623] hover:-translate-y-0.5 text-white text-[11px] font-brand font-normal tracking-[0.12em] uppercase px-9 py-4.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:translate-y-0 transform"
                >
                  Book a Demo
                </button>
                <button
                  onClick={() => scrollToSection(howItWorksRef)}
                  className="bg-white hover:bg-gray-50 hover:-translate-y-0.5 border border-gray-200 text-[#2C3431] hover:text-[#1B1F1D] text-[11px] font-brand font-normal tracking-[0.12em] uppercase px-9 py-4.5 rounded-xl transition-all duration-300 cursor-pointer shadow-xs hover:shadow-sm transform active:translate-y-0"
                >
                  Learn More
                </button>
              </div>

              {/* Trust Bullet Highlighters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-light">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#5c7564]/10 text-[#5c7564] shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-brand font-normal uppercase tracking-[0.1em] text-text-primary">AVAILABLE 24/7/365</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Capture midnight and holiday breakdown leads.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#5c7564]/10 text-[#5c7564] shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-brand font-normal uppercase tracking-[0.1em] text-text-primary">INSTANT RESPONSE (UNDER 60S)</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Never lose a hot client to slow follow-ups.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#5c7564]/10 text-[#5c7564] shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-brand font-normal uppercase tracking-[0.1em] text-text-primary">DIRECT CALENDAR BOOKING</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Syncs slots directly with your dispatch systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-[#5c7564]/10 text-[#5c7564] shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-brand font-normal uppercase tracking-[0.1em] text-text-primary">ZERO EXTRA STAFF REQUIRED</h4>
                    <p className="text-xs text-text-secondary mt-0.5">Stop paying thousands in expensive answering desks.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Primary Booking Form Above-The-Fold */}
            <div className="lg:col-span-5 relative">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* Planned Integrations Section */}
      <section className="w-full bg-[#F8F9F8] border-b border-border-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.12em] block">
            FUTURE PLATFORMS
          </span>
          <h3 className="text-xl font-bold text-[#1B1F1D] tracking-tight">Planned Integrations</h3>
          <p className="text-sm text-[#5E6762] max-w-[620px] mx-auto leading-relaxed">
            Our roadmap includes building secure direct connections with popular service industry platforms.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-[#1B1F1D] font-semibold text-xs tracking-tight">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white border border-border-light rounded-xl hover:border-[#5c7564]/30 shadow-xs">
              <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5 L90 33 L90 67 L50 95 L10 67 L10 33 Z" fill="#00A3E0" />
                <path d="M50 5 L50 95 L90 67 L90 33 Z" fill="#0082B4" />
                <path d="M50 35 L72 48 L50 61 L28 48 Z" fill="#FFFFFF" />
              </svg>
              <span>ServiceTitan</span>
              <span className="text-[8px] font-brand font-normal bg-[#F3F5F4] text-[#5E6762] px-2 py-1 rounded border border-border-light uppercase">Planned</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white border border-border-light rounded-xl hover:border-[#5c7564]/30 shadow-xs">
              <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 12 L15 42 H30 V82 H70 V42 H85 L50 12 Z" fill="#0073EC" />
                <path d="M42 62 L48 68 L62 52" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>Housecall Pro</span>
              <span className="text-[8px] font-brand font-normal bg-[#F3F5F4] text-[#5E6762] px-2 py-1 rounded border border-border-light uppercase">Planned</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white border border-border-light rounded-xl hover:border-[#5c7564]/30 shadow-xs">
              <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#49B66E" />
                <path d="M32 50 L45 63 L68 35" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span>Jobber</span>
              <span className="text-[8px] font-brand font-normal bg-[#F3F5F4] text-[#5E6762] px-2 py-1 rounded border border-border-light uppercase">Planned</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#D9DFDB] rounded-xl hover:border-[#5c7564]/30 shadow-xs">
              <svg viewBox="0 0 100 100" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 A40 40 0 1 0 90 50 A30 30 0 1 1 50 20 Z" fill="#005A9C" />
                <path d="M50 20 A30 30 0 1 0 80 50 A20 20 0 1 1 50 30 Z" fill="#71BF44" />
              </svg>
              <span>FieldEdge</span>
              <span className="text-[8px] font-brand font-normal bg-[#F3F5F4] text-[#5E6762] px-2 py-1 rounded border border-border-light uppercase">Planned</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#D9DFDB] rounded-xl hover:border-[#5c7564]/30 shadow-xs">
              <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 5 C7.24 5 5 7.24 5 10 V38 C5 40.76 7.24 43 10 43 H38 C40.76 43 43 40.76 43 38 V10 C43 7.24 40.76 5 38 5 H10 Z" fill="#FFFFFF" />
                <path d="M38 5 H10 C7.24 5 5 7.24 5 10 V14 H43 V10 C43 7.24 40.76 5 38 5 Z" fill="#4285F4" />
                <text x="24" y="34" fontSize="18" fontWeight="bold" fontFamily="system-ui, sans-serif" fill="#4285F4" textAnchor="middle">31</text>
                <circle cx="10" cy="9.5" r="1.5" fill="#EA4335" />
                <circle cx="14" cy="9.5" r="1.5" fill="#FBBC05" />
                <circle cx="18" cy="9.5" r="1.5" fill="#34A853" />
              </svg>
              <span>Google Calendar</span>
              <span className="text-[8px] font-brand font-normal bg-[#F3F5F4] text-[#5E6762] px-2 py-1 rounded border border-[#D9DFDB] uppercase">Planned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Gleet AI Exists & Built With Local Contractors Section */}
      <section className="w-full bg-[#F8F9F8] border-b border-border-light py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Side: Why Gleet AI Exists (Problem / Philosophy) */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-4">
                <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.12em] block">
                  WHY GLEET AI
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1F1D] tracking-tight animate-fade-in">
                  Why Gleet AI Exists
                </h2>
                <p className="text-sm text-[#5E6762] leading-relaxed max-w-[620px]">
                  We believe that great local contractors shouldn't lose hard-earned jobs simply because they are busy on-site servicing other customers. We built Gleet AI to bridge the response gap honestly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 p-6 rounded-2xl bg-white border border-border-light transition-all duration-300 hover:border-[#5c7564]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transform hover:-translate-y-0.5 shadow-xs">
                  <div className="p-3 bg-red-500/10 text-red-600 rounded-xl h-fit">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#1B1F1D]">Service businesses lose leads every day</h4>
                    <p className="text-xs text-[#5E6762] leading-relaxed font-sans max-w-[500px]">
                      HVAC, plumbing, electrical, and roofing businesses lose thousands of dollars in booked jobs simply because they cannot answer every intake lead instantly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl bg-white border border-border-light transition-all duration-300 hover:border-[#5c7564]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transform hover:-translate-y-0.5 shadow-xs">
                  <div className="p-3 bg-[#5c7564]/10 text-[#5c7564] rounded-xl h-fit">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#1B1F1D]">Customers expect immediate responses</h4>
                    <p className="text-xs text-[#5E6762] leading-relaxed font-sans max-w-[500px]">
                      If an inquiry hits a voicemail box or takes 30 minutes to receive a text response, homeowners immediately move on to alternative Google search results.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl bg-white border border-border-light transition-all duration-300 hover:border-[#5c7564]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transform hover:-translate-y-0.5 shadow-xs">
                  <div className="p-3 bg-blue-500/10 text-blue-600 rounded-xl h-fit">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#1B1F1D]">Businesses cannot staff phones 24/7/365</h4>
                    <p className="text-xs text-[#5E6762] leading-relaxed font-sans max-w-[500px]">
                      Most service operators can't afford to keep premium phone dispatchers on active standby during weekends, midnights, and storm events.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl bg-white border border-border-light transition-all duration-300 hover:border-[#5c7564]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transform hover:-translate-y-0.5 shadow-xs">
                  <div className="p-3 bg-[#5c7564]/15 text-[#5c7564] rounded-xl h-fit">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#1B1F1D]">Gleet AI was created to solve this problem</h4>
                    <p className="text-xs text-[#5E6762] leading-relaxed font-sans max-w-[500px]">
                      We developed a lightning-fast, zero-staff solution that handles customer replies, triages emergency service calls, and books appointments on your calendar instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Built With Local Contractors */}
            <div className="lg:col-span-6 space-y-10 lg:pl-6">
              <div className="space-y-4">
                <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.12em] block">
                  COOPERATIVE DESIGN
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1F1D] tracking-tight">
                  Built With Local Contractors
                </h2>
                <p className="text-sm text-[#5E6762] leading-relaxed max-w-[620px]">
                  Rather than developing software in a vacuum, we design and build right alongside home service business owners who deal with real field service dispatch challenges.
                </p>
              </div>

              <div 
                className="bg-white border border-[#E2E7E3] rounded-[24px] p-6 sm:p-8 space-y-6 relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md hover:border-[#5c7564]/50 transform hover:-translate-y-0.5"
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}
              >
                <div className="flex items-center gap-3.5 pb-4 border-b border-border-light">
                  <div className="w-12 h-12 rounded-full bg-[#5c7564]/10 flex items-center justify-center text-[#5c7564]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B1F1D] text-base">Active Field Feedback Loops</h4>
                    <p className="text-[9px] font-brand font-normal text-[#5E6762] uppercase tracking-[0.10em] mt-0.5">Partner-Led Iteration</p>
                  </div>
                </div>

                <blockquote className="text-sm text-[#1B1F1D] italic leading-relaxed font-sans">
                  "We are actively interviewing service business owners and building Gleet AI around real operational challenges."
                </blockquote>

                <div className="space-y-4 pt-4 text-xs text-[#5E6762]">
                  <p className="max-w-[500px]">
                    By cooperating directly with active plumbing and HVAC owners, we calibrate specific dispatch constraints:
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-[11px] font-mono font-semibold text-[#1B1F1D]">
                    <span className="flex items-center gap-1.5 flex-row">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c7564]" /> Diagnostic Sur-Charges
                    </span>
                    <span className="flex items-center gap-1.5 flex-row">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c7564]" /> Skill-Level Dispatching
                    </span>
                    <span className="flex items-center gap-1.5 flex-row">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c7564]" /> Zip Code Service Limits
                    </span>
                    <span className="flex items-center gap-1.5 flex-row">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5c7564]" /> Real Pricebook Synctions
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who It's For section */}
      <section ref={whoItIsForRef} className="w-full bg-white border-b border-border-light py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side Industry Switcher Copy */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.16em] block">
                BUILT FOR CONTRACTORS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1F1D] tracking-tight leading-tight">
                Designed for Hardworking Blue-Collar Operators
              </h2>
              <p className="text-[#5E6762] text-sm leading-relaxed max-w-[620px]">
                Gleet AI is loaded with specific knowledge parameters for your particular segment. We do not use general generic prompts. Your automated playbook knows HVAC diagnostic terms, burst-pipe priorities, and general scope rules.
              </p>

              {/* Selector buttons */}
              <div className="space-y-2.5 pt-4">
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setActiveIndustry(ind.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-[10px] font-brand font-normal tracking-[0.1em] uppercase transition-all flex items-center justify-between cursor-pointer ${
                      activeIndustry === ind.id 
                        ? "bg-[#5c7564] border-[#5c7564] text-white shadow-xs" 
                        : "bg-white border-border-light text-[#5E6762] hover:text-[#1B1F1D] hover:border-[#5c7564]/40"
                     }`}
                  >
                    <span>{ind.name} Dispatching</span>
                    <ArrowUpRight className={`w-4 h-4 transition-transform ${activeIndustry === ind.id ? "translate-x-0.5 -translate-y-0.5" : "text-[#5E6762]"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side Dynamic Info Card */}
            <div className="lg:col-span-7 lg:pl-6">
              {industries.map((ind) => {
                if (ind.id !== activeIndustry) return null;
                return (
                  <div 
                    key={ind.id}
                    className="bg-white border border-border-light rounded-3xl p-8 sm:p-10 space-y-8 animate-fade-in shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-brand font-normal px-3 py-1.5 bg-[#5c7564]/10 text-[#5c7564] rounded border border-border-light uppercase tracking-[0.1em]">
                        Selected Blueprint
                      </span>
                      <span className="text-[9px] font-brand font-normal text-[#5E6762] uppercase tracking-[0.08em]">
                        Custom Pricebook Ready
                      </span>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-[#1B1F1D] tracking-tight">
                        The Pain in {ind.name}
                      </h3>
                      <p className="text-sm text-[#5E6762] leading-relaxed font-sans">
                        {ind.problem}
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border-light">
                      <h4 className="text-[11px] font-brand font-normal text-[#5c7564] uppercase tracking-[0.1em] flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#5c7564]" /> Gleet AI Automation Solution
                      </h4>
                      <p className="text-sm text-[#1B1F1D] leading-relaxed font-sans">
                        {ind.solution}
                      </p>
                    </div>

                    <div className="bg-[#5c7564]/5 border border-border-light p-5 rounded-2xl flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#5c7564]/10 text-[#5c7564] flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[8px] font-brand font-normal uppercase text-[#5E6762] tracking-[0.1em]">Target Business Outcome</p>
                        <p className="text-xs sm:text-sm font-bold text-[#1B1F1D] mt-0.5">{ind.metric}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Mid-Page Quick CTA Callout Banner */}
      <section className="w-full bg-[#F8F9F8] border-b border-border-light py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="bg-white border border-[#E2E7E3] rounded-[28px] p-10 sm:p-14 relative overflow-hidden transition-all duration-300"
            style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)" }}
          >
            <div className="max-w-2xl space-y-6">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B1F1D] tracking-tight">
                Ready to plug your lead leak before competitor calls back?
              </h3>
              <p className="text-sm text-[#5E6762] leading-relaxed max-w-[620px]">
                Accepting only 15 trade operators for our Founding Customer Program this month. Reserve your risk-free setup coordinate slot below.
              </p>
              <button
                onClick={() => scrollToSection(heroRef)}
                className="inline-flex items-center gap-2 uppercase tracking-[0.12em] bg-[#2C3431] hover:bg-[#1F2623] hover:-translate-y-0.5 text-white font-brand text-[10px] font-normal py-4.5 px-8 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer transform active:translate-y-0"
              >
                JOIN FOUNDING CUSTOMER PROGRAM <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works with Diagram Flow */}
      <section ref={howItWorksRef} className="w-full bg-white border-b border-border-light py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-24 animate-fade-in">
            <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.16em] block">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1F1D] tracking-tight">
              Simple. Instant. 100% Coordinated.
            </h2>
            <p className="text-[#5E6762] text-sm max-w-[620px] mx-auto leading-relaxed">
              How Gleet AI handles inquiries from initial submission to a fully logged schedule slot on your CRM dispatch screen.
            </p>
          </div>

          {/* Sequential visual workflow mapping */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
            
            {/* Visual connector bar behind steps */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1.5px] bg-[#E5E9E7] -z-10" />

            {workflowSteps.map((step, index) => (
              <div 
                key={index}
                className="bg-white border border-border-light rounded-[24px] p-8 space-y-4 flex flex-col justify-between hover:border-[#5c7564]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transform hover:-translate-y-1 transition-all duration-300 shadow-xs"
              >
                <div className="space-y-3">
                  {/* Step bubble and Index badge */}
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-[#5c7564] text-white font-brand text-[10px] font-normal flex items-center justify-center shadow-xs">
                      {step.number}
                    </span>
                    <span className="text-[8px] font-brand font-normal text-[#5E6762] uppercase tracking-[0.08em]">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1B1F1D] tracking-tight animate-fade-in">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs text-[#5E6762] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[9px] font-brand font-normal text-[#5c7564] tracking-[0.08em] uppercase block">
                    ✓ Handled Autonomously
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Results Outcome Section */}
      <section className="w-full bg-[#F8F9F8] border-b border-border-light py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-24">
            <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.16em] block">
              RESULTS & OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1F1D] tracking-tight animate-fade-in">
              Stop Selling Technology. Start Making Money.
            </h2>
            <p className="text-[#5E6762] text-sm max-w-[620px] mx-auto leading-relaxed">
              Gleet AI doesn't exist to generate high-tech chatter. It exists to secure high-ticket jobs, prevent client churn, and increase your billable margins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {resultsMetrics.map((met, index) => {
              const IconComponent = met.icon;
              return (
                <div 
                  key={index}
                  className="bg-white border border-[#E2E7E3] rounded-[24px] p-8 space-y-6 flex flex-col md:flex-row items-start gap-6 hover:border-[#5c7564]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transform hover:-translate-y-1 transition-all duration-300 shadow-xs"
                >
                  <div className="p-4 bg-[#5c7564]/10 text-[#5c7564] rounded-2xl shrink-0">
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>
                  
                  <div className="space-y-3 w-full">
                    <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-2">
                      <h3 className="text-lg font-bold text-[#1B1F1D] tracking-tight">
                        {met.title}
                      </h3>
                      <span className="text-[10px] font-brand font-normal text-[#5c7564] bg-[#5c7564]/10 px-2.5 py-1.5 rounded border border-[#5c7564]/20 tracking-[0.08em] uppercase inline-block self-start">
                        {met.metric}
                      </span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-[#5E6762] leading-relaxed">
                       {met.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="w-full bg-[#F8F9F8] border-b border-border-light py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="bg-white border border-[#E2E7E3] rounded-[32px] p-10 sm:p-14 lg:p-16 relative overflow-hidden transition-all duration-300"
            style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)" }}
          >
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Creator Photo Silhouette Headshot Container */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4 animate-fade-in">
                <div className="relative">
                  <div className="w-44 h-44 rounded-full border-4 border-[#5c7564] overflow-hidden shadow-md bg-[#F8F9F8] flex items-center justify-center">
                    <img 
                      src="/assets/lucas_farmer_headshot.jpg"
                      alt="Lucas Farmer - Founder of Gleet AI"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-bold text-[#1B1F1D] text-lg">Lucas Farmer</h4>
                  <p className="text-[10px] font-brand font-normal text-[#5E6762] uppercase tracking-[0.1em] mt-1">
                    Founder, Gleet AI
                  </p>
                </div>
              </div>

              {/* Personal Letter Text */}
              <div className="lg:col-span-8 space-y-6 font-sans">
                <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.16em] block">
                  MEET THE FOUNDER
                </span>
                
                <h3 className="text-3xl font-extrabold text-[#1B1F1D] tracking-tight">
                  Meet the Founder
                </h3>
                
                <div className="space-y-5 text-[#5E6762] text-sm leading-relaxed max-w-[620px] font-sans font-normal">
                  <p>
                    Gleet AI was founded by Lucas Farmer, an IT professional passionate about helping local service businesses respond faster, book more appointments, and provide a better customer experience.
                  </p>
                  <p>
                    Gleet AI is being developed in partnership with local contractors to solve real-world dispatch and lead response challenges.
                  </p>
                </div>

                <div className="pt-6 border-t border-border-light flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs text-[#1B1F1D] font-mono font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#5c7564]" />
                    <span>Honest Partner Development</span>
                  </div>
                  <div className="text-[10px] font-mono text-[#5E6762] uppercase tracking-wider">
                    Direct Owner Consulting
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Founding Customer Offer */}
      <section ref={pricingRef} className="w-full bg-white border-b border-border-light py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
            <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.16em] block">
              PRICING COHORT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1F1D] tracking-tight">
              Founding Customer Program
            </h2>
            <p className="text-[#5E6762] text-sm max-w-[620px] mx-auto font-sans leading-relaxed">
              Instead of forcing cookie-cutter pricing onto complex dispatch models, we guide onboarding with zero risk and waiver setup fees.
            </p>
          </div>

          <div 
            className="bg-white border border-[#E2E7E3] rounded-[32px] p-10 sm:p-14 relative overflow-hidden max-w-4xl mx-auto duration-300"
            style={{ boxShadow: "0 10px 30px rgba(0,0, 0, 0.04)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-12 lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#5c7564]/10 border border-[#5c7564]/25 rounded-full text-[9px] font-brand font-normal text-[#5c7564] tracking-[0.08em] uppercase">
                  FOUNDING CUSTOMER PROGRAM
                </div>
                <h3 className="text-2xl font-bold text-[#1B1F1D] tracking-tight">
                  Discounted pricing. Influence product roadmap.
                </h3>
                <p className="text-sm text-[#5E6762] leading-relaxed font-sans max-w-[550px]">
                  We are currently accepting 10 businesses into our founding customer program. Participants receive discounted pricing and direct influence over product development.
                </p>
                
                <ul className="space-y-3 text-xs text-[#5E6762] font-medium font-sans">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#5c7564]" /> Custom business playbook built for your company
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#5c7564]" /> 1-on-1 dispatch integrations set up by Lucas's desk
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#5c7564]" /> Lifetime founding price lock (guaranteed never to increase)
                  </li>
                </ul>
              </div>

              <div className="md:col-span-12 lg:col-span-5 bg-[#F8F9F8] p-8 rounded-2xl border border-border-light space-y-6 text-center shadow-xs">
                <p className="text-[9px] font-brand font-normal uppercase text-[#5E6762] tracking-[0.08em]">Early Access</p>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-brand font-normal text-[#1B1F1D] tracking-[0.1em] uppercase block">Founding Pricing</span>
                  <span className="text-4xl font-extrabold text-[#1B1F1D] font-sans tracking-tight">$149<span className="text-lg font-normal text-[#5E6762]">/mo</span></span>
                  <p className="text-[9px] text-[#5E6762] font-brand font-normal tracking-[0.1em] uppercase mt-1 flex items-center justify-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#5c7564] animate-pulse" /> Request Demo to Lock-In</p>
                </div>
                
                <button
                  onClick={() => scrollToSection(heroRef)}
                  className="w-full uppercase tracking-[0.12em] font-brand text-[10px] font-bold bg-[#2C3431] hover:bg-[#1F2623] hover:-translate-y-0.5 text-white py-4.5 px-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer transform active:translate-y-0"
                >
                  JOIN FOUNDING PROGRAM
                </button>
                <span className="text-[10px] text-[#97A29D] font-mono block">Zero risk. Concierge managed deployment.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section ref={faqRef} className="w-full bg-[#F8F9F8] border-b border-border-light py-32 lg:py-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-20 animate-fade-in">
            <span className="font-brand text-[10px] font-normal text-[#5c7564] uppercase tracking-[0.16em] block">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1B1F1D] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[#5E6762] text-sm max-w-[620px] mx-auto leading-relaxed">
              Straight answers to key operational concerns raised by contractor operators.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#E2E7E3] rounded-[20px] overflow-hidden transition-all duration-300 shadow-xs hover:shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-[#1B1F1D] text-sm sm:text-base cursor-pointer focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-[#5E6762] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#1B1F1D]" : ""}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5E6762] leading-relaxed border-t border-border-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Backing Lower Call To Action Banner */}
      <section className="w-full bg-[#F8F9F8] border-b border-border-light py-32 lg:py-40 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
          <div className="flex justify-center">
            <GleetLogo size={48} strokeColor="#5c7564" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1B1F1D] tracking-tight leading-tight">
            See How Many Leads You're Losing
          </h2>
          <p className="text-sm sm:text-base text-[#5E6762] leading-relaxed max-w-[620px] mx-auto">
            Book a free consultation and we'll walk through your current lead handling process.
          </p>
          <button
            onClick={() => scrollToSection(heroRef)}
            className="inline-flex items-center gap-2 uppercase tracking-[0.12em] bg-[#2C3431] hover:bg-[#1F2623] hover:-translate-y-0.5 text-white font-brand text-[10px] font-normal py-4.5 px-9 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer transform active:translate-y-0"
          >
            SCHEDULE MY CONSULTATION <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#5c7564] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-white/20 pt-16">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GleetLogo size={32} strokeColor="white" />
              <span className="font-brand font-normal text-white text-xs tracking-[0.1em] uppercase">Gleet AI</span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-xs font-sans">
              Instant auto-scheduling & speed-to-lead solutions built explicitly for plumbers, HVAC, roofing, and contractor systems. Protect your traffic 24 hours a day.
            </p>
          </div>

          {/* Quick Nav Grid */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-brand font-normal uppercase tracking-[0.1em] text-white">OPERATIONAL</h4>
            <ul className="space-y-2 text-xs text-white/80 font-sans">
              <li><button onClick={() => scrollToSection(howItWorksRef)} className="hover:text-white transition-colors cursor-pointer text-left">How It Works</button></li>
              <li><button onClick={() => scrollToSection(whoItIsForRef)} className="hover:text-white transition-colors cursor-pointer text-left">Who It's For</button></li>
              <li><button onClick={() => scrollToSection(pricingRef)} className="hover:text-white transition-colors cursor-pointer text-left">Early Access Pricing</button></li>
              <li><button onClick={() => scrollToSection(faqRef)} className="hover:text-white transition-colors cursor-pointer text-left">FAQ</button></li>
            </ul>
          </div>

          {/* Integration Links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-brand font-normal uppercase tracking-[0.1em] text-white">INTEGRATIONS</h4>
            <ul className="space-y-2 text-xs text-white/80 font-sans font-normal">
              <li>ServiceTitan Integration</li>
              <li>Housecall Pro Sync</li>
              <li>Jobber Calendar Mapping</li>
              <li>FieldEdge Leads Dispatch</li>
            </ul>
          </div>

          {/* Registry Legal */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-brand font-normal uppercase tracking-[0.1em] text-white">TRUST & SECURITY</h4>
            <p className="text-xs text-white/80 leading-relaxed font-sans">
              Based in local IT regions. Hand-secured playbooks. Fully compliant with direct CRM slot booking guidelines.
            </p>
            <p className="text-[10px] text-white/60 font-mono mt-1">
              © {new Date().getFullYear()} Gleet AI. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
