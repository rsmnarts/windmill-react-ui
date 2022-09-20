import { render, screen } from '@testing-library/react'
import React from 'react'
import Badge from '../Badge'

describe('Badge', () => {
  it('should render without crashing', () => {
    render(<Badge />)
  })

  it('should render with base styles', () => {
    const expected = 'inline-flex px-2 text-xs font-medium leading-5 rounded-full'
    render(<Badge />)

    expect(screen.getByRole('badge').getAttribute('class')).toContain(expected)
  })

  it('should render with success styles', () => {
    const expected = 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100'
    render(<Badge type="success" />)

    expect(screen.getByRole('badge').getAttribute('class')).toContain(expected)
  })

  it('should render with danger styles', () => {
    const expected = 'text-red-700 bg-red-100 dark:text-red-100 dark:bg-red-700'
    render(<Badge type="danger" />)

    expect(screen.getByRole('badge').getAttribute('class')).toContain(expected)
  })

  it('should render with warning styles', () => {
    const expected = 'text-orange-700 bg-orange-100 dark:text-white dark:bg-orange-600'
    render(<Badge type="warning" />)

    expect(screen.getByRole('badge').getAttribute('class')).toContain(expected)
  })

  it('should render with neutral styles', () => {
    const expected = 'text-gray-700 bg-gray-100 dark:text-gray-100 dark:bg-gray-700'
    render(<Badge type="neutral" />)

    expect(screen.getByRole('badge').getAttribute('class')).toContain(expected)
  })

  it('should render with primary styles', () => {
    const expected = 'text-purple-700 bg-purple-100 dark:text-white dark:bg-purple-600'
    render(<Badge type="primary" />)

    expect(screen.getByRole('badge').getAttribute('class')).toContain(expected)
  })

  it('should render with primary styles when no type is used', () => {
    const expected = 'text-purple-700 bg-purple-100 dark:text-white dark:bg-purple-600'
    render(<Badge />)

    expect(screen.getByRole('badge').getAttribute('class')).toContain(expected)
  })
})
