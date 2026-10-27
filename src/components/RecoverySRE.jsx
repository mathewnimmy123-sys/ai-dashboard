import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Info, Clock, RefreshCw, ShieldAlert, Bot } from 'lucide-react';

const gaugeData = [
  { name: 'Remaining', value: 72, color: '#3b82f6' }, // Blue ring
  { name: 'Used', value: 28, color: '#1f2937' },
];

const metrics = [
  { label: 'MTTO', value: '3m', progress: 30, color: 'bg-emerald-500', icon: Clock },
  { label: 'MTTR', value: '18m', progress: 65, color: 'bg-cyan-500', icon: RefreshCw },
  { label: 'EIR', value: '1.24%', progress: 40, color: 'bg-amber-500', icon: ShieldAlert },
  { label: 'Auto', value: 'Enabled', progress: 100, color: 'bg-blue-500', icon: Bot },
];

export default function RecoverySRE() {
  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-3">
          <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
            Section 6: Recovery and SRE Metrics
          </h2>
          <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Main Content: Progress Bars + 72% Circular Metric */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        
        {/* Left Column: Horizontal SRE Metric Bars (Spans 2 Columns) */}
        <div className="sm:col-span-2 space-y-2">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className="flex items-center gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 w-16 text-gray-300 font-medium shrink-0">
                  <Icon size={13} className="text-gray-400" />
                  <span>{m.label}</span>
                </div>
                
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${m.color} rounded-full`} 
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
                
                <span className="w-12 text-right font-bold text-gray-200 text-[10px]">
                  {m.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Column: Circular Budget Gauge */}
        <div className="relative w-full h-28 flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={40}
                startAngle={90}
                endAngle={-270}
                dataKey="value"
                stroke="none"
              >
                {gaugeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base font-bold text-white leading-none">72%</span>
          </div>
          <span className="text-[9px] text-gray-400 text-center block mt-1">
            Over budget rem.
          </span>
        </div>

      </div>

      {/* Footer Details */}
      <div className="text-[10px] text-gray-400 pt-2 border-t border-gray-800/60 mt-2">
        <span>Auto-remediation playbooks triggered: <strong className="text-gray-200">14</strong></span>
      </div>

    </div>
  );
}