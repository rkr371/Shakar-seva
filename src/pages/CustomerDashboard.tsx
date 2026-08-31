import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Bot, MapPin, Star, CheckCircle2, Search, ArrowRight, Zap, Droplets, Hammer, Paintbrush, Trash2, TreePine, Car, Heart, Wrench } from 'lucide-react';
import { cn } from '../lib/utils';
import { Worker } from '../types';

const SERVICES = [
  { id: 'electrician', name: 'Electrician', icon: Zap },
  { id: 'plumber', name: 'Plumber', icon: Droplets },
  { id: 'carpenter', name: 'Carpenter', icon: Hammer },
  { id: 'painter', name: 'Painter', icon: Paintbrush },
  { id: 'cleaner', name: 'Cleaner', icon: Trash2 },
  { id: 'gardener', name: 'Gardener', icon: TreePine },
  { id: 'driver', name: 'Driver', icon: Car },
  { id: 'caregiver', name: 'Caregiver', icon: Heart },
  { id: 'technician', name: 'Technician', icon: Wrench },
];

export function CustomerDashboard() {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [showWorkers, setShowWorkers] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const { workers, addBooking } = useStore();

  const handleUnderstand = () => {
    if (!query) return;
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setAiResult({
        service: 'Plumbing',
        issue: 'Kitchen pipe leakage',
        priority: 'Normal',
        estimatedDuration: '1–2 hours'
      });
    }, 1500);
  };

  const handleBook = () => {
    if (!selectedWorker) return;
    
    addBooking({
      id: `AH-DEMO-${Math.floor(Math.random() * 10000)}`,
      service: 'Kitchen pipe repair',
      workerId: selectedWorker.id,
      customerId: 'cust-1',
      date: 'Today',
      time: '4:00 PM',
      status: 'Pending',
      estimatedAmount: 450,
      location: 'Customer selected location',
      coordinates: [21.175, 72.835]
    });
    
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8 flex flex-col gap-8">
      
      {!aiResult && !bookingConfirmed && (
        <>
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">How can we help you today?</h1>
            <p className="text-lg text-slate-500">Describe your problem, and our AI will find the best verified cooperative workers for you.</p>
          </div>

          <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex items-center relative z-10 transition-shadow focus-within:shadow-xl focus-within:border-teal-500">
            <div className="p-4 text-slate-400">
              <Bot className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Describe what you need in your own words... (e.g. 'My kitchen pipe is leaking')" 
              className="flex-1 bg-transparent border-none focus:ring-0 text-lg text-slate-700 placeholder-slate-400 py-4"
            />
            <button 
              onClick={handleUnderstand}
              disabled={!query || isProcessing}
              className="ml-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Understanding...
                </>
              ) : (
                <>Understand with AI</>
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 pt-8">
            {SERVICES.map(service => (
              <button key={service.id} onClick={() => setQuery(`I need a ${service.name.toLowerCase()}`)} className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all text-slate-600 hover:text-teal-600">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-current">
                  <service.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">{service.name}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {aiResult && !showWorkers && !bookingConfirmed && (
        <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">AI UNDERSTOOD</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="text-sm text-slate-500 block mb-1">Service</span>
                  <span className="font-semibold text-slate-900">{aiResult.service}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="text-sm text-slate-500 block mb-1">Issue</span>
                  <span className="font-semibold text-slate-900">{aiResult.issue}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="text-sm text-slate-500 block mb-1">Priority</span>
                  <span className="font-semibold text-orange-600">{aiResult.priority}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl">
                  <span className="text-sm text-slate-500 block mb-1">Estimated Duration</span>
                  <span className="font-semibold text-slate-900">{aiResult.estimatedDuration}</span>
                </div>
              </div>
              <button 
                onClick={() => setShowWorkers(true)}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-medium transition-colors mt-4 text-lg flex items-center justify-center gap-2"
              >
                Find Best Workers
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showWorkers && !selectedWorker && !bookingConfirmed && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Nearby Verified Workers</h2>
            <div className="flex gap-2">
              <select className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 focus:ring-teal-500 focus:border-teal-500">
                <option>Sort by: Match Score</option>
                <option>Sort by: Distance</option>
                <option>Sort by: Rating</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workers.filter(w => w.skill === aiResult.service || w.skill === 'Plumbing').map((worker, idx) => (
              <div key={worker.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedWorker(worker)}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{worker.name}</h3>
                    <p className="text-sm text-slate-500">Verified {worker.skill}</p>
                  </div>
                  {idx === 0 && (
                     <div className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-md">
                       94% MATCH
                     </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                    <span className="font-medium">{worker.rating}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{worker.distance} km</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span>{worker.status}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-700">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>{worker.experience} yrs</span>
                  </div>
                </div>

                {idx === 0 && (
                  <div className="bg-slate-50 rounded-xl p-3 mb-6 flex-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">Why this match?</span>
                    <ul className="space-y-1.5">
                      <li className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Skill match</li>
                      <li className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Nearby & Available</li>
                      <li className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Cooperative Certified</li>
                    </ul>
                  </div>
                )}
                
                <button className={cn("w-full py-3 rounded-xl font-medium mt-auto", idx === 0 ? "bg-teal-600 text-white hover:bg-teal-700" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}>
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedWorker && !bookingConfirmed && (
        <div className="max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button onClick={() => setSelectedWorker(null)} className="text-sm text-slate-500 hover:text-slate-900 mb-6 flex items-center gap-1">
             &larr; Back to matches
          </button>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{selectedWorker.name}</h1>
                  <p className="text-lg text-slate-500 flex items-center gap-2">
                    Verified Cooperative Worker
                    <ShieldCheck className="w-5 h-5 text-teal-500" />
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900 flex items-center justify-end gap-1">
                    <Star className="w-6 h-6 fill-orange-400 text-orange-400" />
                    {selectedWorker.rating}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{selectedWorker.completedJobs} jobs completed</p>
                </div>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">{selectedWorker.skill}</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">Pipe Repair</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">Water Systems</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Verification</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-500" /> Identity Verified</li>
                    <li className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-500" /> Cooperative Verified</li>
                    <li className="text-sm text-slate-700 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-teal-500" /> Skill Verified</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Cooperative</h3>
                  <p className="text-slate-900 font-medium">{selectedWorker.cooperative}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
                  Fair Earnings Estimate
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-2 py-0.5 rounded uppercase">Illustrative Demo Pricing</span>
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Service</span>
                    <span className="font-semibold text-slate-900">₹450</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-500">Worker earning (85%)</span>
                      <span className="font-medium text-slate-700">₹380</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-500">Cooperative (9%)</span>
                      <span className="font-medium text-slate-700">₹40</span>
                    </div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-slate-500">Platform Ops (4%)</span>
                      <span className="font-medium text-slate-700">₹20</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-teal-600 font-medium flex items-center gap-1"><Heart className="w-3 h-3" /> Welfare Fund (2%)</span>
                      <span className="font-medium text-teal-600">₹10</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleBook}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-teal-500/20 transition-all"
                >
                  Book {selectedWorker.name.split(' ')[0]} Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bookingConfirmed && (
        <div className="max-w-md mx-auto w-full text-center space-y-6 animate-in zoom-in-95 duration-500 py-12">
          <div className="w-24 h-24 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Booking Confirmed</h2>
          <p className="text-slate-500">Your request has been sent to the cooperative worker.</p>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-left space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500">Booking ID</span>
              <span className="font-mono font-medium text-slate-900">AH-DEMO-1024</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500">Service</span>
              <span className="font-medium text-slate-900">Kitchen pipe repair</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500">Worker</span>
              <span className="font-medium text-slate-900">Ramesh Patel</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <span className="text-slate-500">Time</span>
              <span className="font-medium text-slate-900">Today, 4:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Status</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                Worker confirmation pending
              </span>
            </div>
          </div>
          
          <button onClick={() => window.location.reload()} className="text-teal-600 font-medium hover:text-teal-700">
            Track Service
          </button>
        </div>
      )}

    </div>
  );
}

// Temporary ShieldCheck mock since I forgot to import it initially
function ShieldCheck(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
}
function Briefcase(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
}
