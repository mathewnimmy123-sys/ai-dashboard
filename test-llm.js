// run `node test-llm.js`
import { Logging } from '@google-cloud/logging';
const logging = new Logging({ projectId: 'gci-techss-gcp-pjnp-01nl165115' });
const log = logging.log('execution_logs');

async function pushTestLog() {
  // Push 1 success, 1 failure for LLM
  await log.write(log.entry({ resource: { type: 'global' } }, { message: 'execution_plane_call', component: 'llm', status: 'success' }));
  await log.write(log.entry({ resource: { type: 'global' } }, { message: 'execution_plane_call', component: 'llm', status: 'failure' }));
  console.log('Test logs written for LLM!');
}
pushTestLog();