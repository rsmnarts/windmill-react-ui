import classNames from 'classnames'
import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const ModalBody = React.forwardRef<HTMLDivElement, Props>(function ModalBody(props, ref) {
  const { children, className, ...other } = props
  const {
    theme: { modalBody },
  } = useContext(ThemeContext)

  const baseStyle = modalBody.base

  const cls = classNames(baseStyle, className)

  return (
    <div role='modal-body' className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})

export default ModalBody
