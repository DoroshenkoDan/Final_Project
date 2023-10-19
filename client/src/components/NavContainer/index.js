import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import styles from "./NavContainer.module.scss";
import {NavLink} from "react-router-dom";
import {fetchCategories} from "../../Redux/reducers/categoriesReducers";
import PropTypes from "prop-types";


export default function NavContainer (props) {
    const categories = useSelector((state) => state.categories.categories)
    const dispatch = useDispatch()

    function getCategories() {
        dispatch(fetchCategories())
    }

    useEffect(() => {
        getCategories()
    }, [])


    return(
        <nav className={`${styles.nav} ${props.isMenuHidden ? styles.navDisplay : ''}`}>
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
    )
}

NavContainer.propTypes = {
    isMenuHidden: PropTypes.object.isRequired,
};