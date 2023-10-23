import React, { useState} from 'react'
import {NavLink} from 'react-router-dom'
import CartIcon from '../CartIcon'
import FavoritesIcon from '../FavoritesIcon'
import styles from './Header.module.scss'
import MenuIcon from '../MenuIcon'
import CloseBtnIcon from '../CloseBtnIcon'
import {useDispatch, useSelector} from 'react-redux'
import IconLogin from "../IconLogin";
import LogOutIcon from "../LogOutIcon";
import NavContainer from "../NavContainer";
import { Logout } from '../../Redux/reducers/userSlice'

export default function Header() {
    
    const [isMenuHidden, setIsMenuHidden] = useState(true)
    const { isAuth } = useSelector((store) => store.userSlice);
    const dispatch = useDispatch()

    const toggleHideItems = () => {
        setIsMenuHidden(!isMenuHidden)
    }

    const logOutUser = () => {       
        dispatch(Logout())
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.topMenu}>
                <NavLink className={styles.logoLink} to="/">
                    <span className={styles.logo}>Avion</span>
                </NavLink>
                <span className={styles.icons}>
                    <NavLink className={styles.icon} to="/favorites/">
                        <FavoritesIcon/>
                    </NavLink>
                    <NavLink className={`${styles.icon}  ${styles.iconPosition}`} to="/cart/">
                        <CartIcon/>
                    </NavLink>
                    {isAuth ? <NavLink onClick={logOutUser} className={`${styles.icon}`} to="/login/">
                            <LogOutIcon/>
                        </NavLink> : 
                        <NavLink className={`${styles.icon}  ${styles.iconPosition}`} to="/login/">
                            <IconLogin/>
                        </NavLink>}                    

        </span>
                <span
                    className={`${styles.iconMenu} ${
                        !isMenuHidden ? styles.iconMenuDisplay : ''
                    }`}
                    onClick={toggleHideItems}
                >
          <MenuIcon/>
        </span>
                <span
                    className={`${styles.iconMenu} ${
                        isMenuHidden ? styles.iconMenuDisplay : ''
                    }`}
                    onClick={toggleHideItems}
                >
          <CloseBtnIcon/>
        </span>
            </div>
            <NavContainer isMenuHidden={isMenuHidden}></NavContainer>
        </header>
    )
}
