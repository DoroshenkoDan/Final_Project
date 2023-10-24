import React, { useEffect } from 'react'
import FavoriteItem from '../FavoriteItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWishlist } from '../../Redux/reducers/wishlistReducers'
import styles from './FavoriteList.module.scss'
export default function FavoriteList() {
  const userStatus = useSelector((state) => state.store.user.status)
  const wishlist = useSelector((state) => state.store.wishlist.wishlist)
  const realWishlist = Array.from(
    new Set(wishlist.map(JSON.stringify)),
    JSON.parse,
  )
  const dispatch = useDispatch()
  function getWishlist() {
    if (userStatus) {
      dispatch(fetchWishlist())
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  return (
    <div className={styles['favourite-list']}>
      <div className={styles['favourite-list-wrapper']}>
        <h2 className={styles['favourite-heading']}>Wishlist</h2>
        {(userStatus &&
          ((realWishlist.length > 0 &&
            realWishlist.map((product, index) => {
              return <FavoriteItem product={product} key={index}></FavoriteItem>
            })) || (
            <p className={styles['favourite-text']}>
              Wow, it&apos;s so empty here
            </p>
          ))) || (
          <p className={styles['favourite-text']}>You are not authorized.</p>
        )}
      </div>
    </div>
  )
}
