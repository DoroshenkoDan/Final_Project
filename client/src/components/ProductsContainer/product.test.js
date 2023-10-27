import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductsContainer from './index.js';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));


test('testing NavContainer component', () => {
    const dispatchMock = jest.fn();

    const state = {
        products: {
            data: [

            ],
        },
    };

    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selector) => selector(state));

    render(<ProductsContainer id={123} />);
    describe('testing NavContainer component', () => {
        const dispatchMock = jest.fn();

        beforeEach(() => {
            useDispatch.mockReturnValue(dispatchMock);
            useSelector.mockImplementation((selector) => selector({
                store: {
                    user: {
                        status: false
                    }
                },
                categories: {
                    categories: [
                        {
                            id: 1,
                            name: 'Category 1'
                        },
                        {
                            id: 2,
                            name: 'Category 2'
                        }
                    ]
                }
            }))
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('ProductsContainer', () => {
            const mockProducts = [
                {
                    "name": "Ceramic Coffee Table",
                    "enabled": true,
                    "id": "cer54322",
                    "imageUrls": "/img/ceramics/ceramicCoffeTable.jpg",
                    "quantity": 100,
                    "currentPrice": 240,
                    "previousPrice": 240,
                    "categories": "Ceramics",
                    "brand": "Ceramico",
                    "height": "40cm",
                    "width": "80cm",
                    "depth": "60cm",
                    "description": "A stylish ceramic coffee table that enhances your living room decor. This ceramic coffee table is perfect for serving coffee or displaying decorative items."
                },
            ];

            it('renders without crashing', () => {
                render(<ProductsContainer />);
            });

            it('displays product items', () => {
                render(<ProductsContainer />);
            });

            it('displays a "View collection" button', () => {
                render(<ProductsContainer />);
                const viewCollectionButton = screen.getByText('View collection');
                expect(viewCollectionButton).toBeInTheDocument();
            });

            it('handles clicks on product items', () => {
                render(<ProductsContainer />);
                const productItem = screen.getByText('Product Name');
                userEvent.click(productItem);

                expect(window.location.pathname).toBe('/products/your-product-id');
            });

            it('displays "You might also like" when an "id" prop is provided', () => {
                render(<ProductsContainer id="your-product-id" />);
                const youMightAlsoLikeText = screen.getByText('You might also like');
                expect(youMightAlsoLikeText).toBeInTheDocument();
            });

            it('displays a specific number of product items when "id" prop is provided', () => {
                render(<ProductsContainer id="your-product-id" />);

                const productItems = screen.getAllByTestId('product-item');
                expect(productItems).toHaveLength(4);
            });


        });
    });

});

