import { render, screen } from '@testing-library/react'
import React from 'react'
import Dropdown from '../Dropdown'

describe('Dropdown', () => {
  it('should render without crashing', () => {
    const onClose = jest.fn()
    render(<Dropdown isOpen={true} onClose={onClose} />)
  })

  it('should render with base styles', () => {
    const onClose = jest.fn()
    const expected =
      'absolute w-56 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 left-0'
    render(<Dropdown isOpen={true} onClose={onClose} />)

    expect(screen.getByRole('list').getAttribute('class')).toContain(expected)
  })

  it('should render aligned to the default position', () => {
    const onClose = jest.fn()
    const expected = 'left-0'
    render(<Dropdown isOpen={true} onClose={onClose} />)

    expect(screen.getByRole('list').getAttribute('class')).toContain(expected)
  })

  it('should render aligned to the left', () => {
    const onClose = jest.fn()
    const expected = 'left-0'
    render(<Dropdown align="left" isOpen={true} onClose={onClose} />)

    expect(screen.getByRole('list').getAttribute('class')).toContain(expected)
  })

  it('should render aligned to the right', () => {
    const onClose = jest.fn()
    const expected = 'right-0'
    render(<Dropdown align="right" isOpen={true} onClose={onClose} />)

    expect(screen.getByRole('list').getAttribute('class')).toContain(expected)
  })

  it('should call onClose when Esc is pressed', () => {
    const map = {} as ListenerMap
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    const onClose = jest.fn()
    render(<Dropdown isOpen={true} onClose={onClose} />)

    map.keydown({ key: 'Esc' })

    expect(onClose).toHaveBeenCalled()
  })

  it('should close dropdown when clicking outside it', () => {
    const map = {} as ListenerMap
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    const onClose = jest.fn()
    render(<Dropdown isOpen={true} onClose={onClose} />)

    map.click({ target: document.body })

    expect(onClose).toHaveBeenCalled()
  })

  it('should not close dropdown when clicking inside it', () => {
    const map = {} as ListenerMap
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    const onClose = jest.fn()
    render(<Dropdown isOpen={true} onClose={onClose} />)

    map.click({ target: screen.getByRole('list') })

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should not call onClose when other key than Esc is pressed', () => {
    const map = {} as ListenerMap
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    const onClose = jest.fn()
    render(<Dropdown isOpen={true} onClose={onClose} />)

    map.keydown({ key: 'Enter' })

    expect(onClose).not.toHaveBeenCalled()
  })

  it('should remove the event listener on unmount', () => {
    const map = {} as ListenerMap
    const removeListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    document.removeEventListener = removeListener
    const onClose = jest.fn()
    const { unmount } = render(<Dropdown isOpen={true} onClose={onClose} />)

    unmount()

    expect(removeListener).toHaveBeenCalled()
  })
})
