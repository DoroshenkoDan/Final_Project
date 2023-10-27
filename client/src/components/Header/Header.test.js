import React from 'react';
import {render} from '@testing-library/react';
import {useDispatch, useSelector} from 'react-redux';
import Header from './index.js';
import {MemoryRouter} from 'react-router-dom';
import { shallow, mount } from 'enzyme';
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
    it('renders without crashing', () => {
        render(<MemoryRouter>
                <Header/>
            </MemoryRouter>
        );
    });
    // it('displays the logo', () => {
    //     const wrapper = shallow(<Header />);
    //     expect(wrapper.find('.logo').text()).toBe('Avion');
    // });
});