import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainImages from './index'

/* eslint-env jest */

describe('MainImages', () => {
  it('renders text and button', () => {
    const { getByText, getByRole } = render(
      <Router>
        <MainImages />
      </Router>,
    )

    expect(
      getByText(/Luxury homeware for people[\s\S]*timeless design quality/),
    ).toBeInTheDocument()
    expect(
      getByText(
        'With our new collection, view over 400 bespoke pieces from homeware through to furniture today',
      ),
    ).toBeInTheDocument()
    expect(
      getByText('Shop the new Spring 2022 collection today'),
    ).toBeInTheDocument()
    expect(getByRole('button', { name: 'View collection' })).toBeInTheDocument()
  })

  it('renders image', () => {
    const { getByAltText } = render(
      <Router>
        <MainImages />
      </Router>,
    )

    expect(getByAltText('Main')).toBeInTheDocument()
  })

  it('has correct alt text for image', () => {
    const { getByAltText } = render(
      <Router>
        <MainImages />
      </Router>,
    )

    const img = getByAltText('Main')
    expect(img).toHaveAttribute('alt', 'Main')
  })

  it('has correct link', () => {
    const { getByRole } = render(
      <Router>
        <MainImages />
      </Router>,
    )

    const link = getByRole('link', { name: 'View collection' })
    expect(link).toHaveAttribute('href', '/allProducts/')
  })
})
