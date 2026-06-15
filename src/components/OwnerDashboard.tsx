import { useState, useEffect } from "react";
import { Lead } from "../types";
import { Calendar, Users, Percent, Clock, Inbox, ChevronRight, FileSpreadsheet, RefreshCw, Layers, Shield } from "lucide-react";

export default function OwnerDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
      }
    } catch (err) {
      console.error("Error loading leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // Auto refresh every 10 seconds to make testing interactive
    const interval = setInterval(fetchLeads, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredLeads = leads.filter((lead) => {
    if (filter === "all") return true;
    return lead.industry.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="w-full text-zinc-100 bg-zinc-950/80 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl">
      {/* Upper Brand Info bar */}
      <div className="p-5 bg-gradient-to-r from-zinc-900 to-zinc-950 border-b border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-400" /> Administrative Sandbox Gateway
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight mt-1">Gleet AI Client Portal Simulator</h3>
          <p className="text-xs text-zinc-400">
            This live panel demonstrates the central dispatch metrics of service owners who use Gleet AI.
          </p>
        </div>
        <button
          onClick={fetchLeads}
          disabled={loading}
          className="flex items-center gap-2 text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg py-2 px-3 transition-all disabled:opacity-50 text-emerald-400 hover:text-white cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-zinc-400" : ""}`} />
          <span>Refresh Database</span>
        </button>
      </div>

      {/* Grid of Key Numerical Analytics Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-zinc-900 divide-x divide-y divide-zinc-900 bg-zinc-950/40">
        <div className="p-4 sm:p-5 flex flex-col">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Inbox className="w-4 h-4 text-emerald-500" /> Leads Ingested
          </span>
          <span className="text-2xl sm:text-3xl font-bold mt-2 font-mono text-white">
            {leads.length} <span className="text-xs text-zinc-600 font-sans font-normal">total</span>
          </span>
          <span className="text-[10px] text-zinc-500 mt-1 leading-none">Captured 24/7/365</span>
        </div>

        <div className="p-4 sm:p-5 flex flex-col">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Clock className="w-4 h-4 text-indigo-400" /> Response speed
          </span>
          <span className="text-2xl sm:text-3xl font-bold mt-2 font-mono text-emerald-400">
            &lt; 15 <span className="text-xs font-sans font-normal text-zinc-400">seconds</span>
          </span>
          <span className="text-[10px] text-zinc-500 mt-1 leading-none">Instant customer outreach</span>
        </div>

        <div className="p-4 sm:p-5 flex flex-col">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Percent className="w-4 h-4 text-sky-400" /> Conversion lift
          </span>
          <span className="text-2xl sm:text-3xl font-bold mt-2 font-mono text-white">
            +38%
          </span>
          <span className="text-[10px] text-emerald-500 mt-1 leading-none">Eliminated phone drop-offs</span>
        </div>

        <div className="p-4 sm:p-5 flex flex-col">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 leading-none">
            <Calendar className="w-4 h-4 text-amber-500" /> Automated Books
          </span>
          <span className="text-2xl sm:text-3xl font-bold mt-2 font-mono text-white">
            {Math.max(0, Math.ceil(leads.length * 0.7))} <span className="text-xs text-zinc-600 font-sans font-normal">jobs</span>
          </span>
          <span className="text-[10px] text-emerald-500 mt-1 leading-none">Synced with calendars</span>
        </div>
      </div>

      {/* Filter and Table structure */}
      <div className="p-4 sm:p-5 bg-zinc-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h4 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" /> Intake Ledger (Live Data)
          </h4>
          
          <div className="flex gap-1.5 overflow-x-auto pb-1.5 sm:pb-0">
            {["all", "hvac", "plumbing", "real estate", "other"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`text-[11px] font-medium tracking-wide border px-2.5 py-1 rounded-md transition-all whitespace-nowrap uppercase cursor-pointer ${
                  filter === f
                    ? "bg-zinc-800 border-zinc-700 text-white font-semibold"
                    : "bg-transparent border-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic List */}
        {filteredLeads.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-zinc-900 rounded-xl bg-zinc-900/10">
            <Inbox className="w-8 h-8 text-zinc-700 mx-auto mb-2" />
            <p className="text-sm text-zinc-500 font-medium">No leads submitted in this category yet.</p>
            <p className="text-xs text-zinc-650 mt-1">Submit the Demo Request form above to trigger a live sync check!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-900 text-zinc-500 uppercase tracking-widest font-mono text-[10px]">
                  <th className="py-2.5 px-3">Company / Inquirer</th>
                  <th className="py-2.5 px-3">Industry</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Contact Payload</th>
                  <th className="py-2.5 px-3">Date Captured</th>
                  <th className="py-2.5 px-3 text-right">Gleet AI Pipeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-900/30 group transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-zinc-200">{lead.businessName}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{lead.name}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="bg-zinc-900 border border-zinc-800/80 text-zinc-350 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                        {lead.industry}
                      </span>
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell">
                      <div className="text-zinc-300 font-mono text-[11px]">{lead.email}</div>
                      <div className="text-zinc-500 text-[10px] tracking-wide mt-0.5 font-mono">{lead.phone || "No phone"}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-zinc-400 font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-zinc-600 text-[10px] mt-0.5 font-mono">
                        {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wide">
                          Demo Booked
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-700 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="p-4 bg-zinc-900/30 border-t border-zinc-900 text-center text-[11px] text-zinc-500 flex flex-col sm:flex-row justify-between gap-2">
        <div className="flex items-center justify-center sm:justify-start gap-1">
          <FileSpreadsheet className="w-3.5 h-3.5 text-zinc-500" />
          <span>PostgreSQL & Salesforce-ready webhook triggers enabled.</span>
        </div>
        <div>
          <span>Database File: <code className="text-zinc-400 bg-zinc-900 px-1 py-0.5 rounded">/leads.json</code></span>
        </div>
      </div>
    </div>
  );
}
