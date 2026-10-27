import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import { Info } from 'lucide-react';

export default function ExecutionPlane({ executionData }) {
  // scores 
  const getBarColor = (score) => {
    if (score === null || score === undefined) return '#374151'; // Gray (No Data)
    if (score >= 98) return '#10b981'; // Green (Healthy)
    if (score >= 90) return '#f59e0b'; // Amber (Warning)
    return '#ef4444';                  // Red (Critical)
  };

  // formating
  const formattedData = executionData?.map((item) => ({
    ...item,
    // fallback of 0
    displayScore: item.score !== null && item.score !== undefined ? item.score : 0,
    hasData: item.score !== null && item.score !== undefined,
  })) || [];

  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      <div>
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-3">
          <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
            Section 2: Execution Plane Reliability
          </h2>
          <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
        <span className="text-[11px] font-medium text-gray-400 block mb-2">
          Success rate by runtime component
        </span>
      </div>

      <div className="w-full h-40 mt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 20, right: 10, left: -25, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              stroke="#9ca3af" 
              fontSize={11} 
              tickLine={false} 
              axisLine={{ stroke: '#374151' }} 
            />
            <YAxis 
              domain={[0, 100]} 
              stroke="#9ca3af" 
              fontSize={10} 
              tickLine={false} 
              axisLine={{ stroke: '#374151' }} 
              unit="%" 
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '0.375rem', fontSize: '12px' }}
              formatter={(value, name, props) => [
                props.payload.hasData ? `${props.payload.score}%` : 'No Data Logged', 
                'Success Rate'
              ]}
            />
            <Bar dataKey="displayScore" radius={[4, 4, 0, 0]} barSize={28}>
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
              <LabelList 
                dataKey="score" 
                position="top" 
                formatter={(val) => (val !== null && val !== undefined ? `${val}%` : 'N/A')} 
                style={{ fill: '#f3f4f6', fontSize: '11px', fontWeight: 'bold' }} 
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}