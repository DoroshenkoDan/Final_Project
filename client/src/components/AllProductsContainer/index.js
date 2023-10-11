import React, { useEffect, useState } from 'react'
import styles from './AllProductsContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleItems,
  toggleAddItems,
  fetchFilter,
} from '../../Redux/reducers/FilterReducers'

export default function AllProductsContainer() {
  const dispatch = useDispatch()
  const list = useSelector((state) => state.filters.data)
  const [items, setItems] = useState(9)
  const [addItems, setAdditems] = useState(0)
  const [, setShowLoadMore] = useState(true)
  const [previousLength, setPreviousLength] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const categories = useSelector((state) => state.filters.categories)
  const prices = useSelector((state) => state.filters.prices)
  const brands = useSelector((state) => state.filters.brands)
  const selectedCategories = []
  const selectedPrices = []
  const selectedBrands = []
  for (const category in categories) {
    if (categories[category] === true) {
      selectedCategories.push(category)
    }
  }
  for (const price in prices) {
    if (prices[price] === true) {
      selectedPrices.push(price)
    }
  }
  for (const brand in brands) {
    if (brands[brand] === true) {
      selectedBrands.push(brand)
    }
  }

  function getProducts() {
    dispatch(fetchFilter({ items, addItems }))
    dispatch(toggleItems(items))
    dispatch(toggleAddItems(addItems))
  }

  useEffect(() => {
    getProducts()
  }, [items, addItems])

  useEffect(() => {
    if (list.length === previousLength) {
      setShowLoadMore(false)
    } else {
      setPreviousLength(list.length)
    }
  }, [list])

  function buttonClick() {
    setItems(items)
    setAdditems(addItems + 6)
  }

  useEffect(() => {
    if (list !== undefined) {
      setIsLoading(false)
    }
  }, [list])

  return (
    <div className={styles['products-container-container']}>
      {isLoading ? (
        <div className={styles.loading}>Загрузка данных...</div>
      ) : (
        <div className={styles['products-container']}>
          {list !== undefined &&
            list?.map((product, index) => (
              <div className={styles['products-container-item']} key={index}>
                <img
                  src={
                    product.imageUrls
                      ? product.imageUrls[0]
                      : `${product.imageUrls}`
                  }
                  className={styles['products-container-item-img']}
                />
                <p className={styles['products-container-item-name']}>
                  {product.name}
                </p>
                <p className={styles['products-container-item-price']}>
                  {product.currentPrice} грн.
                </p>
              </div>
            ))}
        </div>
      )}
      {selectedCategories.length === 0 &&
        selectedPrices.length === 0 &&
        selectedBrands.length === 0 &&
          (
          <button
            className={styles['products-container-btn']}
            onClick={buttonClick}
          >
            Load more
          </button>
        )}
    </div>
  )
}
