import React, { useState, useEffect } from 'react'
import ModalWindow from '../components/Modal'
import styles from '../scss/CartPage.module.scss'

export default function CartPage() {
  const [cart, setCart] = useState(null)

  const fetchCart = async (checkForDiscrepancies = false) => {
    try {
      const response = await fetch('/корзина')
      if (!response.ok) {
        throw new Error('Помилка мережі')
      }
      const serverData = await response.json()

      if (checkForDiscrepancies) {
        const localCartData = JSON.parse(
          localStorage.getItem('cartData') || '{}',
        )
        if (localCartData.продукты.length !== serverData.продукты.length) {
          alert('Ваш кошик було оновлено відповідно до серверних даних.')
        }
      }

      setCart(serverData)
      localStorage.setItem('cartData', JSON.stringify(serverData))
    } catch (error) {
      console.error('Помилка при завантаженні корзини:', error)
    }
  }

  useEffect(() => {
    const localCartData = localStorage.getItem('cartData')
    if (localCartData) {
      setCart(JSON.parse(localCartData))
      fetchCart(true)
    } else {
      fetchCart()
    }
  }, [])

  useEffect(() => {
    if (cart) {
      localStorage.setItem('cartData', JSON.stringify(cart))
    }
  }, [cart])

  // Ця функція повинна бути в місці де знаходиться кнопка додати в корзину

  // const createNewCart = async (products) => {
  //   try {
  //     const newCart = {
  //       продукты: products,
  //     }

  //     const response = await fetch('/cart', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newCart),
  //     })

  //     if (!response.ok) {
  //       throw new Error('Помилка при створенні нової корзини')
  //     }

  //     const data = await response.json()
  //     setCart(data) // Оновлюється локальний стан корзини новою корзиною
  //   } catch (error) {
  //     console.error('Помилка:', error)
  //   }
  // }

  // Оновлення корзини
  const updateCart = {
    продукты: [
      {
        товар: '5da463678cca382250dd7bc7',
        тележкаКоличество: 2,
      },
      {
        товар: '5d73ad04fcad90130470f08b',
        тележкаКоличество: 3,
      },
    ],
  }

  fetch('/cart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCart),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Помилка мережі')
      }
      return response.json()
    })
    .then((data) => {
      // Тут можна обробити оновлену корзину, отриману від сервера
      console.log(data)
    })
    .catch((error) => {
      console.error('Помилка:', error)
    })

  // Збільшити кількість товару
  const handleAddProduct = async (productId, count) => {
    try {
      const response = await fetch(`/cart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          кількість: count,
        }),
      })
      if (!response.ok) {
        throw new Error('Помилка при додаванні товару')
      }
      fetchCart()
    } catch (error) {
      console.error('Помилка:', error)
    }
  }

  // Зменшити кількість товару
  const handleDecreaseProduct = async (productId) => {
    try {
      const response = await fetch(`/cart/product/${productId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Помилка при зменшенні кількості товару')
      }
      fetchCart()
    } catch (error) {
      console.error('Помилка:', error)
    }
  }

  // Видалити товар з корзини
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch(`/cart/${productId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Помилка при видаленні товару')
      }
      fetchCart()
    } catch (error) {
      console.error('Помилка:', error)
    }
  }

  // Видалити корзину
  const handleRemoveCart = async () => {
    try {
      const response = await fetch('/корзина', {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Помилка при видаленні корзини')
      }
      setCart(null) // Reset cart to initial state
    } catch (error) {
      console.error('Помилка:', error)
    }
  }

  if (!cart) return <div>Завантаження...</div>

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        {cart.продукты.map((product) => (
          <div key={product._id} className={styles.cartItem}>
            <img src={product.product.imageUrls[0]} alt={product.product.имя} />
            <div>{product.product.имя}</div>
            <div>Кількість: {product.корзинаКоличество}</div>
            <div>Ціна: {product.product.текущаяцена} грн.</div>
            <button onClick={() => handleRemoveProduct(product._id)}>
              Видалити
            </button>
            <button onClick={() => handleAddProduct(product._id, 1)}>+</button>
            <button onClick={() => handleDecreaseProduct(product._id)}>
              -
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cartSummary}>
        <div>Загальна вартість: {calculateTotal()} USD.</div>
        <input type="tel" placeholder="Введіть ваш номер телефону" />
        <button>Купити</button>
      </div>
      <button onClick={handleRemoveCart}>Видалити корзину</button>
      <ModalWindow />
    </div>
  )

  function calculateTotal() {
    return cart.продукты.reduce(
      (acc, product) =>
        acc + product.product.текущаяцена * product.корзинаКоличество,
      0,
    )
  }
}

// import React, { useState, useEffect } from 'react';
// import ModalWindow from '../components/Modal';
// import styles from '../scss/CartPage.module.scss';
// import { HOST, axiosApiInstance } from '../components/Token';

// export default function CartPage() {
//   const [cart, setCart] = useState(null);

//   const fetchCart = async (checkForDiscrepancies = false) => {
//     try {
//       const response = await axiosApiInstance.get(`${HOST}/корзина`); // Axios для GET запиту
//       if (!response.data) {
//         throw new Error('Помилка мережі');
//       }
//       const serverData = response.data;

//       if (checkForDiscrepancies) {
//         const localCartData = JSON.parse(localStorage.getItem('cartData') || '{}');
//         if (localCartData.продукты.length !== serverData.продукты.length) {
//           alert('Ваш кошик було оновлено відповідно до серверних даних.');
//         }
//       }

//       setCart(serverData);
//       localStorage.setItem('cartData', JSON.stringify(serverData));
//     } catch (error) {
//       console.error('Помилка при завантаженні корзини:', error);
//     }
//   }

//   useEffect(() => {
//     const localCartData = localStorage.getItem('cartData');
//     if (localCartData) {
//       setCart(JSON.parse(localCartData));
//       fetchCart(true);
//     } else {
//       fetchCart();
//     }
//   }, []);

//   useEffect(() => {
//     if (cart) {
//       localStorage.setItem('cartData', JSON.stringify(cart));
//     }
//   }, [cart]);

//   // Оновлення корзини
//   const updateCart = {
//     продукты: [
//       {
//         товар: '5da463678cca382250dd7bc7',
//         тележкаКоличество: 2,
//       },
//       {
//         товар: '5d73ad04fcad90130470f08b',
//         тележкаКоличество: 3,
//       },
//     ],
//   };

//   axiosApiInstance
//     .put(`${HOST}/cart`, updateCart) // Axios для PUT запиту
//     .then((response) => {
//       if (!response.data) {
//         throw new Error('Помилка мережі');
//       }
//       // Тут можна обробити оновлену корзину, отриману від сервера
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error('Помилка:', error);
//     });

//   // Збільшити кількість товару
//   const handleAddProduct = async (productId, count) => {
//     try {
//       const response = await axiosApiInstance.post(`${HOST}/cart/${productId}`, {
//         кількість: count,
//       }); // Axios для POST запиту
//       if (!response.data) {
//         throw new Error('Помилка при додаванні товару');
//       }
//       fetchCart();
//     } catch (error) {
//       console.error('Помилка:', error);
//     }
//   }

//   // Зменшити кількість товару
//   const handleDecreaseProduct = async (productId) => {
//     try {
//       const response = await axiosApiInstance.delete(`${HOST}/cart/product/${productId}`); // Axios для DELETE запиту
//       if (!response.data) {
//         throw new Error('Помилка при зменшенні кількості товару');
//       }
//       fetchCart();
//     } catch (error) {
//       console.error('Помилка:', error);
//     }
//   }

//   // Видалити товар з корзини
//   const handleRemoveProduct = async (productId) => {
//     try {
//       const response = await axiosApiInstance.delete(`${HOST}/cart/${productId}`); // Axios для DELETE запиту
//       if (!response.data) {
//         throw new Error('Помилка при видаленні товару');
//       }
//       fetchCart();
//     } catch (error) {
//       console.error('Помилка:', error);
//     }
//   }

//   // Видалити корзину
//   const handleRemoveCart = async () => {
//     try {
//       const response = await axiosApiInstance.delete(`${HOST}/корзина`); // Axios для DELETE запиту
//       if (!response.data) {
//         throw new Error('Помилка при видаленні корзини');
//       }
//       setCart(null); // Reset cart to initial state
//     } catch (error) {
//       console.error('Помилка:', error);
//     }
//   }

//   if (!cart) return <div>Завантаження...</div>

//   return (
//     <div className={styles.cartContainer}>
//       <div className={styles.cartItems}>
//         {cart.продукты.map((product) => (
//           <div key={product._id} className={styles.cartItem}>
//             <img src={product.product.imageUrls[0]} alt={product.product.имя} />
//             <div>{product.product.имя}</div>
//             <div>Кількість: {product.корзинаКоличество}</div>
//             <div>Ціна: {product.product.текущаяцена} грн.</div>
//             <button onClick={() => handleRemoveProduct(product._id)}>
//               Видалити
//             </button>
//             <button onClick={() => handleAddProduct(product._id, 1)}>+</button>
//             <button onClick={() => handleDecreaseProduct(product._id)}>
//               -
//             </button>
//           </div>
//         ))}
//       </div>
//       <div className={styles.cartSummary}>
//         <div>Загальна вартість: {calculateTotal()} USD.</div>
//         <input type="tel" placeholder="Введіть ваш номер телефону" />
//         <button>Купити</button>
//       </div>

// <button onClick={handleRemoveCart}>Видалити корзину</button>
//      <ModalWindow />
//    </div>
//  )

//  function calculateTotal() {
//    return cart.продукты.reduce(
//      (acc, product) =>
//        acc + product.product.текущаяцена * product.корзинаКоличество,
//      0,
//    )
//  }
// }