import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Alert from '../Alert'

describe('Alert', () => {
  it('should render without crashing', () => {
    render(<Alert />)
  })

  it('should contain a alert', () => {
    render(<Alert />)

    expect(screen.getByRole('alert')).toBeVisible
  })

  it('should contain a close button', () => {
    render(<Alert onClose={() => { }} />)

    expect(screen.getByRole('button')).toBeVisible
  })

  it('should call a function when close button is clicked', () => {
    const onClose = jest.fn()
    render(<Alert onClose={onClose} />)
    const user = userEvent.setup()
    const btn = screen.getByRole('button')
    user.click(btn)

    expect(onClose).toHaveBeenCalled
  })

  it('should render a success icon', () => {
    render(<Alert type="success" />)

    expect(screen.getByTestId('success-icon')).toBeVisible
  })

  it('should render a danger icon', () => {
    render(<Alert type="danger" />)

    expect(screen.getByTestId('danger-icon')).toBeVisible
  })

  it('should render an info icon', () => {
    render(<Alert type="info" />)

    expect(screen.getByTestId('info-icon')).toBeVisible
  })

  it('should render a warning icon', () => {
    render(<Alert type="warning" />)

    expect(screen.getByTestId('warning-icon')).toBeVisible
  })

  it('should render a neutral icon', () => {
    render(<Alert />)

    expect(screen.getByTestId('neutral-icon')).toBeVisible
  })

  it('should render a neutral icon for an invalid type', () => {
    // @ts-expect-error
    render(<Alert type="invalid" />)

    expect(screen.getByTestId('neutral-icon')).toBeVisible
  })
})
