import React from 'react';
import { Info } from 'lucide-react';

const columns = ['P50', 'P95', 'Err', 'Retry'];

const rows = [
  { name: 'Auth', status: ['good', 'good', 'watch', 'good'] },
  { name: 'Vector DB', status: ['good', 'risk', 'good', 'watch'] },
  { name: 'LLM', status: ['good', 'good', 'good', 'risk'] },
  { name: 'Tools', status: ['risk', 'good', 'watch', 'good'] },
  { name: 'API', status: ['good', 'watch', 'good', 'good'] },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'good':
      return 'bg-emerald-500/80 border-emerald-400/40 hover:bg-emerald-500';
    case 'watch':
      return 'bg-amber-500/80 border-amber-400/40 hover:bg-amber-500';
    case 'risk':
      return 'bg-rose-500/80 border-rose-400/40 hover:bg-rose-500';
    default:
      return 'bg-gray-700/50 border-gray-600/30';
  }
};

export default function RuntimeHotspots() {
  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-3">
          <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
            Runtime Hotspots
          </h2>
          <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Grid Matrix Table */}
      <div className="w-full my-auto">
        {/* Matrix Header Row */}
        <div className="grid grid-cols-5 gap-1 mb-1 text-[10px] text-gray-400 font-medium text-center">
          <div className="text-left font-semibold">System</div>
          {columns.map((col, idx) => (
            <div key={idx}>{col}</div>
          ))}
        </div>

        {/* Matrix Rows */}
        <div className="space-y-1.5">
          {rows.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-5 gap-1.5 items-center">
              <span className="text-[10px] font-medium text-gray-300 truncate">
                {row.name}
              </span>
              {row.status.map((st, cIdx) => (
                <div
                  key={cIdx}
                  className={`h-5 rounded border transition-colors cursor-pointer ${getStatusColor(st)}`}
                  title={`${row.name} - ${columns[cIdx]}: ${st.toUpperCase()}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center gap-4 text-[10px] text-gray-400 pt-2 border-t border-gray-800/60 mt-3 justify-start">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-emerald-500" />
          <span>Good</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-amber-500" />
          <span>Watch</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-sm bg-rose-500" />
          <span>Risk</span>
        </div>
      </div>

    </div>
  );
}