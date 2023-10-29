import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from './index';
import { useSelector } from 'react-redux';


jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));


jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  };
});

jest.mock('axios');

describe('Cart Component', () => {
  
  beforeEach(() => {
    useSelector.mockReset();
  });

  it('renders a message when the cart is empty', () => {
    
    useSelector.mockReturnValue({
      store: { cart: { cart: [] }, user: { status: true } },
      products: { data: [] },
    });

    render(<Cart />);
    
    const emptyCartMessage = screen.getByText('Your cart is empty');
    expect(emptyCartMessage).toBeInTheDocument();
  });

  
});

