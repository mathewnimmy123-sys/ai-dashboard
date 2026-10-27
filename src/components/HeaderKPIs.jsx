import React from 'react';
import { 
  ShieldCheck, 
  Rocket, 
  Database, 
  Zap, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const kpis = [
  {
    id: 'score',
    title: 'Reliability Score',
    value: '94',
    icon: ShieldCheck,
    iconColor: 'text-emerald-500',
    trend: '+0.5%',
    trendDirection: 'up',
    trendText: 'vs last 7 days',
    trendColor: 'text-emerald-400',
  },
  {
    id: 'execution',
    title: 'Execution Plane',
    value: '98.7%',
    icon: Rocket,
    iconColor: 'text-blue-400',
    trend: '-0.4%',
    trendDirection: 'down',
    trendText: 'vs last 7 days',
    trendColor: 'text-rose-400',
  },
  {
    id: 'data',
    title: 'Data Plane',
    value: '99.2%',
    icon: Database,
    iconColor: 'text-cyan-400',
    trend: '+1.3%',
    trendDirection: 'up',
    trendText: 'vs last 7 days',
    trendColor: 'text-emerald-400',
  },
  {
    id: 'chaos',
    title: 'Chaos Events',
    value: '12',
    icon: Zap,
    iconColor: 'text-purple-400',
    subBadge: '0 critical',
    dotColor: 'bg-amber-500',
    trendText: 'vs last 7 days',
  },
  {
    id: 'safety',
    title: 'Safety Pass',
    value: '97.4%',
    icon: ShieldCheck,
    iconColor: 'text-teal-400',
    trend: '+0.8%',
    trendDirection: 'up',
    trendText: 'vs last 7 days',
    trendColor: 'text-emerald-400',
  },
  {
    id: 'mttr',
    title: 'MTTR',
    value: '18 m',
    icon: Clock,
    iconColor: 'text-cyan-400',
    trend: '-22%',
    trendDirection: 'down',
    trendText: 'vs last 7 days',
    trendColor: 'text-emerald-400',
  },
  {
    id: 'incidents',
    title: 'Open Incidents',
    value: '4',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    trend: '-12%',
    trendDirection: 'down',
    trendText: 'vs last 7 days',
    trendColor: 'text-emerald-400',
  },
];

export default function HeaderKPIs() {
  return (
    <header className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
      {kpis.map((item) => {
        const Icon = item.icon;
        const TrendIcon = item.trendDirection === 'up' ? TrendingUp : TrendingDown;

        return (
          <div 
            key={item.id} 
            className="bg-[#181d28]/90 border border-gray-800/80 rounded-xl p-3 flex flex-col justify-between shadow-md hover:border-gray-700 transition-all"
          >
            {/* Header Title */}
            <span className="text-[11px] font-medium text-gray-400 text-center tracking-wide block mb-1">
              {item.title}
            </span>

            {/* Icon + Primary Value */}
            <div className="flex items-center justify-center gap-2.5 my-1">
              <Icon className={`${item.iconColor} w-6 h-6 shrink-0`} />
              <span className="text-2xl font-bold text-white tracking-tight">
                {item.value}
              </span>
            </div>

            {/* Sub-details (Trend / Comparison) */}
            <div className="flex items-center justify-center gap-1 text-[10px] text-gray-400 mt-1">
              {item.trend && (
                <span className={`flex items-center gap-0.5 font-semibold ${item.trendColor}`}>
                  <TrendIcon className="w-3 h-3 inline" />
                  {item.trend}
                </span>
              )}

              {item.subBadge && (
                <span className="flex items-center gap-1 text-gray-300 font-medium">
                  {item.subBadge}
                  <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                </span>
              )}

              <span className="text-gray-500 font-normal">{item.trendText}</span>
            </div>
          </div>
        );
      })}
    </header>
  );
}