import React, { useState, useEffect } from 'react'
import styles from './MainImage.module.scss'

function MainImage() {
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
    <div className={styles.container}>
      <div className={styles.banner} data-size={size}>
        <div className={styles.text}>
          <h2>
            The furniture brand for the
            <br />
            future, with timeless designs
          </h2>
          <button className={styles.button}>View collection</button>
          <p>
            A new era in eco friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors and a beautiful way to
            display things digitally using modern web technologies
          </p>
        </div>
        <div className={styles.image}>
          <img src="/img/baner/main.jpg" alt="Main" />
        </div>
      </div>
    </div>
  )
}

export default MainImage
