import React from 'react';
import {render, screen} from '@testing-library/react';
import OrderForm from './index';
import {MemoryRouter} from "react-router-dom";
import axios from "axios";
import {HOST} from "../Token";

jest.mock('axios');

jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

const getCart = async () => {
    const response = await axios.get(HOST + '/cart');
    return response.data;
};

describe('OrderForm', () => {
    const mockChangeOrderPlaced = jest.fn();
    const mockOrderPlaced = {
        status: false,
        massage: 'The order has not been processed. Check that the entered data is correct and that you are logged in',
    };
    const cartMock = {
        customerId: {
            _id: '1234567890abcdef',
        },
        products: [
            {
                _id: '9876543210fedcba',
                name: 'Product 1',
                price: 100,
                quantity: 1,
            },
            {
                _id: 'fedcba9876543210',
                name: 'Product 2',
                price: 200,
                quantity: 2,
            },
        ],
    };


    it('should render the form correctly', () => {
        render(
            <MemoryRouter>
                <OrderForm changeOrderPlaced={mockChangeOrderPlaced} orderPlaced={mockOrderPlaced} />
            </MemoryRouter>
        );

        expect(screen.getByText('Fill the required fields to order')).toBeInTheDocument();
        expect(screen.getByText('Send')).toBeInTheDocument();
    });

    it('getCart should fetch the cart from the API', async () => {
        // Mock the axios response.
        axios.get.mockResolvedValue({
            data: cartMock
        });

        // Call the getCart function.
        const cart = await getCart();

        // Expect the axios get method to have been called with the correct URL.
        expect(axios.get).toHaveBeenCalledWith(HOST + '/cart');

        // Expect the getCart function to return the expected cart object.
        expect(cart).toEqual(cartMock);
    });
});