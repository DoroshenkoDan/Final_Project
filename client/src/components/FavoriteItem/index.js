import React from "react";
import PropTypes from 'prop-types';
import styles from "./FavoriteItem.module.scss"
import { NavLink } from 'react-router-dom'
import { removeFromWishlist, deleteFromWishlistAnon } from "../../Redux/reducers/wishlistReducers";
import {useDispatch, useSelector} from "react-redux";


export default function FavoriteItem (props) {
    const dispatch = useDispatch();
    const userStatus = useSelector((state) => state.store.user.status)


    function deleteFavItem (){
        if(userStatus){
        dispatch(removeFromWishlist(props.product._id))
    }
    else {
        console.log("I mana sou en se xeri! Log in!")
        dispatch(deleteFromWishlistAnon(props.product._id))
    }
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
            <button onClick={()=>{deleteFavItem()}}>delete</button></>
                )
}

FavoriteItem.propTypes = {
    product: PropTypes.object,
}