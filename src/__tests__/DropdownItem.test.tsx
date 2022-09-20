import { render, screen } from '@testing-library/react'
import React from 'react'
import DropdownItem from '../DropdownItem'

describe('DropdownItem', () => {
  it('should render without crashing', () => {
    render(<DropdownItem />)
  })

  it('should render with base styles', () => {
    const expected = 'mb-2 last:mb-0'
    render(<DropdownItem />)

    expect(screen.getByRole('listitem').getAttribute('class')).toContain(expected)
  })

  it('should contain a Button child', () => {
    render(<DropdownItem />)

    expect(screen.getByRole('button')).toBeTruthy()
  })

  it('should pass className to the inner button', () => {
    const expected = 'bg-red-600'
    render(<DropdownItem className="bg-red-600" />)

    expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
  })

  it('should pass extra props to the inner button', () => {
    const expected = 'test'
    const { container } = render(<DropdownItem tag="a" href="test" />)

    expect(container.querySelector('a')?.getAttribute('href')).toContain(expected)
  })
})
