import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import CartIcon from '../components/CartIcon'
import FavoritesIcon from '../components/FavoritesIcon'

export default function Layout() {
  return (
    <>
      <header>
        <div>
          <span>Avion</span>
          <NavLink to="/cart/">
            <CartIcon />
          </NavLink>
          <NavLink to="/favorites/">
            <FavoritesIcon />
          </NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/catalog/plantPots/">Plant pots</NavLink>
            </li>
            <li>
              <NavLink to="/catalog/ceramics/">Ceramics</NavLink>
            </li>
            <li>
              <NavLink to="/catalog/tables/">Tables</NavLink>
            </li>
            <li>
              <NavLink to="/catalog/chairs/">Chairs</NavLink>
            </li>
            <li>
              <NavLink to="/catalog/crockery/">Crockery</NavLink>
            </li>
            <li>
              <NavLink to="/catalog/nightstands/">Nightstands</NavLink>
            </li>
            <li>
              <NavLink to="/catalog/cutlery/">Cutlery</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}
