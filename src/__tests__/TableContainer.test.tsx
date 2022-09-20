import { render, screen } from '@testing-library/react'
import React from 'react'
import TableContainer from '../TableContainer'
import theme from '../themes/default'

describe('TableContainer', () => {
  it('should render without crashing', () => {
    render(<TableContainer />)
  })

  it('should render with base styles', () => {
    const expected = theme.tableContainer.base
    render(<TableContainer />)

    expect(screen.getByRole('table-container').getAttribute('class')).toContain(expected)
  })
})
