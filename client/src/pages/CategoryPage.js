import React from 'react'
import axios from 'axios'
import { HOST } from '../components/Token'
import { useSelector } from 'react-redux'

export default function AuthorithationPage() {
  const status = useSelector((state) => state.user.status)

  async function send() {
    // const tokenRefresh = await refreshAccessToken(status, data);
    // setAuthToken(tokenRefresh)

    const newProduct = {
      name: 'new product for testing purposes',
      currentPrice: 199.99,
      previousPrice: 250,
      categories: 'men',
      imageUrls: [
        'img/products/men/001.png',
        'img/products/men/002.png',
        'img/products/men/003.png',
        'img/products/men/004.png',
      ],
      quantity: 100,
      color: 'red',
      productUrl: '/men',
      brand: 'braaaand',
      myCustomParam: 'some string or json for custom param',
    }
    if (status === true) {
      axios
        .post(HOST + '/products', newProduct)
        .then((newProduct) => {
          console.log('ONO BLYAT', newProduct)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return <button onClick={send}>ТЕСТ</button>
}
