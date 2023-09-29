import React from 'react'
import { Navigate, useRoutes, BrowserRouter } from 'react-router-dom'
import Store from '../Redux'

import Layout from '../layouts/Layout'
import HomePage from '../Pages/HomePage'
import CartPage from '../Pages/CartPage'
import FavoritesPage from '../Pages/FavoritesPage'
import CatalogPage from '../Pages/CatalogPage'
import PlantPotsPage from '../Pages/PlantPotsPage'
import CeramicsPage from '../Pages/CeramicsPage'
import TablesPage from '../Pages/TablesPage'
import ChairsPage from '../Pages/ChairsPage'
import CrockeryPage from '../Pages/CrockeryPage'
import NightstandsPage from '../Pages/NightstandsPage'
import CutleryPage from '../Pages/CutleryPage'
import PageNotFound from '../Pages/PageNotFound'

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
                { path: 'catalog/', element: <CatalogPage /> },
                { path: 'catalog/plantPots/', element: <PlantPotsPage /> },
                { path: 'catalog/ceramics/', element: <CeramicsPage /> },
                { path: 'catalog/tables/', element: <TablesPage /> },
                { path: 'catalog/chairs/', element: <ChairsPage /> },
                { path: 'catalog/crockery/', element: <CrockeryPage /> },
                { path: 'catalog/nightstands/', element: <NightstandsPage /> },
                { path: 'catalog/cutlery/', element: <CutleryPage /> },
                { path: '*', element: <PageNotFound /> },
            ],
        },
    ])
}

export default function Router() {
    return (
        <Store>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Store>
    )
}
