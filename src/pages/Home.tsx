import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Map as MapIcon, Share2, ShieldCheck, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #14b8a6 0%, transparent 50%)' }}></div>
        <div className="z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-sm font-medium mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Internal Hackathon Prototype
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            ApnaHelper
          </h1>
          <p className="text-2xl md:text-3xl font-light text-slate-300">
            Local Skills. Trusted Services. Fair Work.
          </p>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            An AI-powered cooperative workforce platform connecting households and institutions with verified local workers while helping cooperatives intelligently manage workforce demand.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/customer" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 w-full sm:w-auto">
              Find a Service
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/federation" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all w-full sm:w-auto">
              Federation Command Center
            </Link>
          </div>
        </div>

        {/* Visual Network */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-4 text-slate-400 font-medium text-sm md:text-base">
          <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700">CUSTOMER</div>
          <ArrowRight className="hidden md:block w-5 h-5 text-teal-500" />
          <div className="text-teal-500 rotate-90 md:rotate-0 mb-2 md:mb-0">↓</div>
          <div className="bg-teal-900/50 text-teal-300 px-6 py-3 rounded-lg border border-teal-500/50 flex items-center gap-2">
            <Bot className="w-4 h-4" /> APNAHELPER AI
          </div>
          <ArrowRight className="hidden md:block w-5 h-5 text-teal-500" />
          <div className="text-teal-500 rotate-90 md:rotate-0 mb-2 md:mb-0">↓</div>
          <div className="bg-slate-800 px-6 py-3 rounded-lg border border-slate-700">COOPERATIVE</div>
          <ArrowRight className="hidden md:block w-5 h-5 text-teal-500" />
          <div className="text-teal-500 rotate-90 md:rotate-0 mb-2 md:mb-0">↓</div>
          <div className="bg-orange-900/30 text-orange-400 px-6 py-3 rounded-lg border border-orange-500/30">VERIFIED WORKER</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-6">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">AI Smart Matching</h3>
              <p className="text-slate-600 leading-relaxed">
                Find the right worker based on skill, location, availability and workload.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MapIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">GIS Intelligence</h3>
              <p className="text-slate-600 leading-relaxed">
                Visualize worker availability and service demand in real-time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Workforce Exchange</h3>
              <p className="text-slate-600 leading-relaxed">
                Move available workforce capacity between cooperative societies through approved recommendations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Worker Welfare</h3>
              <p className="text-slate-600 leading-relaxed">
                Keep fair wages, welfare and worker protection visible and transparent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
