# 🏟️ StadiumIQ — GenAI Smart Stadium & Tournament Operations Assistant

StadiumIQ (StadiumFlow AI) is a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, and venue staff during the FIFA World Cup 2026. It leverages Generative AI to improve navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, and real-time decision support.

## 🎯 Problem Statement

Build a GenAI-enabled solution that enhances stadium operations and the overall tournament experience for fans, organizers, volunteers, and venue staff. The solution must leverage Generative AI to improve navigation, crowd management, accessibility, transportation, sustainability, multilingual assistance, operational intelligence, and real-time decision support during the FIFA World Cup 2026.

## ✅ How StadiumIQ Solves Every Requirement

| Requirement | StadiumIQ Solution |
|---|---|
| Navigation | AI-powered turn-by-turn stadium directions via chat + interactive SVG map |
| Crowd Management | Live zone density dashboard, auto-refresh, AI recommendations |
| Accessibility | Wheelchair routes, hearing loops, high-contrast + large-text modes |
| Transportation | Metro, bus, taxi/rideshare, parking real-time info |
| Multilingual Assistance | English, Español, Français, العربية, हिन्दी via Gemini |
| Operational Intelligence | Staff portal with zone management + incident reporting |
| Real-time Decision Support | AI recommends least-crowded gates and safest routes |
| Fan Experience | Match schedule, live countdown, alerts, notifications |
| Volunteer Support | Quick action panel and incident reporting |
| Sustainability | Route optimization reduces walk/idle time and carbon footprint |

## 👥 Personas Served
- **Fans** — Navigation, match info, transport, food locations, multilingual help
- **Organizers** — Crowd overview, emergency management, real-time decisions
- **Volunteers** — Quick reporting, zone updates, backup requests
- **Venue Staff** — Operational dashboard, real-time alerts, incident triage

## 🤖 GenAI Features (Gemini Powered)
- Natural-language stadium navigation
- Multilingual assistance (5 languages)
- Crowd flow recommendations
- Emergency response guidance
- Personalized fan experience

Calls are routed through the Lovable AI Gateway using `google/gemini-2.5-flash` — no API keys are exposed to the browser. Input is sanitized and rate-limited (10 msgs/min, 300 chars max) inside `AIAssistant.tsx`.

## 🧱 Architecture

- **Framework:** TanStack Start (React 19, Vite, SSR-ready)
- **Styling:** Tailwind v4 with semantic design tokens (navy + gold)
- **State:** Local component state + TanStack Router loaders
- **AI:** Server function `chatWithStadiumIQ` → Lovable AI Gateway → Gemini 2.5 Flash
- **Constants:** All magic values in `src/lib/constants.ts`
- **Helpers:** Pure functions in `src/lib/helpers.ts` (sanitization, crowd math, formatting)

## 📂 File Structure (excerpt)

```
src/
  components/
    AIAssistant.tsx        # Floating multilingual chat
    CrowdDashboard.tsx     # Live zone density + AI recs
    StadiumMap.tsx         # Interactive SVG stadium
    TransportHub.tsx       # Transit + parking
    MatchSchedule.tsx      # Fixtures + countdown
    AccessibilityGuide.tsx # A11y toggles + features
    EmergencyAlerts.tsx    # Live alert banner
    StaffPortal.tsx        # Ops + incident tools
    Navbar.tsx
  lib/
    chat.functions.ts      # createServerFn → Gemini
    constants.ts
    helpers.ts
  routes/                  # File-based routing
    __root.tsx, index.tsx, map.tsx, transport.tsx,
    schedule.tsx, accessibility.tsx, staff.tsx
```

## 🚀 Getting Started

```bash
bun install       # or: npm install
bun dev           # or: npm run dev
```

## 🧪 Running Tests

```bash
npm test                 # vitest run — 36 tests across 6 files
npm run test:watch       # watch mode
npm run test:coverage    # coverage report (lcov + text)
```

Tests cover: helpers (sanitization, crowd color/bar, wait format, deterministic data), CrowdDashboard, EmergencyAlerts, AccessibilityGuide, MatchSchedule, and the AIAssistant chat surface.

## 🔑 Environment Variables

The Gemini key is provided server-side by the Lovable AI Gateway — no `VITE_*` key is required in the browser. When self-hosting, set `LOVABLE_API_KEY` in your server environment.

## ♿ Accessibility Features
- Skip-to-content link
- Semantic landmarks (`header`, `nav`, `main`, `section`, `aside`)
- ARIA labels on all interactive controls
- `aria-live` regions for alerts and AI recommendations
- Keyboard-navigable stadium map zones
- Large-text toggle (`.large-text`)
- High-contrast toggle (`.high-contrast`)
- Screen-reader-only skip link
- Visible focus rings via `focus:ring-2 focus:ring-ring`

## 🔒 Security Measures
- Input sanitization strips HTML tags before AI calls
- 300-character input cap
- 10-message-per-minute client-side rate limit
- No API keys in the browser bundle (server-only via Lovable AI Gateway)
- Server function validates payload with Zod
- Content Security-friendly: no `dangerouslySetInnerHTML`
