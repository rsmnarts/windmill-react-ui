import classNames from 'classnames'
import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const ModalFooter = React.forwardRef<HTMLElement, Props>(function ModalFooter(props, ref) {
  const { children, className, ...other } = props
  const {
    theme: { modalFooter },
  } = useContext(ThemeContext)

  const baseStyle = modalFooter.base

  const cls = classNames(baseStyle, className)

  return (
    <footer role='modal-footer' className={cls} ref={ref} {...other}>
      {children}
    </footer>
  )
})

export default ModalFooter
