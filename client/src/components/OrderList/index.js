import React, {useEffect, useState} from 'react'
import styles from "./OrderList.module.scss";
import {HOST} from "../Token";
import axios from "axios";
import OrderItem from "../OrderItem"

export default function FavoritesPage() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axios
            .get(HOST + "/orders")
            .then(receivedOrders => {
                console.log(receivedOrders.data)
                setOrders(receivedOrders.data)
            })
            .catch(err => {
                console.log(err)
            });

    }, [])


    return (
        <div className={styles['wrapper-orders']}>
            <div className={styles['container-orders']}>
                <h2 className={styles['orders-title']}>Your orders</h2>
                {
                    orders.length === 0 &&
                    <p className={styles['order-text__empty']}>
                        Wow, it&apos;s empty here
                    </p>
                }
                {
                    orders.length >= 0 &&
                    orders.map(order => (
                        <div key={order._id}>
                            <OrderItem order={order}></OrderItem>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
