import styles from './producItem.module.scss'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchProducts } from '../../Redux/reducers/productsReducers'

export default function ProductItem({ props }) {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.products.data)
  const [product, setProduct] = useState({})

  function getProducts() {
    dispatch(fetchProducts())
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    findObj(list, props)
  }, [list, props])

  function findObj(array, id) {
    const object = array.filter((item) => item.id === id)
    setProduct(object[0])
  }

  if (!product) {
    return null
  }

  const {
    name,
    id,
    imageUrls,
    currentPrice,
    height,
    width,
    depth,
    description,
  } = product

  return (
    <div key={id} className={styles['product-item-background']}>
      <div className={styles['product-item-container']}>
        <img className={styles['product-item-img']} src={imageUrls} />
        <div className={styles['product-item-information']}>
          <div className={styles['product-item-information-price-and-name']}>
            <h4>{name}</h4>
            <p>${currentPrice}</p>
          </div>
          <h5>Product description</h5>
          <p className={styles['product-item-information-descripton']}>
            {description}
          </p>
          <h5>Dimensions</h5>
          <div className={styles['product-item-information-chart']}>
            <div className={styles['product-item-information-chart-row']}>
              <p>Height</p>
              <p>{height}</p>
            </div>
            <div className={styles['product-item-information-chart-row']}>
              <p>Width</p>
              <p>{width}</p>
            </div>
            <div className={styles['product-item-information-chart-row']}>
              <p>Depth</p>
              <p>{depth}</p>
            </div>
          </div>
          <h5>Quantitity</h5>
          <div className={styles['product-item-information-quantitity-select']}>
            <button>-</button>
            <p>1</p>
            <button>+</button>
          </div>
          <div className={styles['product-item-information-btns-container']}>
            <button>Save to favorites</button>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductItem.propTypes = {
  props: PropTypes.string,
}
