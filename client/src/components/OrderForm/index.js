import React from 'react'
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {HOST} from "../Token";
import {useNavigate} from 'react-router-dom';
import Input from "../Input";
import styles from './OrderForm.module.scss'
import PropTypes from "prop-types";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../Redux/reducers/cartReducer";


export default function OrderForm(props) {
    const userStatus = useSelector((state) => state.store.user.status)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const getCart = async () => {
        try {
            const response = await axios.get(HOST + '/cart')
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
    const deleteCart = async () => {
        try {
            await axios.delete(HOST + '/cart')
        } catch (err) {
            console.log(err);
        }
    }

    const
    handleSubmit = async (orderInfo) => {
        if (userStatus) {
            const {email, mobile, country, city, address, postal} = orderInfo;
            const productsInCart = await getCart()
            const newOrder = {
                customerId: productsInCart.customerId._id,
                deliveryAddress: {
                    country: country,
                    city: city,
                    address: address,
                    postal: `${postal}`,
                },
                email: email,
                canceled: false,
                mobile: mobile,
                letterSubject: 'Thank you for order! You are welcome!',
                letterHtml: "<h1>Your order is placed.</h1>"
            }
            axios
                .post(HOST + "/orders", newOrder)
                .then(newOrder => {
                    props.changeOrderPlaced({status: true, massage: 'Thank you for order! You are welcome!'})
                })
                .catch(err => {
                    props.changeOrderPlaced({status: false, massage: 'The order has not been processed. Check that the entered data is correct and that you are logged in'})
                    console.log(err)
                });
            dispatch(clearCart())
            await deleteCart()
        } else {
            navigate('/login/');
        }
    }

    return (
        <>
            {
                props.orderPlaced.status === false &&
                <div className={styles['order__text-container']}>
                    <h1 className={`${styles['order-text']} ${styles['order-text--error']}`}> {props.orderPlaced.massage}
                    </h1>
                </div>
            }
                <div className={styles['order__text-container']}>
                    <h1 className={styles['order-text']}>Fill the required fields to order
                    </h1>
                </div>
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
            <Form className={styles['form__user-address']} noValidate>
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
                    type='text'
                    placeholder='postal'
                    name='postal'
                    component={Input}
                />
                <div className={styles['btn-container']}>
                    <button className={styles['btn-send--order']} type="submit">Send</button>
                </div>
            </ Form>
        </Formik>
        </>
    )
}

OrderForm.propTypes = {
    changeOrderPlaced: PropTypes.func,
    orderPlaced: PropTypes.object
}