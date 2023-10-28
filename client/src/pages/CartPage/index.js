import React, {useEffect, useState} from 'react'
import styles from "./CartPage.module.scss"
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import CartProductList from '../../components/CartProductList/index.js'
import {HOST} from "../../components/Token"
import OrderForm from "../../components/OrderForm";
// eslint-disable-next-line
import {addArrayToCart} from '../../Redux/reducers/cartReducer.js'
import {useNavigate} from "react-router-dom";

export default function Cart() {
    const [visibilityOrderForm, setVisibilityOrderForm] = useState(false)
    const [orderPlaced, setOrderPlaced] = useState({status: '', massage: ''})
    const cartReducer = useSelector((state) => state.store.cart.cart)
    const allProducts = useSelector((state) => state.products.data)
    const userStatus = useSelector((state) => state.store.user.status)
    const navigate = useNavigate();
    // eslint-disable-next-line
    const dispatch = useDispatch()

    useEffect(() => {
        if (userStatus) {
            getChekCart()
            console.log("getChekCart-worked");
        }

    }, [userStatus])

    useEffect(() => {
        const fetchData = async () => {
            if (userStatus) {
                try {
                    const dataExist = await getCart()
                    console.log('DataStatus', dataExist.data)
                    if (dataExist.data !== null) {
                        await updateServerCart()
                    } else {
                        await createServerCart()
                    }
                } catch (error) {
                    console.error('Error fetching cart data:', error)
                }
            } else {
                console.log('User is not logged in')
            }
        }
        fetchData()
    }, [cartReducer, userStatus])

    async function getCart() {
        const response = await axios.get(HOST + '/cart')
        console.log('cartGet', response)
        return response
    }

    async function getChekCart() {
        const response = await axios.get(HOST + '/cart')
        if (response && response.data && response.data.products) {
            dispatch(addArrayToCart(response.data.products))
            console.log('cartCheckGet', response)
        } else {
            console.error(' getChekCart: объект или свойство products отсутствуют');
        }

        return response
    }

    async function updateServerCart() {
        const arrayToSend = {products: cartReducer}
        console.log("UpdateCartReducer", arrayToSend);
        axios
            .put(HOST + '/cart', arrayToSend)
            .then((response) => {

                console.log('(Update) All is Good Object sended', response)
            })
            .catch((err) => {
                console.log('твой код хуйня', err)
            })
    }

    async function createServerCart() {
        const arrayToSend = {products: cartReducer}
        axios
            .post(HOST + '/cart', arrayToSend)
            .then(() => {

                console.log('(Create)All is Good Object sended')
            })
            .catch((err) => {
                console.log('твой код хуйня', err)
            })
    }

    function mergeObjectsWithSameId(array1, array2) {
        const mergedObjects = []

        for (const obj1 of array1) {
            const matchingObject = array2.find((obj2) => obj2._id === obj1.product)
            console.log("matchingObject", matchingObject);
            if (matchingObject) {
                mergedObjects.push({...obj1, ...matchingObject})
            }
        }
        console.log("mergedObjects", mergedObjects);
        return mergedObjects
    }

    const cartProducts = mergeObjectsWithSameId(cartReducer, allProducts)
    console.log('CartReducer, ProductReducer', cartReducer, allProducts)

    const totalCurrentPrice = cartProducts.reduce((total, product) => {
        const productValue = product.currentPrice * product.cartQuantity
        return total + productValue
    }, 0)

    function showOrderForm() {
        if(userStatus) {
            setVisibilityOrderForm(true)
        } else {
            navigate('/login/')
        }
    }

    function changeOrderPlaced(orderInfo) {
        setOrderPlaced(orderInfo)
    }

    if (cartProducts.length === 0) {
        return (
            <>
                <div className={styles['cart-no-item-wrapper']}>
                    <p className={styles['cart-tittle-welcome']}>Your cart is empty </p>
                </div>
                {
                    orderPlaced.status && <div className={styles['cart-no-item-wrapper']}>
                        <h1 className={styles['cart-tittle-welcome']}>{orderPlaced.massage}</h1>
                    </div>
                }
            </>)
    }

        return (
            <div className={styles['cart-container']}>
                <h3 className={styles['cart-tittle-welcome']}>Your shopping cart</h3>
                <div className={styles['cart-section-names']}>
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>Price</p>
                </div>
                <div className={styles['cart-list-container']}>
                    {cartProducts.map((product) => (
                        <CartProductList
                            key={product._id}
                            img={product.imageUrls}
                            name={product.name}
                            quantity={product.cartQuantity}
                            price={product.currentPrice}
                            discribe={product.description}
                            id={product._id}
                        />
                    ))}
                </div>
                <div className={styles['cart-total-and-order-btn-container']}>
                    <p className={styles['cart-total-price']}>
                        Subtotal
                        <span
                            style={{
                                color: '#2A254B',
                                fontSize: '24px',
                                padding: '0px 0px 0px 15px',
                            }}
                        >
                        {totalCurrentPrice && Math.round(totalCurrentPrice * 100) / 100}$
                    </span>
                    </p>
                    <p>Taxes and shipping are calculated at checkout</p>
                    <button
                        onClick={() => {
                            showOrderForm()
                        }}
                        className={styles['cart-order-btn']}
                    >
                        Go to checkout
                    </button>
                </div>
                {
                    visibilityOrderForm &&
                    <OrderForm changeOrderPlaced={changeOrderPlaced} orderPlaced={orderPlaced}></OrderForm>
                }
            </div>
        )
    }
