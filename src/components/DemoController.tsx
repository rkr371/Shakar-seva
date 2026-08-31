import React, { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DEMO_STEPS = [
  "STEP 1: Customer Request",
  "STEP 2: AI Understanding",
  "STEP 3: GIS Matching",
  "STEP 4: Worker Selection",
  "STEP 5: Booking",
  "STEP 6: Worker Acceptance",
  "STEP 7: Federation Dashboard",
  "STEP 8: Demand Forecast",
  "STEP 9: Workforce Shortage",
  "STEP 10: Cooperative Workforce Exchange",
  "STEP 11: Approval",
  "STEP 12: Worker Welfare",
];

export function DemoController() {
  const { demoState, setDemoStep, toggleDemoMode } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!demoState.isActive) return;
    
    // Auto-navigate based on step
    const step = demoState.currentStep;
    if (step >= 0 && step <= 4) {
      if (location.pathname !== '/customer') navigate('/customer');
    } else if (step === 5) {
      if (location.pathname !== '/worker') navigate('/worker');
    } else if (step >= 6 && step <= 10) {
      if (location.pathname !== '/federation') navigate('/federation');
      // Scroll handling for federation page
      setTimeout(() => {
        if (step === 7 || step === 8) window.scrollTo({top: 400, behavior: 'smooth'});
        if (step === 9 || step === 10) window.scrollTo({top: 0, behavior: 'smooth'});
      }, 500);
    } else if (step === 11) {
      if (location.pathname !== '/welfare') navigate('/welfare');
    }
  }, [demoState.currentStep, demoState.isActive, navigate, location.pathname]);

  if (!demoState.isActive) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-orange-500 text-white shadow-xl shadow-orange-200/50 rounded-2xl px-6 py-3 flex items-center gap-6">
      <div className="flex flex-col">
        <span className="text-[10px] text-orange-100 font-bold uppercase tracking-widest flex items-center gap-1">
          <span className="text-sm">⚡</span> DEMO MODE ACTIVATED
        </span>
        <span className="text-sm font-bold mt-0.5">{DEMO_STEPS[demoState.currentStep]}</span>
      </div>
      
      <div className="flex items-center gap-2 border-l border-orange-400/50 pl-6">
        <button 
          onClick={() => setDemoStep(Math.max(0, demoState.currentStep - 1))}
          disabled={demoState.currentStep === 0}
          className="p-1.5 rounded-full hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold w-12 text-center text-orange-100">
          {demoState.currentStep + 1} / {DEMO_STEPS.length}
        </span>
        <button 
          onClick={() => setDemoStep(Math.min(DEMO_STEPS.length - 1, demoState.currentStep + 1))}
          disabled={demoState.currentStep === DEMO_STEPS.length - 1}
          className="p-1.5 rounded-full hover:bg-orange-600 disabled:opacity-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <button onClick={toggleDemoMode} className="ml-2 p-1.5 text-orange-200 hover:text-white hover:bg-orange-600 rounded-full transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
