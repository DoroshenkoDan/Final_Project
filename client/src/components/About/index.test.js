import React from 'react'
import { render } from '@testing-library/react'
import About from './index'

test('renders the About component', () => {
  const { getByText } = render(<About />)

  const headerElement = getByText(
    'A brand built on the love of craftmanship, quality and outstanding customer service',
  )
  expect(headerElement).toBeInTheDocument()
})
