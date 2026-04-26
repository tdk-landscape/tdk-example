import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { serve } from '@hono/node-server';

const app = new Hono();

// Middleware
app.use('*', logger());

// Health check endpoints
app.get('/health', (c) => c.json({
  status: 'healthy',
  service: 'identity-api',
  timestamp: new Date().toISOString(),
}));

app.get('/health/live', (c) => c.json({
  status: 'alive',
  timestamp: new Date().toISOString(),
}));

app.get('/health/ready', (c) => c.json({
  status: 'ready',
  timestamp: new Date().toISOString(),
}));

// API routes
app.get('/', (c) => c.json({
  message: 'Identity API',
  version: '1.0.0',
  endpoints: [
    '/health',
    '/health/live',
    '/health/ready',
    '/api/users',
    '/api/auth/login',
    '/api/auth/register',
  ],
}));

// User routes
app.get('/api/users', (c) => c.json({
  users: [
    { id: 1, email: 'user@example.com', name: 'Demo User' },
  ],
}));

app.get('/api/users/:id', (c) => {
  const id = c.req.param('id');
  return c.json({
    id,
    email: 'user@example.com',
    name: 'Demo User',
  });
});

// Auth routes
app.post('/api/auth/login', async (c) => {
  const body = await c.req.json();
  return c.json({
    token: 'demo-token',
    user: {
      id: 1,
      email: body.email || 'user@example.com',
      name: 'Demo User',
    },
  });
});

app.post('/api/auth/register', async (c) => {
  const body = await c.req.json();
  return c.json({
    id: 2,
    email: body.email,
    name: body.name,
    message: 'User registered successfully',
  }, 201);
});

// Start server
const port = parseInt(process.env.PORT || '4000', 10);

console.log(`🚀 Identity API starting on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

console.log(`✅ Identity API ready at http://localhost:${port}`);
