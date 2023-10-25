import React from 'react';
import { render } from '@testing-library/react';
import NavContainer from './index.js';


import { act } from 'react-dom/test-utils';

test('renders NavContainer component', () => {
    render(<NavContainer isMenuHidden={false} />);
});


test('displays navigation links', () => {
    const { getByText } = render(<NavContainer isMenuHidden={false} />);
    expect(getByText('Cart')).toBeInTheDocument();
    expect(getByText('Favorites')).toBeInTheDocument();
    // Добавьте другие проверки для категорий, если необходимо.
});
// test('fetches categories on component mount', async () => {
//     const mockDispatch = jest.fn();
//     jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);
//     jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect);
//
//     useDispatch.mockReturnValue(mockDispatch);
//
//     act(() => {
//         render(<NavContainer isMenuHidden={false} />);
//     });
//
//     expect(mockDispatch).toHaveBeenCalledWith(fetchCategories());
// });

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { useDispatch, useSelector } from 'react-redux';
// import NavContainer from './index.js';
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import {fetchCategories} from '../../Redux/reducers/categoriesReducers.js';
//
// const store = createStore((state) => ({
//     categories: {
//         categories: [
//             { id: 1, name: 'Category 1' },
//             { id: 2, name: 'Category 2' },
//         ],
//     },
// }));
//
// // Mock the useDispatch and useSelector hooks
// jest.mock('react-redux');
// const mockDispatch = jest.fn();
// const mockCategories = [{ id: 1, name: 'Category 1' }];
// useDispatch.mockReturnValue(mockCategories);
//
// useSelector.mockImplementation((selector) => selector({
//     categories: { categories: mockCategories },
// }));
//
// // Mock the fetchCategories action
//
// jest.mock('../../Redux/reducers/categoriesReducers', () => ({
//     fetchCategories: jest.fn().mockResolvedValue({ type: 'FETCH_CATEGORIES_SUCCESS' }),
// }));
//
//
// describe('NavContainer', () => {
//     it('renders the component', () => {
//         render(
//             (
//                 <Provider store={store}>
//                     <NavContainer isMenuHidden={true} />
//                 </Provider>
//             )
//         );
//
//     });
//     // it('calls getCategories when component mounts', () => {
//     //     const getCategories = jest.fn();
//     //     render(<NavContainer isMenuHidden={false} getCategories={getCategories} />);
//     //     expect(getCategories).toHaveBeenCalled();
//     // });
//
//     it('dispatches fetchCategories on mount', () => {
//         fetchCategories.mockReturnValue({ id: 1, name: 'Category 1' });
//         render(
//             (
//                 <Provider store={store}>
//                     <NavContainer isMenuHidden={true} />
//                 </Provider>
//             )
//         );
//
//         // Check if fetchCategories is dispatched
//         expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
//         // Check if fetchCategories was called once
//         expect(mockDispatch).toHaveBeenCalledTimes(1);
//     });
//
// });