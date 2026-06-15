import React, { useState } from "react";
import { MessageSquarePlus, Zap, BrainCircuit, CalendarCheck2, BellRing, ArrowRight, CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  title: string;
  tagline: string;
  description: string;
  icon: any;
  color: string;
  mockVisual: React.ReactNode;
}

export default function WorkflowDiagram() {
  const [activeStep, setActiveStep] = useState(1);

  const steps: Step[] = [
    {
      id: 1,
      title: "Step 1: Inquiry Received",
      tagline: "Channel Aggregation",
      description: "A customer submits a form on your site, sends an SMS, or message on Facebook. Gleet AI intercepts this lead in under 2 seconds.",
      icon: MessageSquarePlus,
      color: "from-emerald-500 to-teal-400",
      mockVisual: (
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-sans space-y-2 text-xs">
          <div className="flex justify-between text-[11px] text-zinc-500 border-b border-zinc-900 pb-1.5 mb-1.5 font-mono">
            <span>Customer Ticket</span>
            <span>Online Form</span>
          </div>
          <div className="p-2 bg-zinc-900/50 rounded-lg text-zinc-350">
            <span className="font-bold text-white block">John Miller (AC Leak):</span>
            "Hey, there's water leaking around my basement fan. Can I schedule a repair?"
          </div>
          <div className="text-[10px] text-zinc-500 font-mono text-right">
            Ingestion Speed: 0.1s
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Step 2: Instant Response",
      tagline: "Instant Intercept",
      description: "Gleet AI reaches out instantly (under 15 seconds) to ensure the prospect is engaged before they can explore competitors' services.",
      icon: Zap,
      color: "from-indigo-500 to-sky-400",
      mockVisual: (
        <div className="bg-zinc-950 p-4 rounded-xl border border-indigo-950 font-sans space-y-2 text-xs">
          <div className="flex justify-between text-[11px] text-indigo-400 border-b border-indigo-950 pb-1.5 mb-1.5 font-mono">
            <span>Automated Outbound SMS</span>
            <span>★ Real-time active</span>
          </div>
          <div className="p-2.5 bg-indigo-600 rounded-lg text-white font-medium shadow-md">
            "Hi John! This is Elite Air Solutions. I saw you had some water pooling by your AC basement fan. We can get someone to inspect that right away..."
          </div>
          <div className="text-[10px] text-indigo-400 font-mono text-right flex items-center justify-end gap-1">
            <Zap className="w-3 h-3 text-indigo-400 animate-pulse" /> Outbound Response: 4.8s
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Step 3: Intelligence Audit",
      tagline: "Context & Answer Engine",
      description: "AI answers complex questions about your services, prices, diagnostic fees, and policies, working off your structured FAQ training data.",
      icon: BrainCircuit,
      color: "from-purple-500 to-pink-500",
      mockVisual: (
        <div className="bg-zinc-950 p-4 rounded-xl border border-purple-900/80 font-sans space-y-2 text-xs">
          <div className="flex justify-between text-[11px] border-b border-purple-950 pb-1.5 text-purple-400 font-mono">
            <span>Structured FAQ Analysis</span>
            <span>Knowledge Base Verified</span>
          </div>
          <div className="p-2 bg-purple-950/20 text-zinc-300 rounded border border-purple-900/50">
            <span className="font-bold text-white block">Prospect Q:</span>
            "Is there a service call trip fee?"
          </div>
          <div className="p-2 bg-zinc-900 text-zinc-200 rounded">
            <span className="font-bold text-emerald-400 block">AI Reply:</span>
            "Yes! Our diagnostic trip fee is $79, which is 100% credited toward any repair we perform today."
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Step 4: Automated Booking",
      tagline: "Schedule Lock-in",
      description: "The assistant queries your calendar availability (such as ServiceTitan or Google Calendar) and schedules the appointment slot into your books directly.",
      icon: CalendarCheck2,
      color: "from-amber-500 to-orange-400",
      mockVisual: (
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 font-mono text-[11px] space-y-2">
          <div className="text-zinc-500 flex justify-between border-b border-zinc-900 pb-1.5 font-sans font-medium">
            <span>Available Windows</span>
            <span className="text-teal-400">Synced</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            <div className="p-2 bg-zinc-900 rounded border border-zinc-800 text-zinc-400">
              Wed 9:00 AM (Taken)
            </div>
            <div className="p-2 bg-emerald-950/40 text-emerald-300 rounded border border-emerald-500/30 font-semibold animate-pulse text-center">
              Thu 2:00 PM (LOCKED)
            </div>
          </div>
          <div className="text-[10px] text-zinc-600 text-center font-sans">
            Appointment locked & confirmed!
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Step 5: Owner Alerted",
      tagline: "Instant Dispatch",
      description: "The business owner receives a push notification, email, or webhook sync containing full lead profiles and structured visit details.",
      icon: BellRing,
      color: "from-blue-500 to-cyan-400",
      mockVisual: (
        <div className="bg-zinc-900/40 p-4 rounded-xl border border-blue-900/40 font-sans space-y-2.5 text-xs">
          <div className="flex items-center gap-2 text-blue-400 font-bold">
            <BellRing className="w-4 h-4 animate-bounce text-blue-400" />
            <span>New Appointment Confirmed</span>
          </div>
          <div className="space-y-1 text-zinc-300 font-mono text-[11px]">
            <div>• CUSTOMER: John Miller</div>
            <div>• PROBLEM: AC Unit Leak Fan</div>
            <div>• SCHEDULED: Thu @ 2:00 PM</div>
            <div>• SYSTEM: Synced to CRM</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row gap-8 items-stretch pt-2">
      {/* Left Stepper Selection Timeline */}
      <div className="flex-1 space-y-3">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              onMouseEnter={() => setActiveStep(step.id)}
              className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                isActive
                  ? "bg-zinc-800/60 border-emerald-500/40 shadow-xl shadow-emerald-950/10"
                  : "bg-zinc-950/30 border-zinc-900 hover:bg-zinc-805/20 hover:border-zinc-800"
              }`}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${isActive ? step.color + " text-zinc-950 scale-105" : "bg-zinc-900 text-zinc-400"} transition-all shrink-0`}>
                <StepIcon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded ${
                    isActive ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-900 text-zinc-400"
                  }`}>
                    {step.tagline}
                  </span>
                  
                  {isActive && (
                    <span className="flex items-center gap-0.5 text-xs text-emerald-400 font-sans font-medium">
                      Active <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                
                <h4 className={`text-base font-bold tracking-tight mt-1.5 ${isActive ? "text-white" : "text-zinc-300"}`}>
                  {step.title}
                </h4>
                
                <p className="text-zinc-400 text-xs sm:text-sm mt-1 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Visual Simulator Window Panel */}
      <div className="w-full xl:w-1/3 flex flex-col justify-center items-stretch bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden min-h-[350px]">
        {/* Decorative Grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/60 via-zinc-950 to-zinc-950 -z-10" />
        
        <div className="absolute top-4 left-6 flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive Visual Sandbox</span>
        </div>

        {/* Dynamic active step detail showcase */}
        <div className="space-y-4 mt-6">
          <div className="text-center">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">
              Visual Simulation #{activeStep}
            </span>
            <h4 className="text-lg font-bold text-white mt-1">
              {steps[activeStep - 1].tagline}
            </h4>
          </div>

          <div className="transform hover:scale-[1.02] transition-transform duration-300 my-4">
            {steps[activeStep - 1].mockVisual}
          </div>

          <p className="text-zinc-500 text-xs text-center italic">
            "We handle the booking. You keep focused on the billing."
          </p>
        </div>
      </div>
    </div>
  );
}
