import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/index.js'

export default function Layout() {
    return (
        <>
            <header>
                <Header />
            </header>
            <main className="container">
                <Outlet />
            </main>
        </>
    )
}
