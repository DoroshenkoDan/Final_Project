import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import SignInForm from './index.js'
import axios from 'axios'

jest.mock('axios')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))
describe('testing SignInForm component', () => {
  const dispatchMock = jest.fn()
  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock)
    useSelector.mockImplementation((selector) =>
      selector({
        store: {
          user: {
            status: false,
          },
        },
        categories: {
          categories: [
            {
              id: 1,
              name: 'Category 1',
            },
            {
              id: 2,
              name: 'Category 2',
            },
          ],
        },
      }),
    )
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('renders the component', () => {
    render(<SignInForm />)
  })
  it('renders the form elements', () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />)
    expect(getByPlaceholderText('login or email')).toBeInTheDocument()
    expect(getByPlaceholderText('password')).toBeInTheDocument()
    expect(getByText('Send')).toBeInTheDocument()
  })
  it('submits the form and displays success message on successful login', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />)

    axios.post.mockResolvedValue({
      data: { token: 'example_token' },
    })

    fireEvent.change(getByPlaceholderText('login or email'), {
      target: { value: 'testuser@example.com' },
    })
    fireEvent.change(getByPlaceholderText('password'), {
      target: { value: 'testPassword123' },
    })

    fireEvent.click(getByText('Send'))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/customers/login',
        {
          loginOrEmail: 'testuser@example.com',
          password: 'testPassword123',
        },
      )
      expect(getByText('Welcome to Avion')).toBeInTheDocument()
    })
  })
  it('displays error message on failed login', async () => {
    const { getByPlaceholderText, getByText } = render(<SignInForm />)

    axios.post.mockRejectedValue({
      response: { data: { error: 'Invalid credentials' } },
    })

    fireEvent.change(getByPlaceholderText('login or email'), {
      target: { value: 'testuser@example.com' },
    })
    fireEvent.change(getByPlaceholderText('password'), {
      target: { value: 'wrongPassword' },
    })

    fireEvent.click(getByText('Send'))

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:4000/api/customers/login',
        {
          loginOrEmail: 'testuser@example.com',
          password: 'wrongPassword',
        },
      )
      expect(getByText('Login failed! Invalid credentials')).toBeInTheDocument()
    })
  })
})
