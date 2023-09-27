import React from 'react'
import { Navigate, useRoutes, BrowserRouter } from 'react-router-dom'
import Store from '../Redux'

import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import FavoritesPage from '../pages/FavoritesPage'
import CatalogPage from '../pages/CatalogPage'
import PlantPotsPage from '../pages/PlantPotsPage'
import CeramicsPage from '../pages/CeramicsPage'
import TablesPage from '../pages/TablesPage'
import ChairsPage from '../pages/ChairsPage'
import CrockeryPage from '../pages/CrockeryPage'
import NightstandsPage from '../pages/NightstandsPage'
import CutleryPage from '../pages/CutleryPage'
import PageNotFound from '../pages/PageNotFound'

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
