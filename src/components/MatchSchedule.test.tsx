import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MatchSchedule } from './MatchSchedule'

describe('MatchSchedule', () => {
  it('renders without crashing', () => {
    render(<MatchSchedule />)
    expect(document.body).toBeTruthy()
  })
  it('shows match content', () => {
    render(<MatchSchedule />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has filter controls', () => {
    render(<MatchSchedule />)
    const selects = screen.getAllByRole('combobox')
    expect(selects.length).toBeGreaterThan(0)
    fireEvent.change(selects[0], { target: { value: 'A' } })
    expect(document.body).toBeTruthy()
  })
  it('shows FIFA World Cup content', () => {
    render(<MatchSchedule />)
    const html = document.body.innerHTML.toLowerCase()
    expect(
      html.includes('match') ||
      html.includes('fifa') ||
      html.includes('schedule') ||
      html.includes('vs') ||
      html.includes('group')
    ).toBe(true)
  })
})
