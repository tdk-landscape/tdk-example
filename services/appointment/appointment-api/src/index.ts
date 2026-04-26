import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';

const app = new Hono();
app.use('*', logger());

// Health checks
app.get('/health', (c) => c.json({ status: 'healthy', service: 'appointment-api', timestamp: new Date().toISOString() }));
app.get('/health/live', (c) => c.json({ status: 'alive', timestamp: new Date().toISOString() }));
app.get('/health/ready', (c) => c.json({ status: 'ready', timestamp: new Date().toISOString() }));

// API routes
app.get('/', (c) => c.json({
  message: 'Appointment API',
  version: '1.0.0',
  endpoints: ['/health', '/api/appointments', '/api/schedule'],
}));

app.get('/api/appointments', (c) => c.json({
  appointments: [
    { id: 1, title: 'Team Standup', time: '09:00', duration: 30 },
    { id: 2, title: 'Product Review', time: '14:00', duration: 60 },
  ],
}));

app.post('/api/appointments', async (c) => {
  const body = await c.req.json();
  return c.json({ id: 3, ...body, created: true }, 201);
});

const port = parseInt(process.env.PORT || '4001', 10);
console.log(`🚀 Appointment API starting on port ${port}`);
serve({ fetch: app.fetch, port });
console.log(`✅ Appointment API ready at http://localhost:${port}`);
