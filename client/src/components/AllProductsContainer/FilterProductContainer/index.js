import React, { useState, useEffect } from 'react'
import styles from './FilterProductContainer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchFilter,
  toggleBrand,
  toggleCategory,
  togglePrice,
} from '../../../Redux/reducers/FilterReducers'

export default function FilterProductContainer() {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)
  const { categories, brands, prices } = filters
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 590)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 590)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleCategoryChange = (category) => {
    dispatch(toggleCategory(category))
    const params = { ...filters }
    params.categories = { ...filters.categories }
    params.categories[category] = !params.categories[category]
    dispatch(fetchFilter(params))
  }

  const handleBrandChange = (brand) => {
    dispatch(toggleBrand(brand))
    const params = { ...filters }
    params.brands = { ...filters.brands }
    params.brands[brand] = !params.brands[brand]
    dispatch(fetchFilter(params))
  }

  const handlePriceChange = (price) => {
    dispatch(togglePrice(price))
    const params = { ...filters }
    params.prices = { ...filters.prices }
    params.prices[price] = !params.prices[price]
    dispatch(fetchFilter(params))
  }

  const resetFilters = () => {
    const initialFilters = {
      categories: {
        Plantpots: false,
        Ceramics: false,
        Tables: false,
        Chairs: false,
        Crockery: false,
        Nightstand: false,
        Cutlery: false,
      },
      prices: {
        '0-50': false,
        '51-100': false,
        '101-999': false,
      },
      brands: {
        Sinsay: false,
        Reserved: false,
        JYSK: false,
        Ceramico: false,
        ArtCeramics: false,
        KitchenCeramics: false,
        CeramicCraft: false,
        Vitra: false,
        Ikea: false,
        FÄRGKLAR: false,
      },
      items: 9,
      addItems: 0,
    }

    dispatch(fetchFilter(initialFilters))
  }

  return (
    <>
      <div className={styles['products-container-container']}>
        <div className={styles['products-container']}>
          {' '}
          <h1 className={styles['products-header']}>Categories</h1>
          {isMobileView ? (
            <select
              className={styles['products-select']}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          ) : (
            <div className={styles['products-container']}>
              {Object.keys(categories).map((category) => (
                <span key={category}>
                  <input
                    type="checkbox"
                    checked={categories[category]}
                    onChange={() => handleCategoryChange(category)}
                    className={styles['products-checkbox']}
                  />
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles['products-container']}>
          {' '}
          <h1 className={styles['products-header']}>Brand</h1>
          {isMobileView ? (
            <select
              className={styles['products-select']}
              onChange={(e) => handleBrandChange(e.target.value)}
            >
              {Object.keys(brands).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          ) : (
            <div className={styles['products-container']}>
              {Object.keys(brands).map((brand) => (
                <span key={brand}>
                  <input
                    type="checkbox"
                    checked={brands[brand]}
                    onChange={() => handleBrandChange(brand)}
                    className={styles['products-checkbox']}
                  />
                  {brand}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className={styles['products-container']}>
          {' '}
          <h1 className={styles['products-header']}>Price</h1>
          {isMobileView ? (
            <select
              className={styles['products-select']}
              onChange={(e) => handlePriceChange(e.target.value)}
            >
              {Object.keys(prices).map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          ) : (
            <div className={styles['products-container']}>
              {Object.keys(prices).map((price) => (
                <span key={price}>
                  <input
                    type="checkbox"
                    checked={prices[price]}
                    onChange={() => handlePriceChange(price)}
                    className={styles['products-checkbox']}
                  />
                  {price}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles['products-container-button']}>
        {isMobileView ? (
          <button
            className={styles['products-container-btn']}
            onClick={resetFilters}
          >
            Clear Filters
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
