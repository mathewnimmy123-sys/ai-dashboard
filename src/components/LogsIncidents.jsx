import React from 'react';
import { Info } from 'lucide-react';

const incidentData = [
  {
    id: 'INC-241',
    signal: 'LLM timeout',
    state: 'Open',
    severity: 'High',
    severityColor: 'text-rose-500',
    dotColor: 'bg-rose-500',
  },
  {
    id: 'INC-238',
    signal: 'Data lag',
    state: 'Fixed',
    severity: 'Medium',
    severityColor: 'text-amber-500',
    dotColor: 'bg-amber-500',
  },
  {
    id: 'ERR-812',
    signal: 'Grounding miss',
    state: 'Watch',
    severity: 'Medium',
    severityColor: 'text-amber-500',
    dotColor: 'bg-amber-500',
  },
  {
    id: 'LOG-790',
    signal: 'Tool retry spike',
    state: 'Fixed',
    severity: 'Low',
    severityColor: 'text-emerald-500',
    dotColor: 'bg-emerald-500',
  },
];

export default function LogsIncidents() {
  return (
    <div className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg">
      
      {/* Section Header */}
      <div>
        <div className="flex items-center justify-between border-b border-gray-800/60 pb-2 mb-3">
          <h2 className="text-xs font-semibold text-gray-300 tracking-wide uppercase">
            Section 7: Logs, Incidents, and Errors
          </h2>
          <Info size={14} className="text-gray-500 cursor-pointer hover:text-gray-300" />
        </div>
      </div>

      {/* Incident Table */}
      <div className="w-full my-auto">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-1 mb-2 text-[10px] text-gray-400 font-semibold border-b border-gray-800/40 pb-1">
          <div className="col-span-3">ID</div>
          <div className="col-span-4">Signal</div>
          <div className="col-span-2">State</div>
          <div className="col-span-3 text-right pr-1">Severity</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-2.5">
          {incidentData.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-1 items-center text-[11px]">
              <div className="col-span-3 font-bold text-gray-200">{row.id}</div>
              <div className="col-span-4 text-gray-300 truncate">{row.signal}</div>
              <div className="col-span-2 text-gray-400">{row.state}</div>
              <div className="col-span-3 flex items-center justify-end gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${row.dotColor}`} />
                <span className={`font-medium text-[10px] ${row.severityColor}`}>
                  {row.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Details */}
      <div className="text-[10px] text-gray-400 text-center pt-2 border-t border-gray-800/60 mt-3 leading-tight space-y-0.5">
        <div>Primary signals: Cloud logs, traces, eval telemetry.</div>
        <div className="text-gray-300 font-medium">SLO burn-rate alerts</div>
      </div>

    </div>
  );
}