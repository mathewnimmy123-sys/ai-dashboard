import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const gaugeData = [
  { name: 'Value', value: 99.2, color: '#06b6d4' }, // Cyan ring color
  { name: 'Remaining', value: 0.8, color: '#1f2937' },
];

const progressMetrics = [
  { label: 'Fresh', value: 98, color: 'bg-emerald-500' },
  { label: 'Completeness', value: 97, color: 'bg-amber-500' },
  { label: 'Groundedness', value: 97, color: 'bg-sky-500' },
];

export default function DataPlane() {
  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-3">
          <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
            Section 3: Data Plane Reliability
          </h2>
          <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Gauge Chart + Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        
        {/* Donut Chart  */}
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
          
          {/* Centered P%e */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-bold text-white leading-none">99.2%</span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-2.5">
          {progressMetrics.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-medium text-gray-300">
                <span>{item.label}</span>
                <span className="text-gray-400">{item.value}%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Caption */}
      <span className="text-[10px] text-gray-400 mt-3 pt-2 border-t border-gray-800/60 block leading-tight">
        RAG source freshness, completeness and grounding coverage
      </span>

    </div>
  );
}