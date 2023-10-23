import React from 'react'
import { Navigate, useRoutes, BrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage/HomePage'
import CartPage from '../pages/CartPage'
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage'
import CategoryPage from '../pages/CategoryPage/CategoryPage'
import ProductPage from '../pages/ProductPage/ProductPage'
import AuthPage from "../pages/AuthPage/AuthPage";
import AllProductsPage from "../pages/AllProductsPage/AllProductsPage";



function Routes() {

    return useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '', element: <Navigate to="home/" /> },
                { path: 'home/', element: <HomePage /> },
                { path: 'cart/', element: <CartPage /> },
                { path: 'favorites/', element: <FavoritesPage /> },
                { path: 'login/', element: <AuthPage /> },
                { path: 'allProducts/', element: <AllProductsPage /> },
                { path: 'category/:categoryId', element: <CategoryPage /> },
                { path: 'products/:productId', element: <ProductPage /> },
            ],
        },
    ])

}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}
