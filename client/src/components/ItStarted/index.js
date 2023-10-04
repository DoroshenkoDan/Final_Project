import React from 'react'
import styles from './ItStarted.module.scss'
import { NavLink } from 'react-router-dom'
export default function ItStarted() {
  console.log('hello')
  return (
    <div className={styles['flex-wrapper']}>
      <div className={styles['text-block']}>
        <h2 className={styles['text-heading']}>It started with a small idea</h2>
        <p className={styles['text-p']}>
          A global brand with local beginnings, our story begain in a small
          studio in South London in early 2014
        </p>
        <NavLink className={styles['button-collection']} to="/catalog/">
          View Collection
        </NavLink>
      </div>
      <div className={styles['itstarted-image-wrapper']}>
        <img
          className={styles['itstarted-image']}
          src="../img/ItStarted.png"
        ></img>
      </div>
    </div>
  )
}
