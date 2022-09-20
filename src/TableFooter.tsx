import classNames from 'classnames'
import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const TableFooter = React.forwardRef<HTMLDivElement, Props>(function TableFooter(props, ref) {
  const { className, children, ...other } = props

  const {
    theme: { tableFooter },
  } = useContext(ThemeContext)

  const baseStyle = tableFooter.base

  const cls = classNames(baseStyle, className)

  return (
    <div role='table-footer' className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})

export default TableFooter
