import React from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle2, MapPin, Navigation, Clock, CreditCard, Star, Activity, AlertCircle } from 'lucide-react';

export function WorkerDashboard() {
  const { bookings, updateBookingStatus } = useStore();
  
  // Find pending booking for Ramesh (w1)
  const myPendingBooking = bookings.find(b => b.workerId === 'w1' && b.status === 'Pending');
  const myActiveBooking = bookings.find(b => b.workerId === 'w1' && b.status !== 'Pending' && b.status !== 'Completed');

  const handleStatusChange = (id: string, newStatus: any) => {
    updateBookingStatus(id, newStatus);
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 py-8 flex flex-col gap-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome, Ramesh</h1>
          <p className="text-slate-500">Bardoli Labour Cooperative Society</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 font-medium">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
          Available for Work
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-2"><Activity className="w-4 h-4"/> Today's Jobs</div>
          <div className="text-3xl font-bold text-slate-900">{myActiveBooking ? '1' : (myPendingBooking ? '0 (1 Pending)' : '0')}</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Completed</div>
          <div className="text-3xl font-bold text-slate-900">342</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-2"><Star className="w-4 h-4 text-orange-400"/> Rating</div>
          <div className="text-3xl font-bold text-slate-900">4.8</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-2"><CreditCard className="w-4 h-4"/> Earnings</div>
          <div className="text-3xl font-bold text-teal-600">₹2,450</div>
        </div>
      </div>

      {myPendingBooking && !myActiveBooking && (
        <div className="bg-teal-900 text-white rounded-2xl shadow-lg border border-teal-800 p-6 md:p-8 animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 text-teal-300 font-semibold mb-4">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            NEW SERVICE REQUEST
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-1">{myPendingBooking.service}</h3>
              <p className="text-teal-200 flex items-center gap-2"><MapPin className="w-4 h-4" /> 1.8 km away</p>
            </div>
            <div>
              <p className="text-teal-300 text-sm uppercase tracking-wider mb-1">Time</p>
              <p className="font-semibold text-xl flex items-center gap-2"><Clock className="w-5 h-5" /> {myPendingBooking.date}, {myPendingBooking.time}</p>
            </div>
            <div>
              <p className="text-teal-300 text-sm uppercase tracking-wider mb-1">Estimated Earning</p>
              <p className="font-bold text-3xl">₹380 <span className="text-sm font-normal text-teal-300">/ ₹{myPendingBooking.estimatedAmount}</span></p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => handleStatusChange(myPendingBooking.id, 'Job Accepted ✓')}
              className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-xl transition-colors text-lg"
            >
              Accept Job
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 transition-colors">
              Decline
            </button>
          </div>
        </div>
      )}

      {myActiveBooking && (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" /> Current Active Job
            </h2>
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              {myActiveBooking.status}
            </span>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{myActiveBooking.service}</h3>
                <p className="text-slate-500 flex items-center gap-2"><MapPin className="w-5 h-5" /> {myActiveBooking.location} (1.8 km)</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 uppercase tracking-wider mb-1">Earning</p>
                <p className="text-2xl font-bold text-teal-600">₹380</p>
              </div>
            </div>

            {/* Workflow Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {myActiveBooking.status === 'Job Accepted ✓' && (
                <button 
                  onClick={() => handleStatusChange(myActiveBooking.id, 'On the way')}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Navigation className="w-5 h-5" /> Start Journey
                </button>
              )}
              {myActiveBooking.status === 'On the way' && (
                <button 
                  onClick={() => handleStatusChange(myActiveBooking.id, 'Service in progress')}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Activity className="w-5 h-5" /> Arrived & Start Work
                </button>
              )}
              {myActiveBooking.status === 'Service in progress' && (
                <button 
                  onClick={() => handleStatusChange(myActiveBooking.id, 'Completed')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5" /> Mark Job Completed
                </button>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4 text-sm text-slate-500">
               <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-teal-500" /> Welfare active</span>
               <span className="flex items-center gap-1"><CreditCard className="w-4 h-4 text-teal-500" /> Payment secured</span>
            </div>
          </div>
        </div>
      )}

      {!myPendingBooking && !myActiveBooking && (
        <div className="text-center py-24 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-slate-900 mb-2">No active jobs</h3>
          <p className="text-slate-500">You are available. Waiting for AI assignments.</p>
        </div>
      )}
    </div>
  );
}

function ShieldCheck(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
}
