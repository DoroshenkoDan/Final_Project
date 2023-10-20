import React from "react";
import PropTypes from 'prop-types';
import styles from "./FavoriteItem.module.scss"
import { NavLink } from 'react-router-dom'
import { removeFromWishlist } from "../../Redux/reducers/wishlistReducers";
import {useDispatch} from "react-redux";


export default function FavoriteItem (props) {
    const dispatch = useDispatch();
    


    function selfDestruction (){
        dispatch(removeFromWishlist(props.product._id))
    }
    return(<> 
            <NavLink className={styles['favourite-item']} to={`/products/${props.product.id}`}>
                <img className={styles['favourite-img']} src={props.product.imageUrls[0]}/>
                <div className={styles['favourite-item-description']}>
                    <h3 className={styles['favourite-item-heading']}>{props.product.name}</h3>
                    <p className={styles['favourite-item-text']}>{props.product.description}</p>
                    <p className={styles['favourite-item-price']}>{props.product.currentPrice}$</p>
                    
                </div>
            </NavLink>
            <button onClick={()=>{selfDestruction()}}>delete</button></>
                )
}

FavoriteItem.propTypes = {
    product: PropTypes.object,
}