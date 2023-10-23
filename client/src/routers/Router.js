import React from 'react'
import { Navigate, useRoutes, BrowserRouter } from 'react-router-dom'

import Layout from '../layouts/Layout'
import CartPage from '../pages/CartPage'
import FavoritesPage from '../pages/FavoritesPage'
import CatalogPage from '../pages/CatalogPage'
import CategoryPage from '../pages/CategoryPage'
import ProductPage from '../pages/ProductPage'
import AllProductsPage from '../pages/AllProductsPage/AllProductsPage.js'
import HomePage from "../pages/HomePage";

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
        { path: 'allproducts/', element: <AllProductsPage /> },
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
