import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Modal from '../Modal'

describe('Modal', () => {
  it('should render without crashing', () => {
    const onClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        Lorem ipsum
      </Modal>
    )
  })

  it('should render with base styles', () => {
    const onClose = jest.fn()
    const expected =
      'w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl'
    render(
      <Modal isOpen={true} onClose={onClose}>
        Lorem ipsum
      </Modal>
    )

    expect(screen.getByRole('dialog').getAttribute('class')).toContain(expected)
  })

  it('should call onClose when Esc is pressed', () => {
    const map = {} as ListenerMap
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    const onClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        Lorem ipsum
      </Modal>
    )

    map.keydown({ key: 'Esc' })

    expect(onClose).toHaveBeenCalled()
  })

  it('should not call onClose when other key than Esc is pressed', () => {
    const map = {} as ListenerMap
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    const onClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        Lorem ipsum
      </Modal>
    )

    map.keydown({ key: 'Enter' })

    expect(onClose).not.toHaveBeenCalled
  })

  it('should remove the event listener on unmount', () => {
    const map = {} as ListenerMap
    const removeListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    document.removeEventListener = removeListener
    const onClose = jest.fn()
    const { unmount } = render(
      <Modal isOpen={true} onClose={onClose}>
        Lorem ipsum
      </Modal>
    )

    unmount()

    expect(removeListener).toHaveBeenCalled()
  })

  it('should not close modal when clicking inside it', () => {
    const map = {} as ListenerMap
    document.addEventListener = jest.fn((e, cb) => {
      map[e] = cb
    })
    const onClose = jest.fn()
    render(
      <Modal isOpen={true} onClose={onClose}>
        Lorem ipsum
      </Modal>
    )
    const user = userEvent.setup()
    user.click(screen.getByRole('dialog'))

    expect(onClose).not.toHaveBeenCalled()
  })
})
