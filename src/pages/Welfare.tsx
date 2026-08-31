import React from 'react';
import { ShieldCheck, HeartPulse, GraduationCap, Clock, PieChart } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip } from 'recharts';

const WELFARE_DATA = [
  { name: 'Health Insurance', value: 35 },
  { name: 'Accident Cover', value: 25 },
  { name: 'Pension Fund', value: 20 },
  { name: 'Training', value: 20 },
];
const COLORS = ['#0d9488', '#3b82f6', '#f59e0b', '#8b5cf6'];

export function Welfare() {
  return (
    <div className="max-w-6xl mx-auto w-full px-4 py-8 flex flex-col gap-8">
      
      <div className="text-center max-w-2xl mx-auto mb-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Worker Welfare</h1>
        <p className="text-lg text-slate-500">
          "Worker welfare is a core platform metric, not an afterthought."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-teal-50 border border-teal-100 p-6 rounded-2xl">
           <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4">
             <ShieldCheck className="w-6 h-6" />
           </div>
           <div className="text-3xl font-bold text-slate-900 mb-1">91.4%</div>
           <div className="text-sm font-medium text-slate-600">Insurance Coverage</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
           <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
             <GraduationCap className="w-6 h-6" />
           </div>
           <div className="text-3xl font-bold text-slate-900 mb-1">78.0%</div>
           <div className="text-sm font-medium text-slate-600">Training Completion</div>
        </div>
        <div className="bg-green-50 border border-green-100 p-6 rounded-2xl">
           <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
             <Clock className="w-6 h-6" />
           </div>
           <div className="text-3xl font-bold text-slate-900 mb-1">96.8%</div>
           <div className="text-sm font-medium text-slate-600">On-Time Payments</div>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl">
           <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
             <HeartPulse className="w-6 h-6" />
           </div>
           <div className="text-3xl font-bold text-slate-900 mb-1">₹12.4 L</div>
           <div className="text-sm font-medium text-slate-600">Total Welfare Fund</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Welfare Fund Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={WELFARE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {WELFARE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  formatter={(value: any) => `${value}%`}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {WELFARE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                <span className="text-sm font-medium text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
            Fair Pay Audit Log
            <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">Illustrative Data</span>
          </h3>
          <div className="space-y-4">
            {[
              { id: 'AH-1021', worker: 'Ramesh Patel', amount: '₹380', welfare: '₹10', status: 'Cleared' },
              { id: 'AH-1022', worker: 'Priya Desai', amount: '₹450', welfare: '₹15', status: 'Cleared' },
              { id: 'AH-1023', worker: 'Sanjay Kumar', amount: '₹850', welfare: '₹25', status: 'Processing' },
              { id: 'AH-1024', worker: 'Mahesh Solanki', amount: '₹1200', welfare: '₹35', status: 'Cleared' },
            ].map((log, i) => (
              <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <div className="font-bold text-slate-900">{log.worker}</div>
                  <div className="text-sm text-slate-500">Ref: {log.id}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-teal-600">Net: {log.amount}</div>
                  <div className="text-xs font-medium text-slate-400">Welfare Accrued: {log.welfare}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
