import express from 'express';
import cors from 'cors';
import { Logging } from '@google-cloud/logging';

const app = express();
app.use(cors());

const logging = new Logging({ projectId: 'gci-techss-gcp-pjnp-01nl165115' });
let sseClients = [];

/**
 * status from jsonPayload
 */
async function getSuccessRate(component, windowMinutes = 60) {
  const log = logging.log('execution_logs');
  const timestampThreshold = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

  const baseFilter = `logName="projects/gci-techss-gcp-pjnp-01nl165115/logs/execution_logs" AND jsonPayload.message="execution_plane_call" AND jsonPayload.component="${component}" AND timestamp >= "${timestampThreshold}"`;

  try {
    // Get Success logs
    const [successEntries] = await logging.getEntries({
      filter: `${baseFilter} AND jsonPayload.status="success"`,
      pageSize: 1000,
    });

    //  Get Failure logs
    const [failureEntries] = await logging.getEntries({
      filter: `${baseFilter} AND jsonPayload.status="failure"`,
      pageSize: 1000,
    });

    const successCount = successEntries.length;
    const failureCount = failureEntries.length;
    const totalCount = successCount + failureCount;

    if (totalCount === 0) {
      console.log(`[GCP Logging] Component '${component}': No traffic in last ${windowMinutes}m.`);
      return null;
    }

    const percentage = ((successCount / totalCount) * 100).toFixed(1);
    console.log(`[GCP Logging] Component '${component}': ${successCount}/${totalCount} (${percentage}%)`);
    return parseFloat(percentage);

  } catch (err) {
    console.error(`[GCP Logging Query Error] ${component}:`, err.message);
    return null;
  }
}

async function fetchAllTelemetry() {
  const components = ['api', 'agents', 'tools', 'llm'];
  const scores = await Promise.all(components.map(c => getSuccessRate(c)));
  return components.map((name, i) => ({
    name: name.toUpperCase(),
    score: scores[i],
  }));
}

// SSE Connection Endpoint
app.get('/api/execution-plane/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  sseClients.push(res);
  console.log(`[SSE] Client connected. Active clients: ${sseClients.length}`);

  const initialPayload = await fetchAllTelemetry();
  const rawJson = JSON.stringify(initialPayload);
  res.write(`event: execution_plane_update\ndata: ${rawJson}\n\n`);
  res.write(`data: ${rawJson}\n\n`);

  req.on('close', () => {
    sseClients = sseClients.filter(client => client !== res);
    console.log(`[SSE] Client disconnected. Active clients: ${sseClients.length}`);
  });
});

setInterval(async () => {
  if (sseClients.length === 0) return;

  const payload = await fetchAllTelemetry();
  const rawJson = JSON.stringify(payload);
  const sseData = `event: execution_plane_update\ndata: ${rawJson}\n\ndata: ${rawJson}\n\n`;

  sseClients.forEach(client => client.write(sseData));
  console.log('[SSE Push] Broadcasted telemetry:', payload);
}, 15000);

app.get('/api/execution-plane', async (req, res) => {
  const payload = await fetchAllTelemetry();
  res.json(payload);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`GCP Telemetry Engine listening on http://localhost:${PORT}`);
});