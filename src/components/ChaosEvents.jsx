import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { Info } from 'lucide-react';

const data = [
  { name: 'Latency', value: 6, color: '#f59e0b' },
  { name: 'State fail', value: 4, color: '#f59e0b' },
  { name: 'Data lag', value: 3, color: '#f59e0b' },
  { name: 'LLM err', value: 3, color: '#f59e0b' },
];

export default function ChaosEvents() {
  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-3">
          <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
            Section 4: AI Chaos Monkey Events
          </h2>
          <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Bar part */}
      <div className="w-full h-36 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 10, left: -25, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              fontSize={10} 
              tickLine={false} 
              axisLine={{ stroke: '#374151' }} 
            />
            <YAxis 
              domain={[0, 7]} 
              stroke="#9ca3af" 
              fontSize={10} 
              tickLine={false} 
              axisLine={{ stroke: '#374151' }} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.375rem', fontSize: '12px' }}
              formatter={(val) => [val, 'Events']}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={26}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <LabelList 
                dataKey="value" 
                position="top" 
                style={{ fill: '#f3f4f6', fontSize: '11px', fontWeight: 'bold' }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Details */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-3 pt-2 border-t border-gray-800/60">
        <span>12 experiments</span>
        <span>0 Sev-1</span>
        <span className="text-emerald-400 font-medium">Auto-rollback: 100%</span>
      </div>

    </div>
  );
}