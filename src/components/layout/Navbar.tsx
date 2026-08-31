import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Menu, X, Play, LayoutDashboard, Users, Map, Shield, Activity, Settings, UserCircle, Target, Briefcase } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { demoState, toggleDemoMode } = useStore();

  const navItems = [
    { name: 'Home', path: '/', icon: <Target className="w-4 h-4 mr-2" /> },
    { name: 'Customer', path: '/customer', icon: <UserCircle className="w-4 h-4 mr-2" /> },
    { name: 'Worker', path: '/worker', icon: <Briefcase className="w-4 h-4 mr-2" /> },
    { name: 'Federation', path: '/federation', icon: <LayoutDashboard className="w-4 h-4 mr-2" /> },
    { name: 'GIS Intelligence', path: '/gis', icon: <Map className="w-4 h-4 mr-2" /> },
    { name: 'AI Assistant', path: '/ai', icon: <Activity className="w-4 h-4 mr-2" /> },
    { name: 'Welfare', path: '/welfare', icon: <Shield className="w-4 h-4 mr-2" /> },
  ];

  return (
    <nav className="bg-slate-800 text-white shadow-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center">
                <span className="font-bold text-white text-xl">S</span>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:justify-center">
                <span className="font-bold text-lg leading-tight">SHAKAR SEVA</span>
                <span className="text-[10px] text-teal-400 uppercase tracking-widest leading-none mt-0.5">Local Skills • Trusted Services • Fair Work</span>
              </div>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-1 lg:space-x-4 overflow-x-auto no-scrollbar">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                      isActive
                        ? "bg-slate-700 text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    )
                  }
                >
                  {item.icon}
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDemoMode}
              className={cn(
                "inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors",
                demoState.isActive ? "bg-orange-500 hover:bg-orange-600 shadow-orange-200" : "bg-teal-600 hover:bg-teal-700"
              )}
            >
              <Play className="w-4 h-4 mr-2" />
              {demoState.isActive ? "Demo Active" : "Demo Mode"}
            </button>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
              >
                {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800 border-t border-slate-700">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  )
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
