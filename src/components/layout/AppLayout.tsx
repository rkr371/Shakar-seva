import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { DemoController } from '../DemoController';
import { Bot } from 'lucide-react';

export function AppLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      <Navbar />
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <Outlet />
      </main>
      <DemoController />
      
      <div 
        onClick={() => navigate('/ai')} 
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#1e293b] rounded-full shadow-2xl flex items-center justify-center border-4 border-white cursor-pointer group z-40 hover:scale-105 transition-transform"
      >
        <div className="absolute -top-10 right-0 bg-white px-3 py-1 rounded-full shadow-md border border-slate-100 text-[10px] font-bold text-slate-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask Sahayog AI
        </div>
        <Bot className="w-8 h-8 text-white" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-teal-500 border-2 border-white rounded-full"></div>
      </div>
    </div>
  );
}
