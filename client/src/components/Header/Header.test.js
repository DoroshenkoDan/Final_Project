import React from 'react';
import {render} from '@testing-library/react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './index.js';
import {MemoryRouter} from 'react-router-dom';
import {fireEvent} from '@testing-library/react';

jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(), useSelector: jest.fn()
}));
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
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('renders the component', () => {
        render(<MemoryRouter>
                <Header/>
            </MemoryRouter>
        );
    })
    test('Toggle menu visibility on menu icon click', () => {
        const {getByTestId} = render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>);
        const menuIcon = getByTestId('menu-icon');

        fireEvent.click(menuIcon);
        expect(getByTestId('menu-hidden')).not.toBeInTheDocument();

        fireEvent.click(menuIcon);
        expect(getByTestId('menu-hidden')).toBeInTheDocument();
    });
});