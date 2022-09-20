import { render } from '@testing-library/react'
import React from 'react'
import ModalHeader from '../ModalHeader'

describe('ModalHeader', () => {
  it('should render without crashing', () => {
    render(<ModalHeader>Lorem ipsum</ModalHeader>)
  })

  it('should render with base styles', () => {
    const expected = 'mt-4 mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300'
    const { container } = render(<ModalHeader>Lorem ipsum</ModalHeader>)

    expect(container.querySelector('p')?.getAttribute('class')).toContain(expected)
  })
})
