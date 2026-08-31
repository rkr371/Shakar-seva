import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Users, Briefcase, IndianRupee, ShieldCheck, Activity, ArrowUpRight, ArrowDownRight, Bot, Share2, Check, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { cn } from '../lib/utils';

const DEMAND_DATA = [
  { name: 'Mon', plumbing: 12, electrical: 8, cleaning: 15, carpentry: 5 },
  { name: 'Tue', plumbing: 15, electrical: 10, cleaning: 18, carpentry: 6 },
  { name: 'Wed', plumbing: 14, electrical: 9, cleaning: 16, carpentry: 4 },
  { name: 'Thu', plumbing: 18, electrical: 12, cleaning: 20, carpentry: 7 },
  { name: 'Fri', plumbing: 23, electrical: 15, cleaning: 25, carpentry: 8 },
  { name: 'Sat', plumbing: 28, electrical: 18, cleaning: 30, carpentry: 10 },
  { name: 'Sun', plumbing: 25, electrical: 14, cleaning: 22, carpentry: 9 },
];

const SKILL_DATA = [
  { name: 'Electricians', required: 48, available: 31 },
  { name: 'Plumbers', required: 35, available: 42 },
  { name: 'Cleaners', required: 80, available: 75 },
  { name: 'Carpenters', required: 15, available: 20 },
];

