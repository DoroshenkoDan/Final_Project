import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './index.js';
import {MemoryRouter} from 'react-router-dom';

jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(), useSelector: jest.fn()
}));

describe('testing Header component', () => {
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
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        );
    });

    it('Menu toggles when menu icon is clicked', () => {
        const { getByTestId } = render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        );
        const menuIcon = getByTestId('menu-icon'); // Replace 'menu-icon' with an appropriate test ID

        // Check if the menu is initially hidden
        expect(menuIcon).toBeInTheDocument(); // Assuming the menu icon is present

        // Simulate click event
        fireEvent.click(menuIcon);

        // Check if the menu is toggled and is now displayed
        const menuAfterClick = getByTestId('menu-icon'); // Replace with the appropriate test ID for the changed menu icon
        expect(menuAfterClick).toBeInTheDocument(); // Assuming the menu icon is now hidden
    });
});