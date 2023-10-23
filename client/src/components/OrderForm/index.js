import React from 'react'
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {HOST} from "../Token";

import Input from "../Input";
import styles from './OrderForm.module.scss'
import PropTypes from "prop-types";
// import {useSelector} from "react-redux";
import axios from "axios";


export default function OrderForm(props) {
    const {cart} = props
    // const listProducts = useSelector(state => state.products.data)
    console.log(cart)

    // const findCartProducts = () => {
    //     const cartProducts = []
    //     for (const product of listProducts) {
    //         for (const obj of cart) {
    //             if (obj._id === product._id) {
    //                 cartProducts.push({
    //                     product: product,
    //                     cartQuantity: obj.prodQuantity
    //                 })
    //             }
    //         }
    //     }
    //     return cartProducts;
    // }

    async function getCart () {
        try {
            const response = await axios.get(HOST + '/cart')
            return response.data;
        } catch (err){
            console.log(err);
        }
    }

    const findCustomers = async () => {
        try {
            const response = await axios.get(HOST + "/customers/customer");
            return response.data; // Возвращаем данные
        } catch (err) {
            console.log(err);
            return null; // Либо обработка ошибки
        }
    }
    const handleSubmit = async (orderInfo) => {
        const {email, mobile, country, city, address, postal} = orderInfo;
        console.log(email, country, city, address, postal, mobile, orderInfo)
        console.log('Cart in Order form', cart)
        const productsInCart = await getCart()
        console.log(productsInCart)
        const customer = await findCustomers()
        console.log(customer._id)
        const newOrder = {
            customerId: productsInCart.customerId._id,
            deliveryAddress: {
                country: country,
                city: city,
                address: address,
                postal: `${postal}`,
            },
            // products: productsInCart.products,
            email: email,
            canceled: false,
            mobile: mobile,
            letterSubject: 'Thank you for order! You are welcome!',
            letterHtml: "<h1>Your order is placed. OrderNo is 023689452.</h1><p>{Other details about order in your HTML}</p>"
        }
        console.log(newOrder)
        axios
            .post(HOST + "/orders", newOrder)
            .then(newOrder => {
                console.log('Zakazano ebana', newOrder)
            })
            .catch(err => {
                console.log('Hyi tebe, a ne order', err)
            });
        console.log(newOrder)
    }

    return (
        <Formik
            initialValues={{email: '', mobile: '', country: '', city: '', address: '', postal: ''}}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                email: Yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format').required('Email is required'),
                mobile: Yup.string().matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/, 'Invalid mobile format. Example: +380501231212').required('Mobile is required'),
                country: Yup.string().required('Country is required').max(30, 'Must be 30 characters or less').matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁ\s'.,-]+$/u, 'Invalid country format'),
                city: Yup.string().required('City address is required').max(30, 'Must be 30 characters or less').matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁ\s'.,-]+$/u, 'Invalid city format'),
                address: Yup.string().required('Address is required').max(30, 'Must be 30 characters or less').matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁ0-9\s'.,-]+$/u, 'Invalid address format'),
                postal: Yup.string().required('Delivery postal is required').matches(/^[0-9]*$/, 'postal must contain only numbers').max(5, 'The maximum length of the postal is 5 characters'),
            })}>
            <Form className='form__user-address' noValidate>
                <Field
                    type='email'
                    placeholder='email'
                    name='email'
                    component={Input}
                />
                <Field
                    type='tel'
                    placeholder='mobile'
                    name='mobile'
                    component={Input}
                />
                <Field
                    type='text'
                    placeholder='country'
                    name='country'
                    component={Input}
                />
                <Field
                    type='text'
                    placeholder='city'
                    name='city'
                    component={Input}
                />
                <Field
                    type='text'
                    placeholder='address'
                    name='address'
                    component={Input}
                />
                <Field
                    type='number'
                    placeholder='postal'
                    name='postal'
                    component={Input}
                />
                <div>
                    <button className={styles['btn-send--order']} type="submit">Send</button>
                </div>
            </ Form>
        </Formik>
    )
}

OrderForm.propTypes = {
    cart: PropTypes.object
}