export function FederationDashboard() {
  const { bookings } = useStore();
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [allocationApproved, setAllocationApproved] = useState(false);

  // Derive active jobs from bookings
  const activeJobs = 327 + bookings.filter(b => b.status !== 'Pending' && b.status !== 'Completed').length;

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 flex flex-col gap-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Federation Command Center</h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            Real-time cooperative workforce intelligence
            <span className="bg-orange-100 text-orange-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded">Illustrative Prototype Data</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Generate Report</button>
           <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center gap-2">
             <Bot className="w-4 h-4" /> AI Insights
           </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Workers', value: '2,486', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12 This Week' },
          { label: 'Available', value: '684', icon: Activity, color: 'text-green-600', bg: 'bg-green-100', trend: '27% Capacity' },
          { label: 'Active Jobs', value: activeJobs.toString(), icon: Briefcase, color: 'text-orange-600', bg: 'bg-orange-100', trend: '84% Utilization' },
          { label: 'Today\'s Value', value: '₹8.42 L', icon: IndianRupee, color: 'text-teal-600', bg: 'bg-teal-100', trend: 'Today\'s Projected' },
          { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100', trend: 'Excellent' },
          { label: 'Welfare Fund', value: '91.4%', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: 'Coverage' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <p className="text-xs text-slate-500 font-medium uppercase">{kpi.label}</p>
              <div className={cn("w-6 h-6 rounded flex items-center justify-center", kpi.bg, kpi.color)}>
                 <kpi.icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mt-1 text-slate-900">{kpi.value}</h3>
            <div className={cn("text-[10px] font-bold mt-1", kpi.color)}>{kpi.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">AI Demand Forecast (7 Days)</h3>
                <p className="text-sm text-slate-500">Illustrative AI forecast for prototype demonstration</p>
              </div>
              <div className="flex gap-4 text-sm font-medium">
                <span className="flex items-center gap-1 text-teal-600"><ArrowUpRight className="w-4 h-4"/> Plumbing +23%</span>
                <span className="flex items-center gap-1 text-orange-600"><ArrowDownRight className="w-4 h-4"/> Carpentry -8%</span>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DEMAND_DATA}>
                  <defs>
                    <linearGradient id="colorPlumbing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Area type="monotone" dataKey="plumbing" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorPlumbing)" />
                  <Area type="monotone" dataKey="cleaning" stroke="#3b82f6" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">AI Insight</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Plumbing demand is expected to increase rapidly in Zone 3 over the weekend. Current local workforce capacity may be insufficient to meet SLAs.
                </p>
                <button 
                  onClick={() => window.scrollTo({top: 800, behavior: 'smooth'})}
                  className="text-teal-600 font-medium text-sm hover:text-teal-700 flex items-center gap-1"
                >
                  View Exchange Recommendation <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Skill Gap Analysis</h3>
                <p className="text-sm text-slate-500">Required vs Available workers by trade</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SKILL_DATA} layout="vertical" margin={{top: 0, right: 0, left: 30, bottom: 0}}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="required" fill="#f97316" radius={[0, 4, 4, 0]} barSize={12} name="Required Demand" />
                  <Bar dataKey="available" fill="#0d9488" radius={[0, 4, 4, 0]} barSize={12} name="Available Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: Key Innovation - Exchange */}
        <div className="space-y-8">
          
          <div className="bg-teal-900 text-white rounded-2xl p-5 shadow-xl relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 p-3 opacity-10 text-4xl">🤖</div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-2 text-teal-300 mb-2">
                <span className="text-xs font-bold tracking-widest uppercase">AI Recommendation</span>
                <div className="h-px flex-1 bg-teal-800"></div>
              </div>

              {!allocationApproved ? (
                <>
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold mb-1">Workforce Shortage Detected</h4>
                    <p className="text-sm text-teal-100 opacity-80 leading-relaxed">
                      Demand in Zone 3 (Electrical) is 300% above current capacity. Society A has a surplus of 8 electricians.
                    </p>
                    
                    <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-teal-300">Suggested Allocation</span>
                        <span className="text-sm font-bold">Move 4 Electricians to Society B</span>
                      </div>
                      <button 
                        onClick={() => setShowAllocationModal(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg"
                      >
                        APPROVE NOW
                      </button>
                    </div>

                  </div>

                  <div className="mt-4 text-center">
                    <button className="text-[10px] text-teal-400 hover:text-white font-medium py-2 transition-colors uppercase tracking-widest">
                      Dismiss Recommendation
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Allocation Approved</h3>
                  <p className="text-slate-400">4 workers successfully allocated to Society B. Notifications dispatched.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Workforce Utilization</h3>
            <div className="flex items-center justify-center relative w-48 h-48 mx-auto">
              {/* Fake Donut Chart with CSS */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-slate-100" />
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="20" fill="transparent" strokeDasharray="502" strokeDashoffset="80" className="text-teal-600" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900">84%</span>
                <span className="text-xs font-semibold text-slate-500 uppercase">Utilized</span>
              </div>
            </div>
            <div className="mt-6 flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                <span className="text-slate-600 font-medium">Active (2,088)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <span className="text-slate-600 font-medium">Idle (398)</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {showAllocationModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" /> Action Requires Approval
              </h3>
              <button onClick={() => setShowAllocationModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-orange-50 border border-orange-100 text-orange-800 p-4 rounded-xl text-sm mb-6">
                You are approving a cross-cooperative workforce reallocation. This action will notify 4 workers and update availability across zones.
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-slate-500">Workers proposed:</div>
                <div className="font-semibold text-slate-900">4</div>
                
                <div className="text-slate-500">Skill:</div>
                <div className="font-semibold text-slate-900">Electrical</div>
                
                <div className="text-slate-500">Origin:</div>
                <div className="font-semibold text-slate-900">Society A (Bardoli)</div>
                
                <div className="text-slate-500">Destination:</div>
                <div className="font-semibold text-slate-900">Society B (Zone 3)</div>
                
                <div className="text-slate-500">Reason:</div>
                <div className="font-semibold text-slate-900">Demand shortage projection</div>
                
                <div className="text-slate-500">Duration:</div>
                <div className="font-semibold text-slate-900">Suggested temporary allocation (48h)</div>
                
                <div className="text-slate-500">Risk Level:</div>
                <div className="font-semibold text-orange-600">Medium</div>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
               <button 
                  onClick={() => {
                    setAllocationApproved(true);
                    setShowAllocationModal(false);
                  }}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  Approve Allocation
                </button>
                <button onClick={() => setShowAllocationModal(false)} className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-3 rounded-xl transition-colors">
                  Reject
                </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Ensure icons used exist or mock them
function Star(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function ArrowRight(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
