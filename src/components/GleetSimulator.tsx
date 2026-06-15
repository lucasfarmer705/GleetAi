import { useState, useEffect, useRef } from "react";
import { ChatMessage, IndustryType, IndustryOption } from "../types";
import { MessageSquare, Phone, Send, ShieldCheck, RefreshCw, Zap, Building2, Droplets, Flame, ArrowRight } from "lucide-react";

const INDUSTRIES: IndustryOption[] = [
  {
    value: "hvac",
    label: "HVAC & AC Repair",
    icon: "hvac",
    description: "Sample scheduling for Elite Air Solutions",
    samplePrompt: "Hi, my living room AC stopped blowing cold air. Are you guys available tomorrow morning for a repair?"
  },
  {
    value: "plumbing",
    label: "Local Plumbing",
    icon: "plumbing",
    description: "Emergency scheduling for FlowForce Plumbers",
    samplePrompt: "Hey! There's water pooling around my water heater in the basement. Can someone get here today?"
  },
  {
    value: "realestate",
    label: "Real Estate Listing",
    icon: "realestate",
    description: "Property viewing scheduler for Apex Homes Group",
    samplePrompt: "Hello, I'd love to schedule a viewing of the Elm Street 3-bedroom property. Do you have any slots Saturday?"
  },
  {
    value: "general",
    label: "General SaaS Bot",
    icon: "general",
    description: "Gleet AI representative",
    samplePrompt: "How does Gleet AI connect to my job booking software like Housecall Pro or ServiceTitan?"
  }
];

