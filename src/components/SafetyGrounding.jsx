import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';

const chartData = [
  { time: '1', safe: 40, grounded: 28 },
  { time: '2', safe: 55, grounded: 42 },
  { time: '3', safe: 53, grounded: 40 },
  { time: '4', safe: 65, grounded: 52 },
  { time: '5', safe: 60, grounded: 46 },
  { time: '6', safe: 82, grounded: 65 },
  { time: '7', safe: 73, grounded: 61 },
  { time: '8', safe: 80, grounded: 64 },
  { time: '9', safe: 76, grounded: 61 },
  { time: '10', safe: 88, grounded: 76 },
  { time: '11', safe: 82, grounded: 71 },
  { time: '12', safe: 85, grounded: 73 },
  { time: '13', safe: 81, grounded: 68 },
  { time: '14', safe: 98, grounded: 85 },
  { time: '15', safe: 95, grounded: 82 },
  { time: '16', safe: 100, grounded: 88 },
];

export default function SafetyGrounding() {
  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-2">
          <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase flex items-center gap-1">
            Section 5: Safety and Grounding
          </h2>
          <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Area Chart Container */}
      <div className="w-full h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              {/* Blue Gradient for Safe responses */}
              <linearGradient id="colorSafe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.3}/>
              </linearGradient>
              
              {/* Gold/Amber Gradient for Grounded traces */}
              <linearGradient id="colorGrounded" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            
            <XAxis dataKey="time" hide />
            <YAxis 
              domain={[0, 100]} 
              ticks={[0, 25, 50, 75, 100]}
              stroke="#9ca3af" 
              fontSize={10} 
              tickLine={false} 
              axisLine={{ stroke: '#374151' }} 
              unit="%" 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.375rem', fontSize: '12px' }}
            />
            
            <Area 
              type="monotone" 
              dataKey="safe" 
              stroke="#38bdf8" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorSafe)" 
            />
            <Area 
              type="monotone" 
              dataKey="grounded" 
              stroke="#fbbf24" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorGrounded)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-[11px] text-gray-300 my-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#0284c7]" />
          <span>Safe responses</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]" />
          <span>Grounded traces</span>
        </div>
      </div>

      {/* Footer Sub-details */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-800/60">
        <span>Guardrail blocks: <strong className="text-gray-200">21</strong></span>
        <span>Citation coverage: <strong className="text-gray-200">96.4%</strong></span>
      </div>

    </div>
  );
}