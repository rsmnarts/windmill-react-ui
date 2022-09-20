import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Pagination, { EmptyPageButton, NavigationButton, PageButton } from '../Pagination'

describe('NavigationButton', () => {
  it('should render without crashing', () => {
    const onClick = () => { }
    render(<NavigationButton directionIcon="prev" onClick={onClick} />)
  })

  it('should contain "Previous" aria-label based on directionIcon', () => {
    const onClick = () => { }
    const expected = 'Previous'
    render(<NavigationButton directionIcon="prev" onClick={onClick} />)

    expect(screen.getByRole('button').getAttribute('aria-label')).toContain(expected)
  })

  it('should contain "Next" aria-label based on directionIcon', () => {
    const onClick = () => { }
    const expected = 'Next'
    render(<NavigationButton directionIcon="next" onClick={onClick} />)

    expect(screen.getByRole('button').getAttribute('aria-label')).toContain(expected)
  })

  it('should contain a child SVG', () => {
    const onClick = () => { }
    const expectedSvg = 'h-3 w-3'
    const { container } = render(<NavigationButton directionIcon="prev" onClick={onClick} />)

    expect(container.querySelector('svg')).toBeDefined()
    expect(container.querySelector('svg')?.getAttribute('class')).toContain(expectedSvg)
  })

  it('should call onClick', () => {
    const onClick = jest.fn()
    render(<NavigationButton directionIcon="next" onClick={onClick} />)

    const user = userEvent.setup()
    user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalled
  })
})

