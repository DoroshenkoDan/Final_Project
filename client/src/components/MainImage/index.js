import React, { useState, useEffect } from 'react'
import styles from './MainImage.module.scss'

function MainImages() {
  const [size, setSize] = useState('large')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 481) {
        setSize('small')
      } else if (window.innerWidth <= 912) {
        setSize('medium')
      } else {
        setSize('large')
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div className={styles.container} data-size={size}>
      <div className={styles.text}>
        <div className={styles.texts}>
          <h2>
            Luxury homeware for people
            <br />
            who love timeless design quality
          </h2>
          <h1>
            With our new collectin, view over 400 bespoke pieces from homeware
            through to forniture today
          </h1>
          <p>Shop the new Spring 2022 collection today</p>
          <button className={styles.button}>View collection</button>
          <img src="/img/baner/Baner1.jpg" alt="Main" />
        </div>
      </div>
    </div>
  )
}

export default MainImages