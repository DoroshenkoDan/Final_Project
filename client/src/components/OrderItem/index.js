import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styles from './OrderItem.module.scss'
import CloseBtnIcon from '../Icons/CloseBtnIcon'
import axios from 'axios'
import { HOST } from '../Token'

export default function OrderPage(props) {
  function deleteOrders() {
    axios
      .delete(HOST + `/orders/${props.order._id}`)
      .then((result) => {
        props.changeOrders(props.order._id)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <h2 className={`${styles['order-num']} ${styles['order-text']}`}>
        Order: № {props.order.orderNo}
      </h2>
      <p className={`${styles['order-sum']} ${styles['order-text']}`}>
        Total Sum: {props.order.totalSum}$
      </p>
      {props.order.products.map((product) => (
        <div key={product._id} className={styles['order-container__product']}>
          <NavLink
            className={styles['order-item']}
            to={`/products/${product.product.id}`}
          >
            <img
              className={styles['order-img']}
              src={product.product.imageUrls[0]}
            />
            <div className={styles['order-product__description']}>
              <h3 className={styles['order-product__name']}>
                {product.product.name}
              </h3>
              <p className={styles['order-product__quantity']}>
                Quantity: {product.cartQuantity}
              </p>
              <p className={styles['order-product__text']}>
                {product.product.description}
              </p>
              <p className={styles['order-product__price']}>
                {product.product.currentPrice}$
              </p>
            </div>
          </NavLink>
        </div>
      ))}
      <span data-testid="btn-close" className={styles['btn-close']} onClick={deleteOrders}>
        <CloseBtnIcon></CloseBtnIcon>
      </span>
    </>
  )
}

OrderPage.propTypes = {
  order: PropTypes.object,
  changeOrders: PropTypes.func,
}
