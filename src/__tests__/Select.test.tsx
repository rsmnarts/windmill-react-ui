import { render, screen } from '@testing-library/react'
import React from 'react'
import Select from '../Select'
import theme from '../themes/default'

describe('Select', () => {
  it('should render without crashing', () => {
    render(
      <Select>
        <option value="lorem">Lorem</option>
      </Select>
    )
  })

  it('should render with base styles', () => {
    const expected = 'block w-full text-sm dark:text-gray-300 focus:outline-none'
    render(<Select />)

    expect(screen.getByRole('select').getAttribute('class')).toContain(expected)
  })

  it('should render with select styles', () => {
    const expected = theme.select.select
    render(<Select />)

    expect(screen.getByRole('select').getAttribute('class')).toContain(expected)
  })

  it('should render with active styles', () => {
    const expected = theme.select.active
    render(<Select />)

    expect(screen.getByRole('select').getAttribute('class')).toContain(expected)
  })

  it('should render with valid styles', () => {
    const expected = theme.select.valid
    render(<Select valid />)

    expect(screen.getByRole('select').getAttribute('class')).toContain(expected)
  })

  it('should render with invalid styles', () => {
    const expected = theme.select.invalid
    render(<Select valid={false} />)

    expect(screen.getByRole('select').getAttribute('class')).toContain(expected)
  })

  it('should render with disabled styles', () => {
    const expected = 'cursor-not-allowed opacity-50 bg-gray-300 dark:bg-gray-800'
    render(<Select disabled />)

    expect(screen.getByRole('select').getAttribute('class')).toContain(expected)
  })

  it('should render option children', () => {
    const expected = 2
    render(
      <Select>
        <option>1</option>
        <option>2</option>
      </Select>
    )

    expect(screen.getByRole('select').childNodes).toHaveLength(expected)
  })

  it('should contain name attribute', () => {
    render(
      <Select name="test-name">
        <option value="lorem">Lorem</option>
      </Select>
    )

    expect(screen.getByRole('select').getAttribute('name')).toBe('test-name')
  })
})
