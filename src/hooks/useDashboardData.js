import { useEffect, useState } from 'react';

export function useExecutionPlaneData() {
  const [metrics, setMetrics] = useState([
    { name: 'API', score: null },
    { name: 'AGENTS', score: null },
    { name: 'TOOLS', score: null },
    { name: 'LLM', score: null },
  ]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/api/execution-plane/stream');

    const handlePayload = (rawPayload) => {
      try {
        const data = JSON.parse(rawPayload);
        console.log('[SSE Received in UI]:', data);
        if (Array.isArray(data) && data.length > 0) {
          setMetrics(data);
        }
      } catch (err) {
        console.error('Error parsing SSE telemetry payload:', err);
      }
    };

    // Listen for named event
    eventSource.addEventListener('execution_plane_update', (event) => {
      handlePayload(event.data);
    });

    // Fallback listener for standard messages
    eventSource.onmessage = (event) => {
      handlePayload(event.data);
    };

    eventSource.onerror = (err) => {
      console.error('SSE connection error, retrying...', err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return metrics;
}