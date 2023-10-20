import React , {useEffect} from 'react';
import FavoriteItem from '../FavoriteItem';
import {useDispatch, useSelector} from "react-redux";
import {fetchWishlist} from "../../Redux/reducers/wishlistReducers";
import styles from "./FavoriteList.module.scss"
export default function FavoriteList () {

  
            const wishlist = useSelector((state) => state.store.wishlist.wishlist)
    const dispatch = useDispatch()
      function getWishlist() {
              dispatch(fetchWishlist())
          }
      
          useEffect(() => {
              getWishlist()
              console.log("wishlist:")
              console.log(wishlist);
          }, [])
          useEffect(()=> {
          }, [wishlist]

          )

        return (
            (wishlist &&(<div className={styles["favourite-list"]}>
                <div className={styles["favourite-list-wrapper"]}>
                <h2 className={styles['favourite-heading']}>Wishlist</h2>
                {
                wishlist.map((product, index) => {
                 return <FavoriteItem product = {product} key = {index}></FavoriteItem>
                }
                )
                }
                </div>
                </div>)) || (<div className="favourite-items"><span>Ой, тут пусто</span></div>)
        )
    }


