# TDK Example Project

> A complete example of the Project-Stack-Resource (PSR) model using TDK CLI

[![TDK](https://img.shields.io/badge/TDK-1.x-blue)](https://github.com/tdk-landscape/tdk-cli)
[![Tilt](https://img.shields.io/badge/Tilt-latest-blue?logo=tilt)](https://tilt.dev)
[![Bun](https://img.shields.io/badge/Bun-1.2-black?logo=bun)](https://bun.sh)

---

## 🚀 Quick Start

```bash
# Clone this example
git clone https://github.com/tdk-landscape/tdk-example.git
cd tdk-example

# Install dependencies
bun install

# Start all services
tdk up

# Or start a specific stack
tdk up identity
```

---

## 📁 Project Structure

```
tdk-example/
├── 📄 Tiltfile                    # Tilt configuration
├── ⚙️  TILT_SERVICE_DEFAULTS.star   # Master config (ports, health checks)
├── 🔧 TILT_TECH_STACK.star          # Tech stack (Bun, Vite, Prisma, NATS)
│
└── services/                      # All microservices
    ├── 🔐 identity/                # Identity Stack
    │   ├── identity-api/          # Backend service
    │   │   ├── service.json       # Service configuration
    │   │   ├── package.json
    │   │   ├── Dockerfile
    │   │   └── src/
    │   │       └── index.ts       # Hono API
    │   │
    │   └── identity-app/          # Frontend service
    │       ├── service.json
    │       ├── package.json
    │       ├── Dockerfile
    │       └── src/
    │           └── App.tsx        # React app
    │
    └── 📅 appointment/            # Appointment Stack
        ├── appointment-api/       # Backend service
        └── appointment-app/       # Frontend service
```

---

## 🏗️ Stacks

### 🔐 Identity Stack

| Resource | Type | Port | Description |
|----------|------|------|-------------|
| `identity-api` | Backend | 4000 | Authentication & user management API |
| `identity-app` | Frontend | 3000 | User dashboard & profile UI |

```bash
tdk up identity     # Start identity stack
tdk down            # Stop all
```

### 📅 Appointment Stack

| Resource | Type | Port | Description |
|----------|------|------|-------------|
| `appointment-api` | Backend | 4001 | Scheduling & booking API |
| `appointment-app` | Frontend | 3001 | Booking interface UI |

```bash
tdk up appointment  # Start appointment stack
tdk up              # Start all stacks
```

---

## 🛠️ Development Workflow

### 1. Initialize Project

```bash
# Project already initialized in this example
# (Creates TILT_SERVICE_DEFAULTS.star + TILT_TECH_STACK.star)
tdk project
```

### 2. Create Resources

```bash
# Create a new backend service
tdk resource my-api --type backend --stack identity

# Create a new frontend app
tdk resource my-app --type frontend --stack identity
```

### 3. Organize into Stacks

```bash
# Assign resources to stacks (interactive)
tdk stack identity
tdk stack appointment
```

### 4. Start Development

```bash
# Start specific stack
tdk up identity

# Start all
tdk up

# Check status
tdk status
```

---

## 📊 Available Endpoints

Once running:

| Service | URL | Health Check |
|---------|-----|--------------|
| identity-api | http://localhost:4000 | http://localhost:4000/health |
| identity-app | http://localhost:3000 | - |
| appointment-api | http://localhost:4001 | http://localhost:4001/health |
| appointment-app | http://localhost:3001 | - |

---

## 🧪 Testing

```bash
# Run all tests
bun test

# Run tests for specific service
cd services/identity/identity-api && bun test
```

---

## 📚 Learn More

- [TDK CLI Documentation](https://github.com/tdk-landscape/tdk-cli)
- [Tilt Documentation](https://docs.tilt.dev)
- [Hono Framework](https://hono.dev)
- [Vite](https://vitejs.dev)

---

## 📝 License

MIT © [TDK Landscape](https://github.com/tdk-landscape)
