import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Button from '../Button'
import theme from '../themes/default'
import HeartIcon from './utils/heart.svg'

describe('Base Button', () => {
  it('should render without crashing', () => {
    render(<Button aria-label="test" />)
  })

  it('should render a button element', () => {
    render(<Button aria-label="test" />)

    expect(screen.getByRole('button')).toBeVisible
  })

  it('should render a button with type button', () => {
    render(<Button aria-label="test" />)

    expect(screen.getByRole('button').getAttribute('type')).toBe('button')
  })

  it('should render a button with type submit', () => {
    render(<Button aria-label="test" type="submit" />)

    expect(screen.getByRole('button').getAttribute('type')).toBe('submit')
  })

  it('should render a button with type reset', () => {
    render(<Button aria-label="test" type="reset" />)

    expect(screen.getByRole('button').getAttribute('type')).toBe('reset')
  })

  it('should render an anchor element', () => {
    const { container } = render(<Button aria-label="test" tag="a" />)

    expect(container.querySelector('a')).toBeVisible
  })

  it('should not contain type for anchor element', () => {
    render(<Button aria-label="test" tag="a" />)

    expect(screen.getByRole('button').getAttribute('type')).toBeNull
  })

  it('should render an arbitrary element', () => {
    const { container } = render(<Button aria-label="test" tag="div" />)

    expect(container.querySelector('div')).toBeVisible
  })

  it('should render its children', () => {
    render(<Button>Hi</Button>)

    expect(screen.getByText('Hi')).toBeVisible
  })

  it('should contain base classes', () => {
    const expected =
      'inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none'
    render(<Button aria-label="test" />)

    expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
  })

  it('should call onClick callback', (done) => {
    const user = userEvent.setup()
    render(<Button aria-label="test" onClick={() => done()} />)

    user.click(screen.getByRole('button'))
  })

  it('should contain the appropriate type', () => {
    const expected = 'submit'
    render(<Button aria-label="test" type="submit" />)

    expect(screen.getByRole('button').getAttribute('type')).toBe(expected)
  })

  it('should render a full width button', () => {
    const expected = 'w-full'
    render(<Button aria-label="test" block />)

    expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
  })

  it('should render a regular button', () => {
    const expected = 'px-4 py-2 rounded-lg text-sm'
    render(<Button aria-label="test" />)

    expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
  })

  it('should extend classes', () => {
    const expected = 'ml-2'
    render(<Button aria-label="test" className="ml-2" />)

    expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
  })

  describe('Sizes', () => {
    it('should render a larger button', () => {
      const expected = 'px-10 py-4 rounded-lg'
      render(<Button aria-label="test" size="larger" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should render a large button', () => {
      const expected = 'px-5 py-3 rounded-lg'
      render(<Button aria-label="test" size="large" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    // the default case is tested in the Base Button suite
    it('should render a regular button', () => {
      const expected = 'px-4 py-2 rounded-lg text-sm'
      render(<Button aria-label="test" size="regular" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should render a small button', () => {
      const expected = 'px-3 py-1 rounded-md text-sm'
      render(<Button aria-label="test" size="small" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })
  })

  describe('Primary Button', () => {
    it('should contain primary base classes', () => {
      const expected = 'text-white bg-purple-600 border border-transparent'
      render(<Button aria-label="test" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should contain primary active classes', () => {
      const expected = theme.button.primary.active
      render(<Button aria-label="test" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should contain primary disabled classes', () => {
      const expected = 'opacity-50 cursor-not-allowed'
      render(<Button aria-label="test" disabled />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should not contain primary active classes when disabled', () => {
      const expected = 'active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple'
      render(<Button aria-label="test" disabled />)

      expect(screen.getByRole('button').getAttribute('disabled')).toBeTruthy
      expect(screen.getByRole('button').getAttribute('class')).not.toContain(expected)
    })
  })

  describe('Outline Button', () => {
    it('should contain outline base classes', () => {
      const expected = 'text-gray-600 border-gray-300 border dark:text-gray-400 focus:outline-none'
      render(<Button aria-label="test" layout="outline" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should contain outline active classes', () => {
      const expected = theme.button.outline.active
      render(<Button aria-label="test" layout="outline" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should contain outline disabled classes', () => {
      const expected = 'opacity-50 cursor-not-allowed bg-gray-300'
      render(<Button aria-label="test" layout="outline" disabled />)

      expect(screen.getByRole('button').getAttribute('disabled')).toBeTruthy
      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })
  })

  describe('Link Button', () => {
    it('should contain link base classes', () => {
      const expected = 'text-gray-600 dark:text-gray-400 focus:outline-none'
      render(<Button aria-label="test" layout="link" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should contain link active classes', () => {
      const expected = theme.button.link.active
      render(<Button aria-label="test" layout="link" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should contain link disabled classes', () => {
      const expected = 'opacity-50 cursor-not-allowed'
      render(<Button aria-label="test" layout="link" disabled />)

      expect(screen.getByRole('button').getAttribute('disabled')).toBeTruthy
      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })
  })

  describe('DropdownItem Button', () => {
    it('should contain DropdowItem button classes', () => {
      const expected =
        'inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200'
      render(<Button aria-label="test" layout="__dropdownItem" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })
  })

  describe('Pagination Button', () => {
    it('should contain PageButton classes', () => {
      const expected = 'px-3 py-1 rounded-md text-xs'
      render(<Button aria-label="test" size="pagination" />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })
  })

  describe('Icon', () => {
    it('should contain an svg as a children', () => {
      const { container } = render(
        <Button aria-label="test">
          <HeartIcon />
        </Button>
      )

      expect(container.querySelector('svg')).toBeDefined()
    })

    it('should contain an svg passed as prop', () => {
      const { container } = render(<Button icon={HeartIcon}>Test</Button>)

      expect(container.querySelector('svg')).toBeDefined()
    })

    it('should render an icon as the first child of the button, using icon', () => {
      const { container } = render(<Button icon={HeartIcon}>Lorem</Button>)
      const btn = screen.getByRole('button')

      expect(btn.childNodes).toHaveLength(2)
      expect(btn.firstChild?.nodeName).toBe('svg')
      expect(btn?.lastChild?.textContent).toBe('Lorem')
    })

    it('should render an icon as the first child of the button, using iconLeft', () => {
      render(<Button iconLeft={HeartIcon}>Lorem</Button>)
      const btn = screen.getByRole('button')

      expect(btn.childNodes).toHaveLength(2)
      expect(btn.firstChild?.nodeName).toBe('svg')
      expect(btn?.lastChild?.textContent).toBe('Lorem')
    })

    it('should render an icon as the last child of the button', () => {
      render(<Button iconRight={HeartIcon}>Lorem</Button>)
      const btn = screen.getByRole('button')

      expect(btn.childNodes).toHaveLength(2)
      expect(btn?.lastChild?.nodeName).toBe('svg')
      expect(btn.firstChild?.textContent).toBe('Lorem')
    })

    it('should not contain left or right styles', () => {
      const expected = 'mr-2 -ml-1 ml-2 -mr-1'
      const { container } = render(<Button aria-label="test" icon={HeartIcon} />)

      expect(container.querySelector('svg')?.getAttribute('class')).not.toContain(expected)
    })

    it('should render an icon with left styles', () => {
      const expected = 'mr-2 -ml-1'
      const { container } = render(<Button iconLeft={HeartIcon}>Lorem</Button>)

      expect(container.querySelector('svg')?.getAttribute('class')).toContain(expected)
    })

    it('should render an icon with right styles', () => {
      const expected = 'ml-2 -mr-1'
      const { container } = render(<Button iconRight={HeartIcon}>Lorem</Button>)

      expect(container.querySelector('svg')?.getAttribute('class')).toContain(expected)
    })

    it('should render a button with regular styles if children is present', () => {
      const expected = 'px-4 py-2 rounded-lg text-sm'
      render(<Button iconLeft={HeartIcon}>Lorem</Button>)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expected)
    })

    it('should contain regular sized button icon classes', () => {
      const expectedButton = 'p-2 rounded-lg'
      const expectedSvg = 'h-5 w-5'
      const { container } = render(<Button aria-label="test" icon={HeartIcon} />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expectedButton)
      expect(container.querySelector('svg')?.getAttribute('class')).toContain(expectedSvg)
    })

    it('should contain small sized button icon classes', () => {
      const expectedButton = 'p-2 rounded-md'
      const expectedSvg = 'h-3 w-3'
      const { container } = render(<Button aria-label="test" size="small" icon={HeartIcon} />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expectedButton)
      expect(container.querySelector('svg')?.getAttribute('class')).toContain(expectedSvg)
    })

    it('should contain large sized button icon classes', () => {
      const expectedButton = 'p-3 rounded-lg'
      const expectedSvg = 'h-5 w-5'
      const { container } = render(<Button aria-label="test" size="large" icon={HeartIcon} />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expectedButton)
      expect(container.querySelector('svg')?.getAttribute('class')).toContain(expectedSvg)
    })

    it('should contain larger sized button icon classes', () => {
      const expectedButton = 'p-4 rounded-lg'
      const expectedSvg = 'h-5 w-5'
      const { container } = render(<Button aria-label="test" size="larger" icon={HeartIcon} />)

      expect(screen.getByRole('button').getAttribute('class')).toContain(expectedButton)
      expect(container.querySelector('svg')?.getAttribute('class')).toContain(expectedSvg)
    })
  })
})
