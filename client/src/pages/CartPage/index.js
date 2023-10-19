import React, { useEffect } from 'react'
import CartProductList from "../../components/CartProductList/index.js"
import styles from "./CartPage.module.scss"
import { useSelector } from 'react-redux'
export default function Cart() {

    const cartReducer = useSelector(state => state.store.cart.cart)
    const allProducts = useSelector((state) => state.products.data)


    function mergeObjectsWithSameId(array1, array2) {
        const mergedObjects = [];

        for (const obj1 of array1) {
            const matchingObject = array2.find((obj2) => obj2.id === obj1.id);
            if (matchingObject) {
                mergedObjects.push({ ...obj1, ...matchingObject });
            }
        }

        return mergedObjects;
    }

    const cartProducts = mergeObjectsWithSameId(cartReducer, allProducts);


    useEffect(() => {
        console.log("CartProduct", cartProducts);
    }, [cartProducts])


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
                <CartProductList key={product.id} img={product.imageUrls} name={product.name} quantity={product.prodQuantity} price={product.currentPrice} discribe={product.description} id={product.id} />
            ))}
        </div>
        <div className={styles["cart-total-and-order-btn-container"]}>
            <p className={styles["cart-total-price"]}>Subtotal
                <span style={{ color: '#2A254B', fontSize: '24px', padding: "0px 0px 0px 15px" }}>${totalCurrentPrice}</span>
            </p>
            <p>Taxes and shipping are calculated at checkout</p>
            <button className={styles["cart-order-btn"]}>Go to checkout</button>
        </div>

    </div>)
}