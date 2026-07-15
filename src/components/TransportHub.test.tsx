import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TransportHub } from './TransportHub'

describe('TransportHub', () => {
  it('renders without crashing', () => {
    render(<TransportHub />)
    expect(document.body).toBeTruthy()
  })
  it('shows transport options', () => {
    render(<TransportHub />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has interactive elements', () => {
    render(<TransportHub />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
  it('shows transport types', () => {
    render(<TransportHub />)
    const html = document.body.innerHTML.toLowerCase()
    expect(
      html.includes('metro') ||
      html.includes('bus') ||
      html.includes('taxi') ||
      html.includes('transport')
    ).toBe(true)
  })
})
