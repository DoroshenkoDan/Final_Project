import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartIcon from '../CartIcon'
import FavoritesIcon from '../FavoritesIcon'
import styles from './Header.module.scss'
import MenuIcon from '../MenuIcon'
import CloseBtnIcon from '../CloseBtnIcon'

export default function Header() {
  const [isMenuHidden, setIsMenuHidden] = useState(true)

  const toggleHideItems = () => {
    setIsMenuHidden(!isMenuHidden)
  }

  return (
    <div className={styles['header-container']}>
      <div className={styles['top-menu']}>
        <span className={styles.logo}>Avion</span>
        <span className={styles.icons}>
          <NavLink className={styles['icon-favorites']} to="/favorites/">
            <FavoritesIcon />
          </NavLink>
          <NavLink className={styles['icon-cart']} to="/cart/">
            <CartIcon />
          </NavLink>
        </span>
        <span
          className={`${styles['icon-menu']} ${
            !isMenuHidden ? styles['icon-menu--display'] : ''
          }`}
          onClick={toggleHideItems}
        >
          <MenuIcon />
        </span>
        <span
          className={`${styles['icon-menu']} ${
            isMenuHidden ? styles['icon-menu--display'] : ''
          }`}
          onClick={toggleHideItems}
        >
          <CloseBtnIcon />
        </span>
      </div>
      <nav
        className={`${styles.nav} ${
          isMenuHidden ? styles['nav--display'] : ''
        }`}
      >
        <ul className={styles.nav__list}>
          <li className={`${styles.nav__item} ${styles['nav__item--display']}`}>
            <NavLink className={styles.nav__link} to="/cart/">
              Cart
            </NavLink>
          </li>
          <li className={`${styles.nav__item} ${styles['nav__item--display']}`}>
            <NavLink className={styles.nav__link} to="/favorites/">
              Favorites
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink className={styles.nav__link} to="/catalog/plantPots/">
              Plant pots
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink className={styles.nav__link} to="/catalog/ceramics/">
              Ceramics
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink className={styles.nav__link} to="/catalog/tables/">
              Tables
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink className={styles.nav__link} to="/catalog/chairs/">
              Chairs
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink className={styles.nav__link} to="/catalog/crockery/">
              Crockery
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink className={styles.nav__link} to="/catalog/nightstands/">
              Nightstands
            </NavLink>
          </li>
          <li className={styles.nav__item}>
            <NavLink className={styles.nav__link} to="/catalog/cutlery/">
              Cutlery
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
