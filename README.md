# infinite-waffle

A real-time sensor data monitoring dashboard application built with Vue 3 and Nitro. The application displays live sensor data streams via Server-Sent Events (SSE), including temperature, heartbeat, and error metrics with filtering and averaging capabilities.

## Architecture

This is a monorepo project consisting of:

- **Frontend (vue-app)**: Vue 3 application with Pinia state management, UnoCSS for styling, and Vite for build tooling
- **Backend (nitro-app)**: Nitro server providing Server-Sent Events (SSE) API endpoint for streaming sensor data
- **Shared (shared)**: Shared TypeScript models and types used by both frontend and backend

## Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Pinia** - State management
- **UnoCSS** - Atomic CSS engine
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Vitest** - Unit testing framework

### Backend
- **Nitro** - Server framework
- **H3** - HTTP framework for Nitro
- **TypeScript** - Type safety

### Infrastructure
- **Docker & Docker Compose** - Containerization and orchestration
- **Node.js 22** - Runtime environment

## Features

- **Real-time Data Streaming**: Server-Sent Events (SSE) for live sensor data updates
- **Sensor Types**: Supports TEMP (temperature), HEARTBEAT, and ERROR sensor types
- **Dashboard Metrics**:
  - Average temperature (°C)
  - Average heartbeat (bpm)
  - Average error (units)
- **Data Filtering**: Filter sensor data by type (ALL, TEMP, HEARTBEAT, ERROR)
- **Configurable Settings**:
  - Toggle active/inactive state for data collection
  - Adjustable row count (default: 50)
  - Configurable refresh rate (default: 200ms)
- **Circular Buffer**: Efficient data management using a circular queue implementation
- **Responsive UI**: Modern dashboard with sidebar navigation

## Project Structure

```
infinite-waffle/
├── vue-app/                 # Frontend Vue application
│   ├── src/
│   │   ├── components/      # Vue components
│   │   │   ├── dashboard/   # Dashboard-specific components
│   │   │   ├── sidebar/     # Sidebar components
│   │   │   └── common/      # Reusable UI components
│   │   ├── composables/     # Vue composables (useSensor)
│   │   ├── stores/          # Pinia stores
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── vite.config.ts
├── nitro-app/               # Backend Nitro server
│   ├── server/
│   │   └── routes/          # API routes
│   ├── package.json
│   └── nitro.config.ts
├── shared/                  # Shared code
│   └── models.ts            # Shared TypeScript models
├── dockerfiles/             # Docker configuration
│   ├── frontend/
│   └── backend/
├── docker-compose.yml       # Docker Compose configuration
└── package.json             # Root package.json (monorepo)
```

## Prerequisites

- **Node.js**: ^20.19.0 or >=22.12.0
- **Docker** and **Docker Compose** (for containerized setup)
- **npm** (comes with Node.js)

## Installation

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd infinite-waffle
```

2. Start the application with Docker Compose:
```bash
docker-compose up
```

This will:
- Build and start the backend server on port `3000`
- Build and start the frontend dev server on port `5173`
- Set up the network between services

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

### Local Development

1. Install dependencies at the root:
```bash
npm install
```

2. Start the backend server:
```bash
cd nitro-app
npm run dev
```

3. In a separate terminal, start the frontend:
```bash
cd vue-app
npm run dev
```

## Development

### Frontend Development

```bash
cd vue-app

# Start dev server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Run unit tests
npm run test:unit
```

### Backend Development

```bash
cd nitro-app

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Endpoints

### GET `/api`

Server-Sent Events (SSE) endpoint that streams sensor data in real-time.

**Response Format:**
```json
{
  "t": 1234567890, // Timestamp
  "v": "42.50", // Value (as string)
  "m": "Msg_abc123", // Message
  "type": "TEMP", // Sensor type: TEMP | HEARTBEAT | ERROR
  "metadata": {
    "device_id": "SENSOR_01" // Device identifier (may be null)
  }
}
```

The backend generates mock sensor data every 100ms with random values and types.

## Configuration

### Frontend Settings

The application settings can be configured in the Pinia store (`vue-app/src/stores/index.ts`):

- `active`: Enable/disable data collection (default: `true`)
- `rowsCount`: Maximum number of rows to display (default: `50`)
- `refreshRate`: UI refresh rate in milliseconds (default: `200`)
- `filterValue`: Filter sensor data by type: `'ALL' | 'TEMP' | 'HEARTBEAT' | 'ERROR'` (default: `'ALL'`)

### Backend Configuration

The backend server configuration is in `nitro-app/nitro.config.ts`. The server:
- Runs on port `3000` (configurable via `NITRO_PORT` environment variable)
- Uses the `shared` directory for type definitions
- Generates sensor data at 100ms intervals

## Testing

Run unit tests for the frontend:

```bash
cd vue-app
npm run test:unit
```

Tests are located in `vue-app/src/components/__tests__/` and use Vitest with Vue Test Utils.

## Docker Configuration

### Frontend Container
- Base image: `node:22-alpine`
- Port: `5173`
- Volume mounts: `./vue-app` for hot reloading

### Backend Container
- Base image: `node:22-alpine`
- Port: `3000`
- Environment variables:
  - `NITRO_HOST=0.0.0.0`
  - `NITRO_PORT=3000`

### Network
Both services run on the `evopark-net` bridge network for inter-service communication.

## Data Flow

1. Backend generates mock sensor data every 100ms
2. Data is sent via Server-Sent Events to the frontend
3. Frontend `useSensor` composable receives and parses the data
4. Data is stored in a circular buffer (queue) with configurable size
5. UI updates at the configured refresh rate using `requestAnimationFrame`
6. Dashboard displays filtered data and calculated averages

## Type Definitions

### Sensor Types
- `TEMP`: Temperature sensor data
- `HEARTBEAT`: Heartbeat sensor data
- `ERROR`: Error sensor data

### Sensor Data Structure
```typescript
interface SensorData {
  id: number
  timestamp: number
  value: number | null
  message: string
  type: SensorType
  device_id: string | 'UNKNOWN'
}
```

