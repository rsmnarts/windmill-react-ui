import { render, screen } from '@testing-library/react'
import React from 'react'
import HelperText from '../HelperText'

describe('HelperText', () => {
  it('should render without crashing', () => {
    render(<HelperText>Lorem ipsum</HelperText>)
  })

  it('should render with base styles', () => {
    const expected = 'text-xs'
    render(<HelperText>Lorem ipsum</HelperText>)

    expect(screen.getByRole('helper-text').getAttribute('class')).toContain(expected)
  })

  it('should render with valid styles', () => {
    const expected = 'text-green-600 dark:text-green-400'
    render(<HelperText valid>Lorem ipsum</HelperText>)

    expect(screen.getByRole('helper-text').getAttribute('class')).toContain(expected)
  })

  it('should render with invalid styles', () => {
    const expected = 'text-red-600 dark:text-red-400'
    render(<HelperText valid={false}>Lorem ipsum</HelperText>)

    expect(screen.getByRole('helper-text').getAttribute('class')).toContain(expected)
  })
})
