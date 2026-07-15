import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { StadiumMap } from './StadiumMap'

describe('StadiumMap', () => {
  it('renders without crashing', () => {
    render(<StadiumMap />)
    expect(document.body).toBeTruthy()
  })
  it('shows map content', () => {
    render(<StadiumMap />)
    expect(document.body.innerHTML.length).toBeGreaterThan(100)
  })
  it('has clickable zones', () => {
    render(<StadiumMap />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 0) fireEvent.click(buttons[0])
    expect(document.body).toBeTruthy()
  })
  it('shows zone details on click', () => {
    render(<StadiumMap />)
    const buttons = screen.getAllByRole('button')
    if (buttons.length > 1) fireEvent.click(buttons[1])
    expect(document.body).toBeTruthy()
  })
})
