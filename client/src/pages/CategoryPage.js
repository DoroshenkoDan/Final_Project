import React, { useEffect, useState } from 'react'
import styles from '../components/AllProductsContainer/AllProductsContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFilter,
  toggleCategory,
} from '../Redux/reducers/FilterReducers.js'
import { useParams } from 'react-router-dom'

export default function CategoryPage() {
  let { categoryId } = useParams()
  const dispatch = useDispatch()
  const list = useSelector((state) => state.filters.data)
  // const [items, setItems] = useState(9)
  // const [addItems, setAdditems] = useState(0)
  const [, setShowLoadMore] = useState(true)
  const [previousLength, setPreviousLength] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const filters = useSelector((state) => state.filters)
  // const { categories } = filters;

  if (categoryId === 'nightstands') {
    categoryId = 'nightstand'
  }
  const upperCaseCategoryId =
    categoryId.charAt(0).toUpperCase() + categoryId.slice(1)

  useEffect(() => {
    dispatch(toggleCategory(upperCaseCategoryId))
    const params = { ...filters }
    const newCategories = {}
    newCategories[upperCaseCategoryId] = true // Set the selected category to true
    params.categories = newCategories
    console.log(params)
    dispatch(fetchFilter(params))
  }, [upperCaseCategoryId])

  // const selectedCategories = []

  // function getProducts() {
  //   dispatch(fetchFilter({ items, addItems }));
  //   dispatch(toggleItems(items));
  //   dispatch(toggleAddItems(addItems));
  // }

  // useEffect(() => {
  //   getProducts();
  // }, [items, addItems]);

  useEffect(() => {
    if (list?.length === previousLength) {
      setShowLoadMore(false)
    } else {
      setPreviousLength(list?.length)
    }
  }, [list])

  // function buttonClick() {
  //   setItems(items)
  //   setAdditems(addItems + 6)
  // }

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
                  $ {product.currentPrice}
                </p>
              </div>
            ))}
        </div>
      )}
      {/* {(selectedCategories.length === 0) && (
        <button className={styles["products-container-btn"]} onClick={buttonClick}>
          Load more
        </button>
      )} */}
    </div>
  )
}
