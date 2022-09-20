import { render, screen } from '@testing-library/react'
import React from 'react'
import ModalBody from '../ModalBody'

describe('ModalBody', () => {
  it('should render without crashing', () => {
    render(<ModalBody>Lorem ipsum</ModalBody>)
  })

  it('should render with base styles', () => {
    const expected = 'mb-6 text-sm text-gray-700 dark:text-gray-400'
    const { container } = render(<ModalBody>Lorem ipsum</ModalBody>)

    expect(container.querySelector('div')?.getAttribute('class')).toContain(expected)
  })

  it('should render children', () => {
    render(
      <ModalBody>
        <p>Lorem</p>
        <p>Ipsum</p>
      </ModalBody>
    )

    expect(screen.getByRole('modal-body').childNodes).toHaveLength(2)
  })
})
