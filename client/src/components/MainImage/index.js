import React from 'react'
import styles from './MainImage.module.scss'
import { NavLink } from 'react-router-dom'

function MainImages() {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <div className={styles.text}>
          <h2>
            Luxury homeware for people
            <br />
            who love timeless design quality
          </h2>
          <h1>
            With our new collection, view over 400 bespoke pieces from homeware
            through to furniture today
          </h1>
          <p>Shop the new Spring 2022 collection today</p>
          <NavLink to="/allProducts/" className={styles.link}>
            <button className={styles.button}>View collection</button>
          </NavLink>
          <img src="/img/baner/Baner2.webp" alt="Main" />
        </div>
      </div>
    </div>
  )
}

export default MainImages
