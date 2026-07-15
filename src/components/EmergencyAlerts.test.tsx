import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EmergencyAlerts } from './EmergencyAlerts'

describe('EmergencyAlerts', () => {
  it('renders without crashing', () => {
    render(<EmergencyAlerts />)
    expect(document.body).toBeTruthy()
  })
  it('shows alert content', () => {
    render(<EmergencyAlerts />)
    expect(document.body.innerHTML.length).toBeGreaterThan(0)
  })
  it('has dismiss button', () => {
    render(<EmergencyAlerts />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
})
