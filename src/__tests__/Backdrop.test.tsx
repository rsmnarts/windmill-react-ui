import { render, screen } from '@testing-library/react'
import React from 'react'
import Backdrop from '../Backdrop'

describe('Backdrop', () => {
  it('should render without crashing', () => {
    render(<Backdrop />)
  })

  it('should render with base styles', () => {
    const expected =
      'fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center'
    render(<Backdrop />)

    expect(screen.getByTestId('backdrop').getAttribute('class')).toContain(expected)
  })
})
