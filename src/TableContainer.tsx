import classNames from 'classnames'
import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const TableContainer = React.forwardRef<HTMLDivElement, Props>(function TableContainer(props, ref) {
  const { className, children, ...other } = props

  const {
    theme: { tableContainer },
  } = useContext(ThemeContext)

  const baseStyle = tableContainer.base

  const cls = classNames(baseStyle, className)

  return (
    <div role='table-container' className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})

export default TableContainer
