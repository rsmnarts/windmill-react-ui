import classNames from 'classnames'
import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const CardBody = React.forwardRef<HTMLDivElement, Props>(function CardBody(props, ref) {
  const { className, children, ...other } = props
  const {
    theme: { cardBody },
  } = useContext(ThemeContext)

  const baseStyle = cardBody.base

  const cls = classNames(baseStyle, className)

  return (
    <div role='card-body' className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})

export default CardBody
