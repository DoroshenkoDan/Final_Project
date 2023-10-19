import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Footer } from '../components/Footer/Footer'
import { fetchProducts } from '../Redux/reducers/productsReducers'
import { useDispatch } from 'react-redux'

export default function Layout() {

    const dispatch = useDispatch()

    function getProducts() {
        dispatch(fetchProducts())
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <>
            <Header />
            <main className="container">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
