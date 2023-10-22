import React, { useState} from "react";
import api from "../../Redux/api/api";
import OrderForm from "../OrderForm";
import styles from './OrderFormContainer.module.scss'



export default function OrderFormContainer() {

    const [cart, setCart] = useState('')

    const getCard =async () => {
        const cart = await api('cart')
        setCart(cart)
        console.log(cart)
    }

    return (
        <>
            <button onClick={getCard}>Buy</button>
            <div className={styles['order-container']}>
                <OrderForm cart={cart}></OrderForm>
            </div>
        </>
    )
}