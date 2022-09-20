import { render } from '@testing-library/react'
import React from 'react'
import TableBody from '../TableBody'

describe('TableBody', () => {
  it('should render without crashing', () => {
    render(
      <table>
        <TableBody />
      </table>
    )
  })

  it('should render with base styles', () => {
    const expected =
      'bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
    const { container } = render(
      <table>
        <TableBody />
      </table>
    )

    expect(container.querySelector('tbody')?.getAttribute('class')).toContain(expected)
  })
})
