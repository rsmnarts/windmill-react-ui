import classNames from 'classnames'
import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> { }

const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(function Backdrop(props, ref) {
  const { className, ...other } = props
  const {
    theme: { backdrop },
  } = useContext(ThemeContext)

  const baseStyle = backdrop.base

  const cls = classNames(baseStyle, className)
  return <div data-testid='backdrop' className={cls} ref={ref} {...other}></div>
})

export default Backdrop
