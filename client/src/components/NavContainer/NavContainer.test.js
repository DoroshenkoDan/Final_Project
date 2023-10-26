import React from 'react';
import {render} from '@testing-library/react';
import {useDispatch, useSelector} from 'react-redux';
import NavContainer from './index.js';
import {MemoryRouter} from 'react-router-dom';

jest.mock('react-redux', () => ({
    ...jest.requireActual("react-redux"),
    useDispatch: jest.fn(), useSelector: jest.fn()
}));
describe('NavContainer component', () => {
    const dispatchMock = jest.fn();
    beforeEach(() => {
        useDispatch.mockReturnValue(dispatchMock);
        useSelector.mockImplementation((selector) => selector({
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
    it('dispatch not have been called', () => {
        expect(dispatchMock).not.toHaveBeenCalled()
    })
    it('renders the component', () => {
        render(<MemoryRouter>
            <NavContainer isMenuHidden={false}/> </MemoryRouter>
        );
    })

});