import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Footer } from './Footer'

describe('Footer component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )
  })

  it('displays company address', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(getByText('Avion')).toBeInTheDocument()
    expect(getByText('21 New York Street')).toBeInTheDocument()
    expect(getByText('New York City')).toBeInTheDocument()
    expect(getByText('United States of America')).toBeInTheDocument()
    expect(getByText('432 34')).toBeInTheDocument()
  })

  it('contains social links', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(getByAltText('Linkedin')).toBeInTheDocument()
    expect(getByAltText('Facebook')).toBeInTheDocument()
    expect(getByAltText('Instagram')).toBeInTheDocument()
    expect(getByAltText('Skype')).toBeInTheDocument()
    expect(getByAltText('Twitter')).toBeInTheDocument()
    expect(getByAltText('Pinterest')).toBeInTheDocument()
  })

  it('contains menu links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(getByText('Menu')).toBeInTheDocument()
    expect(getByText('All products')).toBeInTheDocument()
    expect(getByText('New arrivals')).toBeInTheDocument()
    expect(getByText('Best sellers')).toBeInTheDocument()
    expect(getByText('Recently viewed')).toBeInTheDocument()
    expect(getByText('Popular this week')).toBeInTheDocument()
    expect(getByText('Somethings')).toBeInTheDocument()
  })

  it('contains categories links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(getByText('Categories')).toBeInTheDocument()
    expect(getByText('Cutlery')).toBeInTheDocument()
    expect(getByText('Nightstands')).toBeInTheDocument()
    expect(getByText('Crockery')).toBeInTheDocument()
    expect(getByText('Chairs')).toBeInTheDocument()
    expect(getByText('Tables')).toBeInTheDocument()
    expect(getByText('Ceramisc')).toBeInTheDocument()
  })

  it('contains company links', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    )

    expect(getByText('Our company')).toBeInTheDocument()
    expect(getByText('About us')).toBeInTheDocument()
    expect(getByText('Privacy page')).toBeInTheDocument()
    expect(getByText('Vacancies')).toBeInTheDocument()
    expect(getByText('Contact us')).toBeInTheDocument()
    expect(getByText('Returns policy')).toBeInTheDocument()
    expect(getByText('News')).toBeInTheDocument()
  })
})
