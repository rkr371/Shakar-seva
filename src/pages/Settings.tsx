import React from 'react';
import { Shield, Lock, Globe, Bell, Users, CheckCircle2 } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Platform Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar */}
        <div className="space-y-1">
          {[
            { name: 'Security & Access', icon: Shield, active: true },
            { name: 'Language & Region', icon: Globe, active: false },
            { name: 'Notifications', icon: Bell, active: false },
            { name: 'Worker Verification', icon: Users, active: false },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                item.active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-8">
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
             <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Shield className="w-6 h-6 text-teal-600" />
               Security Architecture
             </h2>
             
             <div className="space-y-4">
               {[
                 { title: 'Verified Worker Identity', desc: 'UIDAI/Aadhaar mocked integration for identity check' },
                 { title: 'Secure Authentication', desc: 'OAuth and JWT based session management' },
                 { title: 'Role-based Access Control', desc: 'Strict separation between Customer, Worker, and Federation Admin' },
                 { title: 'Audit Logging', desc: 'Immutable logs for AI decisions and manual overrides' },
                 { title: 'Approval-controlled Actions', desc: 'AI cannot execute cross-cooperative swaps without human admin approval' },
               ].map((sec, i) => (
                 <div key={i} className="flex gap-3">
                   <div className="mt-0.5"><CheckCircle2 className="w-5 h-5 text-teal-500" /></div>
                   <div>
                     <div className="font-semibold text-slate-900 text-sm">{sec.title}</div>
                     <div className="text-sm text-slate-500">{sec.desc}</div>
                   </div>
                 </div>
               ))}
             </div>
             <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
               * UI simulation for hackathon prototype purposes.
             </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
             <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Globe className="w-6 h-6 text-teal-600" />
               Multilingual UX
             </h2>
             <div className="space-y-4 max-w-sm">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Interface Language</label>
                 <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-teal-500 focus:border-teal-500">
                   <option>English</option>
                   <option>Hindi (हिन्दी)</option>
                   <option>Gujarati (ગુજરાતી)</option>
                 </select>
               </div>
               <p className="text-sm text-slate-500">
                 The prototype demonstrates that the interface is designed for local accessibility. Full translation requires backend localization service.
               </p>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