describe('PageButton', () => {
  it('should render without crashing', () => {
    const onClick = () => { }
    render(<PageButton page={1} onClick={onClick} />)
  })

  it('should render the right page', () => {
    const onClick = () => { }
    render(<PageButton isActive page={1} onClick={onClick} />)

    expect(screen.getByRole('page-button').textContent).toBe('1')
  })

  it('should contain text-xs', () => {
    const onClick = () => { }
    const expected = 'text-xs'
    render(<PageButton isActive page={1} onClick={onClick} />)

    expect(screen.getByRole('page-button').getAttribute('class')).toContain(expected)
  })

  it('should call onClick', () => {
    const onClick = jest.fn()
    render(<PageButton page={1} onClick={onClick} />)
    const user = userEvent.setup()
    user.click(screen.getByRole('page-button'))

    expect(onClick).toHaveBeenCalled
  })

  describe('EmptyPageButton', () => {
    it('should render without crashing', () => {
      render(<EmptyPageButton />)
    })

    it('should render three dots as children', () => {
      const expected = '...'
      const { container } = render(<EmptyPageButton />)

      expect(container.querySelector('span')?.textContent).toContain(expected)
    })
  })

  describe('Pagination', () => {
    it('should render without crashing', () => {
      const onChange = () => { }
      render(<Pagination totalResults={123} label="Navigation" onChange={onChange} />)
    })

    it('should render with base styles', () => {
      const onChange = () => { }
      const expected =
        'flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400'
      render(<Pagination totalResults={123} label="Navigation" onChange={onChange} />)

      expect(screen.getByRole('pagination').getAttribute('class')).toContain(expected)
    })

    it('should render next and previous buttons', () => {
      const onChange = () => { }
      render(<Pagination totalResults={123} label="Navigation" onChange={onChange} />)

      expect(screen.getByLabelText('Previous')).toBeTruthy()
      expect(screen.getByLabelText('Next')).toBeTruthy()
    })

    it('should render a list with exact children', () => {
      const onChange = () => { }
      render(<Pagination totalResults={50} label="Navigation" onChange={onChange} />)

      expect(screen.getByRole('list').childNodes).toHaveLength(7)
    })

    it('should never render a list with more than 9 children', () => {
      const onChange = () => { }
      // accounts for 2 nav buttons
      render(<Pagination totalResults={120} label="Navigation" onChange={onChange} />)

      expect(screen.getByRole('list').childNodes).toHaveLength(9)
    })

    it('should render a list taking into account resultsPerPage', () => {
      const onChange = () => { }
      const { container } = render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      expect(container.querySelectorAll('button')).toHaveLength(8)
    })

    it('should call click handler on next button', async () => {
      const onChange = jest.fn()
      const { getByLabelText } = render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      await user.click(getByLabelText('Next'))

      // one on render and another on click
      expect(onChange).toHaveBeenCalledTimes(2)
    })

    it('should call click handler on prev button', async () => {
      const onChange = jest.fn()
      const { getByLabelText } = render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      // go forward one page to activate prev button
      await user.click(getByLabelText('Next'))

      // click the active prev button
      await user.click(getByLabelText('Previous'))

      // one on render, one on next and another on prev
      expect(onChange).toHaveBeenCalledTimes(3)
    })

    it('should not call click handler on prev button if first page', async () => {
      const onChange = jest.fn()
      render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      await user.click(screen.getByLabelText('Previous'))

      // one on render
      expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('should not call click handler on next button if last page', async () => {
      const onChange = jest.fn()
      render(
        <Pagination totalResults={10} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      const nextButton = screen.getByLabelText('Next')
      await user.click(nextButton)
      await user.click(nextButton)

      // one on render and one of the above clicks are ignored
      expect(onChange).toHaveBeenCalledTimes(2)
    })

    it('should call click handler on prev button', async () => {
      const onChange = jest.fn()
      render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      // go forward one page to activate prev button
      await user.click(screen.getByLabelText('Next'))

      // click the active prev button
      await user.click(screen.getByLabelText('Previous'))

      // one on render, one on next and another on prev
      expect(onChange).toHaveBeenCalledTimes(3)
    })

    it('should render two "..." in the middle of a big list', async () => {
      const onChange = () => { }
      const { container } = render(
        <Pagination totalResults={50} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      const nextButton = screen.getByLabelText('Next')
      // go to page 5
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)

      expect(container.querySelectorAll('span[class="px-2 py-1"]')).toHaveLength(2)
    })

    it('should render the last 5 items', async () => {
      const onChange = () => { }
      const { container } = render(
        <Pagination totalResults={50} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      const nextButton = screen.getByLabelText('Next')
      // go to page 7
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)
      await user.click(nextButton)

      const pageButtons = screen.getAllByRole('page-button')

      // not considering '...' see last line test
      const pagesArray = ['1', '6', '7', '8', '9', '10']
      pageButtons.forEach((b, i) => {
        expect(b.textContent).toBe(pagesArray[i])
      })

      expect(container.querySelectorAll('span[class="px-2 py-1"]')).toHaveLength(1)
    })

    it('should call click handler on page button', async () => {
      const onChange = jest.fn()
      render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      const user = userEvent.setup()
      const thirdPage = screen.getAllByRole('page-button').at(2)
      // go forward one page to activate prev button
      await user.click(thirdPage!)

      expect(onChange).toHaveBeenCalledWith(3)
    })

    it('should update the pages total when totalResults is updated', () => {
      const onChange = () => { }
      const expectedBeforeUpdate = 6
      const expectedAfterUpdate = 4

      const { rerender } = render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      expect(screen.getAllByRole('page-button')).toHaveLength(expectedBeforeUpdate)

      rerender(<Pagination totalResults={20} resultsPerPage={5} label="Navigation" onChange={onChange} />)
      expect(screen.getAllByRole('page-button')).toHaveLength(expectedAfterUpdate)
    })

    it('should update the pages total when resultsPerPage is updated', () => {
      const onChange = () => { }
      const expectedBeforeUpdate = 6
      const expectedAfterUpdate = 3

      const { rerender } = render(
        <Pagination totalResults={30} resultsPerPage={5} label="Navigation" onChange={onChange} />
      )

      expect(screen.getAllByRole('page-button')).toHaveLength(expectedBeforeUpdate)

      rerender(<Pagination totalResults={30} resultsPerPage={10} label="Navigation" onChange={onChange} />)
      expect(screen.getAllByRole('page-button')).toHaveLength(expectedAfterUpdate)
    })
  })
})
