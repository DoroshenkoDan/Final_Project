import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartIcon from '../Icons/CartIcon'
import FavoritesIcon from '../Icons/FavoritesIcon'
import {IoPersonAddOutline} from 'react-icons/io5'
import {RxSlash} from 'react-icons/rx'
import styles from './Header.module.scss'
import MenuIcon from '../Icons/MenuIcon'
import CloseBtnIcon from '../Icons/CloseBtnIcon'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetStatus,
  resetData,
  resetToken,
} from '../../Redux/reducers/userReducers'
import IconLogin from '../Icons/IconLogin'
import LogOutIcon from '../Icons/LogOutIcon'
import NavContainer from '../NavContainer'
import { setAuthToken } from '../Token'

export default function Header() {
  const status = useSelector((state) => state.store.user.status)
  const car = useSelector((state) => state.store.cart.cart)
  const [isMenuHidden, setIsMenuHidden] = useState(true)
  const dispatch = useDispatch()

  const toggleHideItems = () => {
    setIsMenuHidden(!isMenuHidden)
  }

  const logOutUser = () => {
    dispatch(resetStatus())
    dispatch(resetData())
    dispatch(resetToken())
    setAuthToken(false)
  }
console.log(car.length);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.topMenu}>
        <NavLink className={styles.logoLink} to="/">
          <span className={styles.logo}>Avion</span>
        </NavLink>
        <span className={styles.icons}>
          <NavLink className={styles.icon} to="/favorites/">
            <FavoritesIcon />
          </NavLink>          
          <NavLink className={styles.icon} to="/cart/">
            <CartIcon />
          </NavLink>
          {status && (
            <NavLink className={styles.icon} to="/profile/">
          <IoPersonAddOutline className={styles.profile}/>          
        </NavLink>        
          )}          
        </span>
        <div className={styles.counter}>{car.length}</div>
        {status && 
        <RxSlash className={styles.shlash} />
        }               
        
        {status && (
          <NavLink
            onClick={logOutUser}
            className={styles.iconAuth}
            to="/login/"
          >
            <LogOutIcon />
          </NavLink>
        )}
        {!status && (
          <NavLink className={styles.iconAuth} to="/login/">
            <IconLogin />
          </NavLink>
        )}
        <span
          className={`${styles.iconMenu} ${
            !isMenuHidden ? styles.iconMenuDisplay : ''
          }`}
          data-testid="menu-icon"
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
      <NavContainer isMenuHidden={isMenuHidden}></NavContainer>
    </header>
  )
}
