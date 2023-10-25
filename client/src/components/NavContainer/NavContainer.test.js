import React from 'react';
import {render, screen} from '@testing-library/react';
import {useDispatch, useSelector} from 'react-redux';
import NavContainer from './index.js';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
import {fetchCategories} from '../../Redux/reducers/categoriesReducers.js';
import * as reactRedux from 'react-redux';

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('NavContainer', () => {
    beforeEach(() => {
        useDispatchMock.mockImplementation(() => () => {});
        useSelectorMock.mockImplementation(selector => selector(mockStore));
    })
    afterEach(() => {
        useDispatchMock.mockClear();
        useSelectorMock.mockClear();
    })

    const useSelectorMock = reactRedux.useSelector;
    const useDispatchMock = reactRedux.useDispatch;

    const mockStore = {
        categories: 'this is thing1',
        status: 'succeeded',
        error: null
    };

    it('renders the component', () => {
        render(<NavContainer isMenuHidden={false}/>);

    });
    it('dispatches fetchCategories on mount', () => {
        // fetchCategories.mockReturnValue({ id: 1, name: 'Category 1' });
        // render(
        //     (
        //         <Provider store={store}>
        //             <NavContainer isMenuHidden={true} />
        //         </Provider>
        //     )
        // );
        //
        // // Check if fetchCategories is dispatched
        // expect(fetchCategories).toHaveBeenCalledWith(expect.any(Function));
        // // Check if fetchCategories was called once
        // expect(mockDispatch).toHaveBeenCalledTimes(1);
        render(<NavContainer isMenuHidden={false}/>);

        expect(useDispatch).toHaveBeenCalledWith(fetchCategories());

    });

});