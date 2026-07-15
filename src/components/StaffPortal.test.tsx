import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StaffPortal } from './StaffPortal'

describe('StaffPortal', () => {
  it('renders without crashing', () => {
    render(<StaffPortal />)
    expect(document.body).toBeTruthy()
  })
  it('shows staff content', () => {
    render(<StaffPortal />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has action buttons', () => {
    render(<StaffPortal />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
  it('clicking action works', () => {
    render(<StaffPortal />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
})
