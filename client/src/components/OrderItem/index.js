import React from 'react'
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import styles from "../FavoriteItem/FavoriteItem.module.scss";

export default function OrderPage(props) {
    return (
        <>
            <h2>Order</h2>
            {
                props.order.products.map(product => (
                    <div key={product._id}>
                        <NavLink
                            className={styles['favourite-item']}
                            to={`/products/${product.product.id}`}
                        >
                            <img
                                className={styles['favourite-img']}
                                src={product.product.imageUrls[0]}
                            />
                            <div className={styles['favourite-item-description']}>
                                <h3 className={styles['favourite-item-heading']}>
                                    {product.product.name}
                                </h3>
                                <p className={styles['favourite-item-text']}>
                                    {product.product.description}
                                </p>
                                <p className={styles['favourite-item-price']}>
                                    {product.product.currentPrice}$
                                </p>
                            </div>
                        </NavLink>
                    </div>
                ))
            }
        </>
    )
}

OrderPage.propTypes = {
    order: PropTypes.object,
}