export default function GleetSimulator() {
  const [industry, setIndustry] = useState<IndustryType>("hvac");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botSource, setBotSource] = useState<"gemini-api" | "fallback-smart-rule" | null>(null);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize preset-specific intro message when changing industry
  useEffect(() => {
    let welcomeMessage = "";
    switch (industry) {
      case "hvac":
        welcomeMessage = "Hello! Thanks for reaching out to Elite Air Solutions. I can help resolve your heating or AC issues right away. What kind of issue are you experiencing today?";
        break;
      case "plumbing":
        welcomeMessage = "Hi! Welcome to FlowForce Plumbers. What's the plumbing project or leak I can schedule for you?";
        break;
      case "realestate":
        welcomeMessage = "Hello! Thank you for inquiring about Apex Homes Group listings. Which specific property or neighborhood are you interested in viewing?";
        break;
      default:
        welcomeMessage = "Welcome to Gleet AI! I'm an example of our live customer booking assistant. How does your service business currently handle web and SMS leads?";
    }

    setMessages([
      {
        id: "intro",
        sender: "bot",
        content: welcomeMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setBotSource(null);
  }, [industry]);

  // Scroll chat window to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: "user_" + Date.now(),
      sender: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      // Assemble the dialogue history payload
      const payloadHistory = [...messages, userMsg].map(m => ({
        sender: m.sender,
        content: m.content
      }));

      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          industry,
          messages: payloadHistory
        })
      });

      if (!res.ok) {
        throw new Error("Simulation server error");
      }

      const data = await res.json();
      
      // Simulate real-life natural timing (700ms latency)
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: "bot_" + Date.now(),
            sender: "bot",
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setBotSource(data.source);
        setIsTyping(false);
      }, 750);

    } catch (err) {
      console.error(err);
      // Fallback in case of server connection failure
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: "bot_err_" + Date.now(),
            sender: "bot",
            content: "Got it! I am locking in that slot for you in our book as we speak. Can I please confirm your best name and cell number?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        setBotSource("fallback-smart-rule");
        setIsTyping(false);
      }, 800);
    }
  };

  const getIndustryIcon = (val: IndustryType) => {
    switch (val) {
      case "hvac": return <Flame className="w-4 h-4 text-emerald-500" />;
      case "plumbing": return <Droplets className="w-4 h-4 text-sky-500" />;
      case "realestate": return <Building2 className="w-4 h-4 text-amber-500" />;
      default: return <MessageSquare className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch pt-2">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        <div>
          <h4 className="text-zinc-400 text-xs font-mono tracking-widest uppercase mb-1">Interactive Sandbox</h4>
          <h3 className="text-2xl font-bold tracking-tight text-white">Select a Business Persona</h3>
          <p className="text-zinc-400 text-sm mt-1">
            Toggle industries below to test how Gleet AI converses like a seasoned office dispatcher for different service firms.
          </p>
        </div>

        <div className="space-y-2 mt-2">
          {INDUSTRIES.map((option) => (
            <button
              key={option.value}
              onClick={() => setIndustry(option.value)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-start gap-3 ${
                industry === option.value
                  ? "bg-zinc-800/80 border-emerald-500/50 text-white shadow-lg shadow-emerald-950/20"
                  : "bg-zinc-900/40 border-zinc-800/80 text-zinc-300 hover:bg-zinc-800/30 hover:border-zinc-700"
              }`}
            >
              <div className={`p-2 rounded-lg ${industry === option.value ? "bg-emerald-500/10 text-emerald-400" : "bg-zinc-800 text-zinc-400"}`}>
                {getIndustryIcon(option.value)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold flex items-center gap-1.5">
                  {option.label}
                  {industry === option.value && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <div className="text-xs text-zinc-500 truncate mt-0.5">{option.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Dynamic Sample Starter Box */}
        <div className="bg-zinc-950/80 border border-zinc-900 rounded-xl p-4 mt-1">
          <label className="text-zinc-500 text-xs font-mono block mb-1">Prospect Inbound Ticket Simulator</label>
          <p className="text-xs text-zinc-300 mb-3">
            Simulate an customer inquiry with one click:
          </p>
          <button
            onClick={() => handleSendMessage(INDUSTRIES.find(o => o.value === industry)!.samplePrompt)}
            className="w-full text-xs bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 hover:text-white transition-all py-2.5 px-3 rounded-lg text-left flex items-start gap-2 group"
          >
            <Zap className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="line-clamp-2">"{INDUSTRIES.find(o => o.value === industry)!.samplePrompt}"</span>
          </button>
        </div>
      </div>

      {/* Primary Simulator Screen Panel (Smartphone UI Rendering) */}
      <div className="flex-1 flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500" />
        
        {/* Smartphone Header Navigation Bar */}
        <div className="bg-zinc-900/90 border-b border-zinc-800/80 px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
              {getIndustryIcon(industry)}
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-100 font-sans tracking-tight">
                {industry === "hvac" && "Elite Air Solutions (AC Repair)"}
                {industry === "plumbing" && "FlowForce Plumbing Dispatch"}
                {industry === "realestate" && "Apex Homes Viewings"}
                {industry === "general" && "Gleet AI Interactive System"}
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">Gleet Agent Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => {
                setMessages([]);
                setTimeout(() => setIndustry(industry), 10);
              }}
              className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
              title="Reset Simulated Chat Session"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread Body panel */}
        <div className="flex-1 p-4 space-y-3.5 overflow-y-auto max-h-[420px] min-h-[340px] bg-gradient-to-b from-zinc-950 to-zinc-900/70 scrollbar-thin">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
              <div className="text-[10px] text-zinc-600 font-mono tracking-wider mb-1 px-1">
                {msg.sender === "user" ? "CUSTOMER" : "GLEET AI BOT"}
              </div>
              <div
                className={`max-w-[85%] text-sm rounded-2xl px-4 py-2.5 shadow-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : "bg-zinc-800 text-zinc-100 rounded-tl-none border border-zinc-750"
                }`}
              >
                {msg.content}
              </div>
              <div className="text-[9px] text-zinc-600 mt-0.5 px-1 font-mono">
                {msg.timestamp}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col items-start bg-zinc-950/50">
              <div className="text-[10px] text-zinc-600 font-mono tracking-wider mb-1 px-1">GLEET AI BOT</div>
              <div className="bg-zinc-800/60 border border-zinc-800 text-zinc-400 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          
          <div ref={chatBottomRef} />
        </div>

        {/* Message Box Input footer panel */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputText);
          }}
          className="p-3 bg-zinc-900/70 border-t border-zinc-800/80 flex gap-2 items-center"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            placeholder={`Ask anything to schedule a job (e.g. \"need AC fix next Tuesday\")...`}
            className="flex-1 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl text-xs text-zinc-100 placeholder-zinc-550 px-3.5 py-3 outline-none transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white disabled:text-zinc-600 rounded-xl transition-all shadow-md shadow-emerald-900/10 cursor-pointer disabled:cursor-not-allowed group flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>

        {/* LLM Status footer confirmation metadata (Hides absolute complexity) */}
        <div className="bg-zinc-900/90 py-2.5 px-4 text-[10px] border-t border-zinc-800/60 text-zinc-500 flex items-center justify-between font-mono">
          <div className="flex items-center gap-1 text-emerald-500/80">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>Response latency: ~0.8s</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>
              {botSource === "gemini-api" ? (
                <span className="text-zinc-300 font-medium">⚡ Gemini AI Engine Live</span>
              ) : botSource === "fallback-smart-rule" ? (
                <span>Smart Simulator Rules</span>
              ) : (
                <span>Interactive Sandboxed Mock Mode</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
