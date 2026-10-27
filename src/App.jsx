import React from 'react';
import { useExecutionPlaneData } from './hooks/useDashboardData';
import HeaderKPIs from './components/HeaderKPIs';
import ExecutiveScorecard from './components/ExecutiveScorecard';
import ExecutionPlane from './components/ExecutionPlane';
import DataPlane from './components/DataPlane';
import ChaosEvents from './components/ChaosEvents';
import SafetyGrounding from './components/SafetyGrounding';
import RecoverySRE from './components/RecoverySRE';
import RuntimeHotspots from './components/RuntimeHotspots';
import LogsIncidents from './components/LogsIncidents';

export default function App() {
  const executionData = useExecutionPlaneData();

  return (
    <div className="min-h-screen bg-[#0f1219] text-gray-100 p-6">
      <h1 className="text-2xl font-bold text-white mb-4 tracking-wide">
        AI Reliability Command Center
      </h1>

      <HeaderKPIs />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ExecutiveScorecard />
        <ExecutionPlane executionData={executionData} />
        <DataPlane />
        <ChaosEvents />
        
        <SafetyGrounding />
        <RecoverySRE />
        <RuntimeHotspots />
        <LogsIncidents />
      </div>
    </div>
  );
}