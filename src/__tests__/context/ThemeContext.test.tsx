import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useContext } from 'react'
import { ThemeContext, ThemeProvider } from '../../context/ThemeContext'

function TestButton() {
  const { toggleMode } = useContext(ThemeContext)

  return <button onClick={() => toggleMode()}>Click</button>
}

describe('ThemeProvider', () => {
  it('should show value from provider', () => {
    const expected = 'Lorem'
    const { container } = render(
      <ThemeProvider value={{ theme: 'Lorem' }}>
        <ThemeContext.Consumer>{(value) => <span>{value.theme}</span>}</ThemeContext.Consumer>
      </ThemeProvider>
    )

    expect(container.querySelector('span')?.textContent).toContain(expected)
  })

  it('should execute the toggleMode method', () => {
    const toggleMode = jest.fn()
    const theme = { test: 'test' }
    render(
      <ThemeContext.Provider value={{ toggleMode, theme }}>
        <TestButton />
      </ThemeContext.Provider>
    )

    const user = userEvent.setup()
    user.click(screen.getByRole('button'))

    expect(toggleMode).toHaveBeenCalled
  })
})
