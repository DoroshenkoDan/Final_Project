import React from "react";
import api from "../../Redux/api/api";

export default function OrderFrom () {
    const getCard = () =>{
        const cart = api('cart')
        console.log(cart)
    }
    return (
        <>
        <button onClick={getCard}>Buy</button>
        </>
    )
}