import { render, screen } from '@testing-library/react'
import React from 'react'
import ModalFooter from '../ModalFooter'

describe('ModalFooter', () => {
  it('should render without crashing', () => {
    render(<ModalFooter>Lorem ipsum</ModalFooter>)
  })

  it('should render with base styles', () => {
    const expected =
      'flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800'
    render(<ModalFooter>Lorem ipsum</ModalFooter>)

    expect(screen.getByRole('modal-footer').getAttribute('class')).toContain(expected)
  })

  it('should render children', () => {
    render(
      <ModalFooter>
        <p>Lorem</p>
        <p>Ipsum</p>
      </ModalFooter>
    )

    expect(screen.getByRole('modal-footer').childNodes).toHaveLength(2)
  })
})
