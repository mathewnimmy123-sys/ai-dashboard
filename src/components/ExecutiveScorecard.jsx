import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Info, ShieldCheck } from 'lucide-react';

const gaugeData = [
  { name: 'Score', value: 94, color: '#22c55e' }, // Emerald green for score
  { name: 'Remaining', value: 6, color: '#1f2937' }, // Dark background fill
];

const metrics = [
  { label: 'SLO met', value: '', status: 'healthy' },
  { label: 'Error budget remaining:', value: '72%', status: 'healthy' },
  { label: 'Customer impacting incidents:', value: '$0.12', status: 'healthy' },
  { label: 'Risk posture:Controlled', status: 'healthy' },
];

export default function ExecutiveScorecard() {
  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-3">
        <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
          Section 1: Executive Reliability Scorecard
        </h2>
        <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
      </div>

      <span className="text-[11px] font-medium text-gray-400 block mb-2">
        Overall AI Reliability
      </span>

      {/* Main Content: Gauge Chart + Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        
        {/* Donut Chart Gauge */}
        <div className="relative w-full h-32 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={50}
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
          
          {/* Centered Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-white leading-none">94</span>
          </div>
        </div>

        {/* Bullet List Details */}
        <div className="space-y-1.5 text-[11px]">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>
                <strong className="font-semibold text-gray-200">{m.label}</strong> {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center gap-4 text-[10px] text-gray-400 mt-4 pt-2 border-t border-gray-800/60 justify-start">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Healthy</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Warning</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>Critical</span>
        </div>
      </div>

    </div>
  );
}