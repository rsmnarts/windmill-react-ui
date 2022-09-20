import { render, screen } from '@testing-library/react'
import React from 'react'
import TableRow from '../TableRow'

describe('TableRow', () => {
  it('should render without crashing', () => {
    render(
      <table>
        <tbody>
          <TableRow />
        </tbody>
      </table>
    )
  })

  it('should not have base styles', () => {
    render(
      <table>
        <tbody>
          <TableRow />
        </tbody>
      </table>
    )

    expect(screen.getByRole('row').getAttribute('class')).toBeNull
  })
})
