import React, { useEffect, useState } from 'react'
import styles from './ProductsContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../Redux/reducers/productsReducers'

export default function ProductsContainer() {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.products.data)
  const [productsContainerArray, setProductsContainerArray] = useState([])

  function getProducts() {
    dispatch(fetchProducts())
  }

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    getRandomObjects(list, productsContainerArray)
    console.log('prod', productsContainerArray)
  }, [list])

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function getRandomObjects(sourceArray, resultArray) {
    const sourceCopy = [...sourceArray]
    while (resultArray.length < 4 && sourceCopy.length > 0) {
      const randomIndex = getRandomInt(0, sourceCopy.length - 1)
      const randomObject = sourceCopy[randomIndex]

      if (
        !resultArray.some((item) => item.categories === randomObject.categories)
      ) {
        resultArray.push(randomObject)
      }

      sourceCopy.splice(randomIndex, 1)
    }

    setProductsContainerArray([...resultArray])
  }

  function isLink(str) {
    return str.startsWith('http://') || str.startsWith('https://')
  }

  return (
    <div className={styles['products-container-container']}>
      <div className={styles['products-container']}>
        {productsContainerArray.map((product, index) => (
          <div className={styles['products-container-item']} key={index}>
            <img
              src={
                isLink(product.imageUrls)
                  ? product.imageUrls
                  : `${product.imageUrls}`
              }
              className={styles['products-container-item-img']}
            />
            <p className={styles['products-container-item-name']}>
              {product.name}
            </p>
            <p className={styles['products-container-item-price']}>
              {product.currentPrice}
            </p>
          </div>
        ))}
      </div>
      <button className={styles['products-container-btn']}>
        View collection
      </button>
    </div>
  )
}
