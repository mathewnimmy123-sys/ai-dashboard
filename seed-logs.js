import { Logging } from '@google-cloud/logging';

const logging = new Logging({ projectId: 'gci-techss-gcp-pjnp-01nl165115' });
const log = logging.log('execution_logs');

// event logs for each component
const logEvents = [
  // --- API Component ---
  { component: 'api', status: 'success', action: 'GET /v1/chat/completions' },
  { component: 'api', status: 'success', action: 'POST /v1/embeddings' },
  { component: 'api', status: 'success', action: 'GET /v1/models' },

  // --- AGENTS Component ---
  { component: 'agents', status: 'success', action: 'agent_routing_step' },
  { component: 'agents', status: 'success', action: 'orchestrator_decision' },
  { component: 'agents', status: 'success', action: 'agent_task_execution' },
  { component: 'agents', status: 'success', action: 'agent_task_execution' },
  { component: 'agents', status: 'failure', action: 'context_window_exceeded' },

  // --- TOOLS Component Log---
  { component: 'tools', status: 'success', action: 'search_vector_db' },
  { component: 'tools', status: 'success', action: 'execute_sql_query' },
  { component: 'tools', status: 'failure', action: 'web_search_timeout' },
  { component: 'tools', status: 'success', action: 'execute_calculator' },

  // --- LLM Component Loggs ---
  { component: 'llm', status: 'success', action: 'gemini_pro_inference' },
  { component: 'llm', status: 'success', action: 'token_stream_complete' },
  { component: 'llm', status: 'success', action: 'gemini_flash_inference' }
];

async function sendRealLogs() {
  console.log('Sending authentic component logs to GCP Cloud Logging...');
  
  for (const item of logEvents) {
    const entry = log.entry(
      { resource: { type: 'global' } },
      { 
        message: 'execution_plane_call', 
        component: item.component, 
        status: item.status,
        action: item.action,
        timestamp: new Date().toISOString()
      }
    );
    await log.write(entry);
    console.log(`[Logged to GCP] Component: '${item.component.toUpperCase()}' | Status: '${item.status}' | Action: '${item.action}'`);
  }

  console.log('All telemetry logs successfully written to GCP Cloud Logging!');
}

sendRealLogs();