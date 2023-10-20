import React, { useEffect } from 'react'
import CartProductList from "../../components/CartProductList/index.js"
import styles from "./CartPage.module.scss"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { HOST } from "../../components/Token/index.js"
export default function Cart() {

    const cartReducer = useSelector(state => state.store.cart.cart)
    const allProducts = useSelector((state) => state.products.data)
    const userStatus = useSelector((state) => state.user.status)

    useEffect(() => {
        const fetchData = async () => {
            if (userStatus) {
                try {
                    const dataExist = await getCart();
                    console.log("DataStatus", dataExist.data);
                    if (dataExist.data !== null) {
                        updateServerCart()

                    } else {
                        createServerCart()
                    }
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            } else {
                console.log("User is not logged in");
            }
        };

        fetchData();
    }, [cartReducer]);



    async function getCart() {
        const response = await axios.get(HOST + "/cart");
        console.log("cartGet", response);
        return response;
    }


    // async function getCart() {
    //    await axios
    //        .get(HOST + "/cart")
    //        .then(cartReturned => {
    //            console.log("cartGet", cartReturned);
    //            return cartReturned
    //        })
    // }


    async function updateServerCart() {
        const arrayToSend = { products: cartReducer }
        axios
            .put(HOST + "/cart", arrayToSend)
            .then(updatedCart => {
                console.log(arrayToSend);
                console.log(updatedCart);
                console.log("All is Good Object sended");
            })
            .catch(err => {
                console.log("твой код хуйня", err);
            });
    }

    async function createServerCart() {
        const arrayToSend = { products: cartReducer }
        axios
            .post(HOST + "/cart", arrayToSend)
            .then(updatedCart => {
                console.log(arrayToSend);
                console.log(updatedCart);
                console.log("All is Good Object sended");
            })
            .catch(err => {
                console.log("твой код хуйня", err);
            });
    }

    function mergeObjectsWithSameId(array1, array2) {
        const mergedObjects = [];

        for (const obj1 of array1) {
            const matchingObject = array2.find((obj2) => obj2._id === obj1._id);
            if (matchingObject) {
                mergedObjects.push({ ...obj1, ...matchingObject });
            }
        }

        return mergedObjects;
    }

    const cartProducts = mergeObjectsWithSameId(cartReducer, allProducts);




    const totalCurrentPrice = cartProducts.reduce((total, product) => {
        const productValue = product.currentPrice * product.prodQuantity;
        return total + productValue;
    }, 0);




    if (cartProducts.length === 0) {
        return <p>loading...</p>
    }



    return (<div className={styles["cart-container"]}>
        <h3 className={styles["cart-tittle-welcome"]}>Your shopping cart</h3>
        <div className={styles["cart-section-names"]}>
            <p>Product</p>
            <p>Quantity</p>
            <p>Price</p>
        </div>
        <div className={styles["cart-list-container"]}>
            {cartProducts.map((product) => (
                <CartProductList key={product.id} img={product.imageUrls} name={product.name} quantity={product.prodQuantity} price={product.currentPrice} discribe={product.description} id={product._id} />
            ))}
        </div>
        <div className={styles["cart-total-and-order-btn-container"]}>
            <p className={styles["cart-total-price"]}>Subtotal
                <span style={{ color: '#2A254B', fontSize: '24px', padding: "0px 0px 0px 15px" }}>${totalCurrentPrice}</span>
            </p>
            <p>Taxes and shipping are calculated at checkout</p>
            <button onClick={() => { getCart() }} className={styles["cart-order-btn"]}>Go to checkout</button>
        </div>

    </div>)
}