import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartIcon from '../CartIcon'
import FavoritesIcon from '../FavoritesIcon'
import styles from './Header.module.scss'
import MenuIcon from '../MenuIcon'
import CloseBtnIcon from '../CloseBtnIcon'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../Redux/reducers/categoriesReducers'

export default function Header() {
  const categories = useSelector((state) => state.categories.categories)
  const [isMenuHidden, setIsMenuHidden] = useState(true)
  const dispatch = useDispatch()

  function getCategories() {
    dispatch(fetchCategories())
  }

  useEffect(() => {
    getCategories("products")
  }, [])

  const toggleHideItems = () => {
    setIsMenuHidden(!isMenuHidden)
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.topMenu}>
        <span className={styles.logo}>Avion</span>
        <span className={styles.icons}>
          <NavLink className={styles.iconFavorites} to="/favorites/">
            <FavoritesIcon />
          </NavLink>
          <NavLink className={styles.iconCart} to="/cart/">
            <CartIcon />
          </NavLink>
        </span>
        <span
          className={`${styles.iconMenu} ${
            !isMenuHidden ? styles.iconMenuDisplay : ''
          }`}
          onClick={toggleHideItems}
        >
          <MenuIcon />
        </span>
        <span
          className={`${styles.iconMenu} ${
            isMenuHidden ? styles.iconMenuDisplay : ''
          }`}
          onClick={toggleHideItems}
        >
          <CloseBtnIcon />
        </span>
      </div>
      <nav className={`${styles.nav} ${isMenuHidden ? styles.navDisplay : ''}`}>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${styles.navItemDisplay}`}>
            <NavLink className={styles.navLink} to="/cart/">
              Cart
            </NavLink>
          </li>
          <li className={`${styles.navItem} ${styles.navItemDisplay}`}>
            <NavLink className={styles.navLink} to="/favorites/">
              Favorites
            </NavLink>
          </li>
          {categories.map((category) => (
            <li key={category.id} className={styles.navItem}>
              <NavLink
                to={`/category/${category.id}/`}
                className={styles.navLink}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
