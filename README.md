# 🚗 Uber Clone — Full-Stack Real-Time Ride Booking App

A full-stack Uber clone with real-time ride booking, captain matching, live GPS tracking, and OTP verification. Built with **React**, **Node.js**, **MongoDB**, and **Socket.IO**, fully containerized with **Docker**.

> **No paid API keys required** — uses free, open-source mapping services (OpenStreetMap, Photon, OSRM).

![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-7-green?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4-black?logo=socket.io)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Socket Events](#-socket-events)
- [Maps & Geocoding](#-maps--geocoding)
- [Screenshots](#-screenshots)

---

## ✨ Features

### User (Rider)
- 📝 Register & login with JWT authentication
- 📍 Search pickup & destination with autocomplete (debounced)
- 🚗 Choose vehicle type — Car, Moto, or Auto
- 💰 Get fare estimate before booking
- 🔢 OTP-based ride verification
- 📡 Real-time captain matching via WebSockets
- 🗺️ Live GPS tracking on interactive map
- 🚕 Ride status updates in real-time

### Captain (Driver)
- 📝 Register with vehicle details (type, color, plate, capacity)
- 📡 Receive ride requests in real-time
- ✅ Accept/ignore ride requests
- 🔢 Verify rider OTP to start ride
- 🗺️ Live location tracking (broadcasts every 10s)
- 📊 Dashboard with stats — earnings, km driven, rides completed, hours
- 🏁 Complete ride with one tap

### System
- 🔐 Separate auth tokens for users and captains (no collision)
- 🍪 Cookie + Bearer token dual auth
- 🌍 Radius-based captain matching (50km for testing)
- ⚡ Real-time communication via Socket.IO
- 🐳 Fully Dockerized (MongoDB + Backend + Frontend)
- 🔄 Nginx reverse proxy with API routing

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 6 | Build tool & dev server |
| Tailwind CSS 3 | Styling |
| React Router v7 | Client-side routing |
| Leaflet + react-leaflet | Interactive maps |
| Socket.IO Client | Real-time communication |
| GSAP | Panel animations |
| Axios | HTTP requests |
| Remix Icon | Icon set |

### Backend
| Technology | Purpose |
|---|---|
| Node.js 20 | Runtime |
| Express 5 | HTTP framework |
| MongoDB 7 + Mongoose | Database + ODM |
| Socket.IO | WebSocket server |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| express-validator | Request validation |
| cookie-parser | Cookie handling |

### Maps (Free, No API Key)
| Service | Purpose |
|---|---|
| [Photon by Komoot](https://photon.komoot.io) | Geocoding + autocomplete |
| [OSRM](http://router.project-osrm.org) | Routing, distance & duration |
| [OpenStreetMap Tiles](https://www.openstreetmap.org) | Map display |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerization |
| Nginx | Reverse proxy + static file serving |
| Multi-stage Docker build | Optimized frontend image |

---

## 🏗 Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   Frontend       │     │   Backend        │     │   MongoDB        │
│   (React/Nginx)  │────▶│   (Express)      │────▶│   (Database)     │
│   Port: 5173     │     │   Port: 4000     │     │   Port: 27017    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
        │                        │
        │    WebSocket           │    HTTP
        └────────────────────────┘
                │
    ┌───────────┴───────────┐
    │                       │
    ▼                       ▼
┌──────────┐         ┌──────────┐
│  Photon  │         │   OSRM   │
│ Geocoding│         │ Routing  │
└──────────┘         └──────────┘
```

**Nginx** serves the React SPA and proxies API requests (`/users`, `/captains`, `/maps`, `/rides`, `/socket.io`) to the backend container, so the frontend only talks to one origin.

---

## 📁 Project Structure

```
Uber_Video/
├── docker-compose.yml          # Docker orchestration (3 services)
├── .gitignore
│
├── Backend/
│   ├── Dockerfile              # Node.js 20 Alpine
│   ├── package.json
│   ├── server.js               # HTTP + Socket.IO server setup
│   ├── app.js                  # Express app configuration
│   ├── socket.js               # Socket.IO event handlers
│   │
│   ├── controllers/
│   │   ├── user.controller.js      # Register, login, profile, logout
│   │   ├── captain.controller.js   # Register, login, profile, stats, logout
│   │   ├── ride.controller.js      # Create, get-fare, confirm, start, end ride
│   │   └── map.controller.js       # Coordinates, distance-time, suggestions
│   │
│   ├── models/
│   │   ├── user.model.js           # User schema (name, email, password)
│   │   ├── captain.model.js        # Captain schema (+ vehicle, location, status)
│   │   ├── ride.model.js           # Ride schema (pickup, dest, fare, OTP, status)
│   │   └── blacklistToken.model.js # JWT blacklist for logout
│   │
│   ├── routes/
│   │   ├── user.routes.js
│   │   ├── captain.routes.js
│   │   ├── ride.routes.js
│   │   └── maps.routes.js
│   │
│   ├── services/
│   │   ├── user.service.js         # User creation logic
│   │   ├── captain.service.js      # Captain creation logic
│   │   ├── ride.service.js         # Fare calculation, OTP generation
│   │   └── maps.service.js         # Photon/OSRM integration + caching
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js      # authUser + authCaptain (cookie/bearer)
│   │
│   └── db/
│       └── db.js                   # MongoDB connection
│
└── frontend/
    ├── Dockerfile              # Multi-stage (Node build → Nginx serve)
    ├── nginx.conf              # Reverse proxy config
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    │
    ├── public/
    │   ├── car.svg             # Vehicle icons (local SVGs)
    │   ├── moto.svg
    │   └── auto.svg
    │
    └── src/
        ├── App.jsx             # Route definitions
        ├── main.jsx            # React entry point
        ├── index.css           # Tailwind + custom animations
        │
        ├── pages/
        │   ├── Start.jsx               # Landing page
        │   ├── UserLogin.jsx           # User login (with error handling)
        │   ├── UserSignup.jsx          # User registration
        │   ├── UserLogout.jsx          # User logout
        │   ├── UserProtectWrapper.jsx  # Auth guard for user routes
        │   ├── Home.jsx                # Main rider page (search, book, track)
        │   ├── Riding.jsx              # Active ride view for user
        │   ├── Captainlogin.jsx        # Captain login
        │   ├── CaptainSignup.jsx       # Captain registration
        │   ├── CaptainLogout.jsx       # Captain logout
        │   ├── CaptainProtectWrapper.jsx # Auth guard for captain routes
        │   ├── CaptainHome.jsx         # Captain dashboard (map + stats)
        │   └── CaptainRiding.jsx       # Active ride view for captain
        │
        ├── components/
        │   ├── LocationSearchPanel.jsx # Autocomplete suggestions list
        │   ├── VehiclePanel.jsx        # Vehicle type selection
        │   ├── ConfirmRide.jsx         # Ride confirmation with fare
        │   ├── LookingForDriver.jsx    # Searching animation
        │   ├── WaitingForDriver.jsx    # Driver assigned + OTP display
        │   ├── RidePopUp.jsx           # New ride popup (captain side)
        │   ├── ConfirmRidePopUp.jsx    # OTP entry (captain side)
        │   ├── FinishRide.jsx          # Complete ride (captain side)
        │   ├── CaptainDetails.jsx      # Captain profile + stats card
        │   └── LiveTracking.jsx        # Leaflet map with GPS tracking
        │
        └── context/
            ├── UserContext.jsx         # User state provider
            ├── CapatainContext.jsx      # Captain state provider
            └── SocketContext.jsx        # Socket.IO provider
```

---

## 🚀 Getting Started

### Prerequisites

- **Docker** & **Docker Compose** installed ([Get Docker](https://docs.docker.com/get-docker/))
- **Git**

### Quick Start (Docker)

```bash
# 1. Clone the repository
git clone https://github.com/narang25/Uber_Video.git
cd Uber_Video

# 2. Start all services
docker compose up --build -d

# 3. Open the app
open http://localhost:5173
```

That's it! Three containers will start:
| Container | Port | Description |
|---|---|---|
| `uber-frontend` | `5173` | React app served by Nginx |
| `uber-backend` | `4000` | Express API + Socket.IO |
| `uber-mongo` | `27017` | MongoDB database |

### Stop

```bash
docker compose down
```

### Stop & Remove Data

```bash
docker compose down -v    # removes MongoDB volume too
```

### Local Development (Without Docker)

```bash
# Terminal 1 — Start MongoDB (must be running locally)
mongod

# Terminal 2 — Start Backend
cd Backend
npm install
echo "PORT=4000\nDB_CONNECT=mongodb://localhost:27017/uber\nJWT_SECRET=your-secret" > .env
node server.js

# Terminal 3 — Start Frontend
cd frontend
npm install
echo "VITE_BASE_URL=http://localhost:4000" > .env
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`Backend/.env`)
| Variable | Description | Default (Docker) |
|---|---|---|
| `PORT` | Server port | `4000` |
| `DB_CONNECT` | MongoDB connection string | `mongodb://mongo:27017/uber` |
| `JWT_SECRET` | JWT signing secret | `uber-secret` |

### Frontend (`frontend/.env`)
| Variable | Description | Default (Docker) |
|---|---|---|
| `VITE_BASE_URL` | Backend API URL | `http://localhost:5173` (proxied by Nginx) |

> In Docker, the frontend Nginx proxies `/users`, `/captains`, `/maps`, `/rides`, and `/socket.io` to the backend, so `VITE_BASE_URL` points to the same origin.

---

## 📡 API Endpoints

### Users `/users`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/register` | ✗ | Register new user |
| POST | `/users/login` | ✗ | Login user |
| GET | `/users/profile` | ✓ User | Get user profile |
| GET | `/users/logout` | ✓ User | Logout user |

### Captains `/captains`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/captains/register` | ✗ | Register new captain |
| POST | `/captains/login` | ✗ | Login captain |
| GET | `/captains/profile` | ✓ Captain | Get captain profile |
| GET | `/captains/stats` | ✓ Captain | Get earnings, km, rides, hours |
| GET | `/captains/logout` | ✓ Captain | Logout captain |

### Rides `/rides`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/rides/create` | ✓ User | Create a ride request |
| GET | `/rides/get-fare` | ✓ User | Get fare estimate |
| POST | `/rides/confirm` | ✓ Captain | Accept a ride |
| GET | `/rides/start-ride` | ✓ Captain | Start ride (OTP verified) |
| POST | `/rides/end-ride` | ✓ Captain | Complete the ride |

### Maps `/maps`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/maps/get-coordinates` | ✓ User | Geocode an address |
| GET | `/maps/get-distance-time` | ✓ User | Get distance & duration |
| GET | `/maps/get-suggestions` | ✓ User | Autocomplete suggestions |

---

## 🔌 Socket Events

### Client → Server
| Event | Payload | Description |
|---|---|---|
| `join` | `{ userId, userType }` | Register socket with user/captain ID |
| `update-location-captain` | `{ userId, location: { ltd, lng } }` | Captain broadcasts GPS position |

### Server → Client
| Event | Payload | Description |
|---|---|---|
| `new-ride` | Ride object | New ride request sent to nearby captains |
| `ride-confirmed` | Ride + captain details | Captain accepted the ride |
| `ride-started` | Ride object | Ride has started (OTP verified) |
| `ride-ended` | Ride object | Ride completed |

---

## 🗺 Maps & Geocoding

This project uses **completely free** mapping services with **no API keys**:

### Photon by Komoot
- **Purpose**: Geocoding (address → coordinates) and autocomplete
- **Endpoint**: `https://photon.komoot.io/api/`
- **Rate limit**: Fair use, no key needed
- **Implementation**: 600ms debounced requests with in-memory cache (500 entries, 24h TTL)

### OSRM (Open Source Routing Machine)
- **Purpose**: Route calculation, distance, and duration
- **Endpoint**: `https://router.project-osrm.org/route/v1/driving/`
- **Rate limit**: Fair use
- **Note**: Uses forced IPv4 (`http.Agent({ family: 4 })`) for Docker compatibility

### OpenStreetMap Tiles
- **Purpose**: Map display in the browser
- **URL**: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- **Library**: Leaflet + react-leaflet

---

## 🔄 Ride Flow

```
User                          Server                        Captain
  │                              │                              │
  │── Search pickup/dest ──────▶│                              │
  │◀── Autocomplete results ───│                              │
  │                              │                              │
  │── Get fare estimate ──────▶│                              │
  │◀── {car, moto, auto} ──────│                              │
  │                              │                              │
  │── Create ride ─────────────▶│                              │
  │◀── Ride + OTP ──────────────│                              │
  │                              │── new-ride ────────────────▶│
  │                              │                              │
  │                              │◀── Confirm ride ────────────│
  │◀── ride-confirmed ─────────│                              │
  │   (shows captain + OTP)      │                              │
  │                              │                              │
  │   (user tells OTP verbally)  │                              │
  │                              │◀── Start ride (OTP) ────────│
  │◀── ride-started ───────────│──────────────────────────────▶│
  │                              │                              │
  │                              │◀── End ride ────────────────│
  │◀── ride-ended ─────────────│──────────────────────────────▶│
  │   (navigate to home)         │                              │
```

---

## 🧪 Testing the App

1. **Open two browser windows** (or one regular + one incognito)
2. **Window 1**: Go to `http://localhost:5173` → Sign up as a **User**
3. **Window 2**: Go to `http://localhost:5173` → Sign up as a **Captain**
4. **Captain**: Allow location access → you'll see the map with your location
5. **User**: Enter pickup and destination → Choose vehicle → Confirm ride
6. **Captain**: A ride popup appears → Accept the ride
7. **User**: See captain details and OTP
8. **Captain**: Enter the OTP → Start the ride
9. Both see live tracking → Captain completes the ride

---

## 📄 License

This project is for educational purposes.

---

## 👨‍💻 Author

**Nikhil Narang** — [@narang25](https://github.com/narang25)
