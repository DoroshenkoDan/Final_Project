import React from 'react'
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import Store from '../Redux/store.js'

import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import FavoritesPage from '../pages/FavoritesPage'
import CatalogPage from '../pages/CatalogPage'
import PlantPotsPage from '../pages/PlantPotsPage'


function Routes() {


    return createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '', element: <Navigate to="home/" /> },
                { path: 'home/', element: <HomePage /> },
                { path: 'cart/', element: <CartPage /> },
                { path: 'favorites/', element: <FavoritesPage /> },
                { path: 'catalog/', element: <CatalogPage /> },
                { path: 'category/:categoryId', element: <PlantPotsPage /> },
            ],
        },
    ])
}

export default function Router() {
    return (
        <Store>
            <RouterProvider router={Routes()} />
        </Store>
    )
}
