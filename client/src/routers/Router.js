import React from 'react'
import { Navigate, useRoutes, BrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'
import FavoritesPage from '../pages/FavoritesPage'
import CatalogPage from '../pages/CatalogPage'
import CategoryPage from '../pages/CategoryPage'
import ProductPage from '../pages/ProductPage'
import AuthPage from "../pages/AuthPage";



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
        { path: 'catalog/', element: <CatalogPage /> },
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
