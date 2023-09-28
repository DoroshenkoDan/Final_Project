import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

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
