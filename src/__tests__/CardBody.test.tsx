import { render, screen } from '@testing-library/react'
import React from 'react'
import CardBody from '../CardBody'

describe('CardBody', () => {
  it('should render without crashing', () => {
    render(<CardBody />)
  })

  it('should render with default styles', () => {
    const expected = 'p-4'
    render(<CardBody />)

    expect(screen.getByRole('card-body').getAttribute('class')).toContain(expected)
  })
})
