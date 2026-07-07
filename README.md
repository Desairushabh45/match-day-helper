# StadiumFlow AI — Smart Stadium Assistant for FIFA World Cup 2026

StadiumFlow AI is a premium, next-generation smart stadium concierge designed to enhance the experience of fans, staff, and volunteers during the FIFA World Cup 2026. Built with modern web standards, it integrates real-time stadium analytics, GenAI assistance, crowd flow monitoring, transport logistics, and accessibility routing into a unified, high-performance interface.

---

## 🌟 Key Features

### 1. 🤖 GenAI Stadium Assistant
- **AI-Powered Concierge (`AIAssistant.tsx`)**: An interactive, multilingual chatbot that answers questions for fans, volunteers, and staff. It provides directions, concession information, match details, and stadium policies.

### 2. 📊 Live Crowd & Queue Dashboard
- **Real-Time Analytics (`CrowdDashboard.tsx`)**: Monitor queue times for concession stands, restrooms, and gate entrances. Helps fans choose the best times to move around and assists stadium operations in optimizing crowd flow.

### 3. 🗺️ Interactive Stadium Map
- **Visual Spatial Navigator (`StadiumMap.tsx`)**: High-fidelity map showing seating zones, emergency exits, concessions, first aid stations, and restrooms.

### 4. 🚆 Real-Time Transport Hub
- **Transit Logistics (`TransportHub.tsx`)**: Up-to-the-minute updates on shuttle buses, light rail lines, parking lot capacities, and ride-share pick-up/drop-off zone statuses.

### 5. ♿ Accessibility Guide
- **Inclusivity First (`AccessibilityGuide.tsx`)**: Accessible route mapping, dedicated restroom locations, sensory room finder, and direct assistance hotlines for fans with physical or sensory disabilities.

### 6. 🚨 Emergency Alert System
- **Safety Banner (`EmergencyAlerts.tsx`)**: High-priority alert banner that displays emergency guidance, weather alerts, or evacuation directives instantaneously.

### 7. 💼 Staff & Volunteer Portal
- **Operations Center (`StaffPortal.tsx`)**: Task assignments, live incident reporting, status updates, and broadcast capabilities for stadium staff.

---

## 🛠️ Technology Stack

StadiumFlow AI is built using the following modern web technologies:

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (file-based routing, server functions, and modern React hydration).
- **Core Library**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/).
- **Build Tool**: [Vite](https://vite.dev/) with `vite-tsconfig-paths`.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native Vite integration.
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/) (Accordion, Dialog, Dropdown Menu, Hover Card, Popover, Progress, Tabs, Tooltip).
- **Icons**: [Lucide React](https://lucide.dev/).
- **Charts**: [Recharts](https://recharts.org/) for crowd and logistics analytics.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for data validation.

---

## 📂 Project Structure

```text
├── public/                 # Static assets (icons, images)
├── src/
│   ├── components/         # Reusable UI components & features
│   │   ├── ui/             # Core design system components (buttons, input, dialogs, etc.)
│   │   ├── AIAssistant.tsx
│   │   ├── AccessibilityGuide.tsx
│   │   ├── CrowdDashboard.tsx
│   │   ├── EmergencyAlerts.tsx
│   │   ├── MatchSchedule.tsx
│   │   ├── Navbar.tsx
│   │   ├── StadiumMap.tsx
│   │   ├── StaffPortal.tsx
│   │   └── TransportHub.tsx
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility modules
│   ├── routes/             # File-based routing (TanStack Router)
│   │   ├── __root.tsx      # App shell (Layout & global state)
│   │   ├── index.tsx       # Home dashboard
│   │   ├── accessibility.tsx
│   │   ├── map.tsx
│   │   ├── schedule.tsx
│   │   ├── staff.tsx
│   │   └── transport.tsx
│   ├── styles.css          # Global Tailwind CSS imports and themes
│   ├── router.tsx          # TanStack Router initialization
│   ├── start.ts            # Entrypoint helper
│   └── server.ts           # Nitro server configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Scripts & dependencies
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd match-day-helper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:8080/`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```
