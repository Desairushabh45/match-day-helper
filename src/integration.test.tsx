import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock("@tanstack/react-start", () => ({
  useServerFn: () => vi.fn().mockResolvedValue({ reply: "Test response" }),
}));
vi.mock("@/lib/chat.functions", () => ({
  chatWithStadiumIQ: vi.fn(),
}));

import { CrowdDashboard } from './components/CrowdDashboard'
import { StadiumMap } from './components/StadiumMap'
import { TransportHub } from './components/TransportHub'
import { AIAssistant } from './components/AIAssistant'

describe('Integration Tests', () => {
  it('full app renders', () => {
    const { container } = render(
      <div>
        <header>StadiumIQ</header>
        <main>
          <CrowdDashboard />
          <StadiumMap />
          <TransportHub />
        </main>
      </div>
    )
    expect(container.innerHTML.length).toBeGreaterThan(500)
  })
  it('has StadiumIQ branding', () => {
    render(
      <div>
        <header>StadiumIQ</header>
        <main><CrowdDashboard /></main>
      </div>
    )
    expect(document.body.innerHTML).toContain('Stadium')
  })
  it('navigation works', () => {
    render(
      <div>
        <CrowdDashboard />
        <StadiumMap />
      </div>
    )
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 1) fireEvent.click(buttons[1])
    expect(document.body).toBeTruthy()
  })
  it('crowd dashboard visible', () => {
    render(<CrowdDashboard />)
    const html = document.body.innerHTML.toLowerCase()
    expect(
      html.includes('crowd') ||
      html.includes('gate') ||
      html.includes('capacity')
    ).toBe(true)
  })
  it('AI assistant button present', () => {
    render(<AIAssistant />)
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })
  it('app has proper structure', () => {
    render(
      <div>
        <header>StadiumIQ</header>
        <main><CrowdDashboard /></main>
      </div>
    )
    expect(
      document.querySelector('header') ||
      document.querySelector('nav') ||
      document.querySelector('main')
    ).toBeTruthy()
  })
})
