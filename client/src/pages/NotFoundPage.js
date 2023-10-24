import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../scss/NotFoundPage.module.scss'

const NotFoundPage = () => {
  const navigate = useNavigate()
  const notFoundImage = '/img/baner/NotFoundPage1.png'


  return (
    <div className={styles.NotFoundContainer}>
      
      <img
        className={styles.NotFoundImg}
        src={notFoundImage}
        alt="Not Found Image"
      />
      <h1 className={styles.NotFoundTitle}>This page could not be found!</h1>
      <p className={styles.NotFoundText}>
        We are sorry. But the page you are looking for is not available.
        <br></br>Perhaps you can try a new search
      </p>
      <button
        className={styles.NotFoundButton}
        onClick={() => navigate.push('/home')}
      >
        Back to home
      </button>
    </div>
  )
}

export default NotFoundPage
