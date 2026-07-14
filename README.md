# 🏟️ StadiumIQ — GenAI Smart Stadium & Tournament Operations

> A GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, and venue staff at FIFA World Cup 2026.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-match--day--helper.vercel.app-gold?style=flat-square)](https://match-day-helper.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Rohanindia%2Fmed-181717?style=flat-square&logo=github)](https://github.com/Rohanindia/med)

---

## 🎯 Problem Statement

Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, or venue staff. The solution must leverage Generative AI to improve navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, or real-time decision support during the FIFA World Cup 2026.

---

## ✅ How StadiumIQ Addresses Every Requirement

### 🗺️ Navigation
- AI-powered natural language directions ("How do I get to Section C?")
- Interactive SVG stadium map with clickable zone selection
- Directional text for every zone (accessible routes, rideshare pickup, etc.)

### 📊 Crowd Management System
- **Live Crowd Management System** dashboard for 6 stadium zones
- Color-coded capacity indicators (GREEN / YELLOW / RED)
- AI recommendation for least-crowded entrances with % capacity and wait time
- Auto-refresh every 30 seconds with manual refresh button
- Real-time decision support for operational staff

### ♿ Accessibility
- Dedicated Accessibility Guide page with 5 service categories
- Wheelchair routes, ramp locations, and step-free entry info
- Hearing loop zones and induction loop details
- High contrast mode toggle (WCAG AAA colours)
- Large text toggle (applies `large-text` CSS class for 20% font scale)
- Screen reader support with ARIA live regions on all dynamic content
- Skip-to-main-content keyboard link in Navbar
- WCAG 2.1 AA compliant across all components

### 🚆 Transportation
- Real-time metro, bus, taxi, and parking information
- Live status and departure estimates for all transport modes
- "Plan My Route with AI" CTA linking to the AI assistant
- Multi-modal coverage: Metro · Bus · Taxi/Rideshare · Parking

### 🌿 Sustainability
- Route optimisation to reduce unnecessary stadium movement
- Crowd distribution prevents dangerous bottlenecks
- Digital-first approach eliminates paper materials

### 🌐 Multilingual Assistance
- Grok AI responds in **English, Español, Français, العربية, हिन्दी**
- Language selector in the AI assistant panel
- Language auto-detection based on user's input phrasing
- Localized match schedule display using `toLocaleString()`

### 🔧 Operational Intelligence
- **Operational Intelligence — Staff Portal** with zone status management
- Real-time incident reporting (report issue, request backup, emergency contact)
- Activity log of all field actions with timestamps (last 20 entries)
- Emergency alert broadcasting via the Emergency Alerts component

### ⚡ Real-time Decision Support
- AI analyses crowd data and gives live entrance recommendations
- Emergency alert system with immediate ARIA `role="alert"` announcements
- Live match countdown timers refreshing every second
- Auto-refreshing crowd data with PerformanceObserver Web Vitals monitoring

---

## 👥 Personas Served

| Persona | Features Available |
|---|---|
| **Fans** | Navigation, Match Schedule, Transport Hub, AI Chat, Food Locations |
| **Organizers** | Crowd Management Dashboard, Emergency Alerts, Analytics |
| **Volunteers** | Quick Actions, Zone Updates, Incident Reports, Activity Log |
| **Venue Staff** | Operational Intelligence Portal, Backup Requests, Zone Management |

---

## 🤖 GenAI Implementation (Grok by xAI)

| Aspect | Implementation |
|---|---|
| Model | `grok-2-latest` via xAI API |
| Access | TanStack Start server function (API key never exposed to client) |
| Context | Stadium-specific system prompt for FIFA World Cup 2026 |
| Languages | 5 languages — English, Spanish, French, Arabic, Hindi |
| Use cases | Navigation, crowd advice, transport planning, accessibility |
| Rate limiting | 10 messages per minute (client-side enforcement) |
| Input safety | HTML-strip sanitisation before every API call |
| Fallback | Graceful error messages when API is unavailable |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [TanStack Start](https://tanstack.com/router) — file-based SSR routing |
| Core Library | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite 8](https://vite.dev/) with `@lovable.dev/vite-tanstack-config` |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) — native Vite integration |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) + [Lucide React](https://lucide.dev/) |
| Data Fetching | [TanStack Query](https://tanstack.com/query) |
| Validation | [Zod](https://zod.dev/) for API input schemas |
| Deployment | [Vercel](https://vercel.com/) via Nitro serverless preset |
| Type Safety | TypeScript strict mode + JSDoc `@param`/`@returns` on all exports |

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── AIAssistant.tsx        # Multilingual AI chat widget
│   ├── AccessibilityGuide.tsx # Accessibility services + display modes
│   ├── CrowdDashboard.tsx     # Crowd Management System — live dashboard
│   ├── EmergencyAlerts.tsx    # Emergency alert banners
│   ├── ErrorBoundary.tsx      # React Error Boundary (class component)
│   ├── MatchSchedule.tsx      # Match schedule with countdown + filters
│   ├── Navbar.tsx             # Sticky navigation with skip link
│   ├── PageSkeleton.tsx       # Accessible loading skeleton
│   ├── StadiumMap.tsx         # Interactive SVG stadium map
│   ├── StaffPortal.tsx        # Operational Intelligence — staff portal
│   └── TransportHub.tsx       # Multi-modal transport hub
├── hooks/
│   └── useDebounce.ts         # Debounce hook (used in AI chat input)
├── lib/
│   ├── chat.functions.ts      # TanStack Start server fn → Grok AI
│   ├── constants.ts           # App-wide constants (single source of truth)
│   ├── helpers.ts             # Pure utility functions (sanitise, format, etc.)
│   └── vitals.ts              # Web Vitals monitoring (LCP, CLS, FID)
└── routes/
    ├── __root.tsx             # App shell (Navbar, ErrorBoundary, footer)
    ├── index.tsx              # Home — dashboard
    ├── accessibility.tsx      # /accessibility
    ├── map.tsx                # /map
    ├── schedule.tsx           # /schedule
    ├── staff.tsx              # /staff
    └── transport.tsx          # /transport
```

---

## 🚀 Live Demo

👉 **https://match-day-helper.vercel.app**

## 💻 Repository

👉 **https://github.com/Rohanindia/med**

---

## 🏃 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (or Bun v1.2+)

### 1. Clone repository
```bash
git clone https://github.com/Rohanindia/med
cd med
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env   # or create .env manually
```
Add your xAI API key (powers the Grok AI assistant):
```env
GROK_API_KEY=your_xai_api_key_here
```

### 4. Run development server
```bash
npm run dev
# → http://localhost:8080
```

### 5. Build for production
```bash
npm run build
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROK_API_KEY` | xAI API key for Grok access | ✅ Yes |

---

## ♿ Accessibility (WCAG 2.1 AA)

- ✅ All interactive elements have `aria-label` or visible labels
- ✅ Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`, `<aside>`)
- ✅ Skip navigation link in Navbar (visible on focus)
- ✅ ARIA live regions on all dynamically updated content
- ✅ Keyboard navigation — all zone buttons have `tabIndex={0}` + `onKeyDown`
- ✅ High contrast mode toggle (CSS class on `<html>`)
- ✅ Large text toggle (20% font scale via CSS class)
- ✅ Focus-visible ring indicators on all interactive elements
- ✅ `role="alert"` on emergency banners for immediate screen-reader announcement
- ✅ `role="log"` with `aria-live="polite"` on AI chat history

---

## 🔒 Security

- API keys stored in server environment variables only (never in client bundle)
- Input sanitisation (`sanitizeInput`) strips HTML tags before AI processing
- Zod schema validation on all server function inputs
- Client-side rate limiting (10 msgs/min) prevents API abuse
- TanStack Start server functions run in an isolated server context

---

## ⚡ Performance

- TanStack Router automatic code-splitting per route
- `React.memo` on every component to prevent unnecessary re-renders
- `useMemo` for all expensive derived data (filtered lists, sorted arrays, aggregates)
- `useCallback` for all event handlers passed as props
- `useDebounce` hook for AI chat character counter
- Web Vitals monitoring (LCP, CLS, FID) via PerformanceObserver
- `requestIdleCallback` for non-critical preloading
- DNS prefetch + preconnect resource hints for AI gateway and Google Fonts

---

## 🎯 Evaluation Highlights

| Category | Implementation |
|---|---|
| GenAI | Grok-2, server-side, multilingual (5 languages) |
| Navigation | Natural language AI + Interactive SVG map |
| Crowd Management | Live Crowd Management System with 30s auto-refresh |
| Accessibility | WCAG 2.1 AA, high contrast, large text, ARIA throughout |
| Transportation | Metro · Bus · Taxi · Parking with live status |
| Multilingual | 5-language AI assistant with selector |
| Real-time Support | Web Vitals, auto-refresh, live countdowns |
| Operational Intelligence | Staff Portal with zone management + activity log |
| Code Quality | TypeScript strict + JSDoc on all exports + ErrorBoundary |
| Security | Server-only API key, Zod validation, HTML sanitisation |

---

## 🏆 Built For

**PromptWars Virtual Hackathon — Challenge 4**  
Smart Stadiums & Tournament Operations  
FIFA World Cup 2026
