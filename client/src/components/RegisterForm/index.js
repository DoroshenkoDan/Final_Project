import React from 'react'
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';

import Input from "../Input";

export default function OrderForm() {

    const handleSubmit = (orderInfo) => {
        const {firstname, lastname, age, email, country, city, address, postal, mobile} = orderInfo;
        console.log(firstname, lastname, age, email, country, city, address, postal, mobile, orderInfo)
    }

    return (
        <Formik
            initialValues={{firstname: '', lastname: '', age: '',email:'', country:'',city:'',address: '', postal:'', mobile: ''}}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                firstname: Yup.string().max(15, 'Must be 15 characters or less').required('Firstname is required').matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid firstname format'),
                lastname: Yup.string().max(20, 'Must be 20 characters or less').required('Lastname is required').matches(/^[^\p{P}\p{S}\d]+$/u,'Invalid lastname format'),
                age: Yup.number().integer('Age must be an integer').min(0, 'Age cannot be less than 0').max(130, 'The age cannot be that great. Enter your real age').required('Age is required'),
                email: Yup.string().matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Invalid email format').required('Email is required'),
                country: Yup.string().required('Country is required').max(30, 'Must be 30 characters or less').matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁ\s'.,-]+$/u, 'Invalid country format'),
                city: Yup.string().required('City address is required').max(30, 'Must be 30 characters or less').matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁ\s'.,-]+$/u, 'Invalid city format'),
                address: Yup.string().required('Address is required').max(30, 'Must be 30 characters or less').matches(/^[a-zA-Zа-яА-ЯїЇіІєЄёЁ0-9\s'.,-]+$/u, 'Invalid address format'),
                postal: Yup.string().required('Delivery postal is required').matches(/^[0-9]*$/, 'postal must contain only numbers').max(5, 'The maximum length of the postal is 5 characters'),
                mobile: Yup.string().matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/, 'Invalid mobile format. Example: +0501231212').required('Mobile is required'),
            })}>
            <Form className='form__user-address' noValidate>
                <Field
                    type='text'
                    placeholder='firstname'
                    name='firstname'
                    component={Input}
                />
                <Field
                    type='text'
                    placeholder='lastname'
                    name='lastname'
                    component={Input}
                />
                <Field
                    type='number'
                    placeholder='age'
                    name='age'
                    component={Input}
                />
                <Field
                    type='email'
                    placeholder='email'
                    name='email'
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
                <Field
                    type='tel'
                    placeholder='mobile'
                    name='mobile'
                    component={Input}
                />
                <div>
                    <button type="submit">Send</button>
                </div>
            </ Form>
        </Formik>
    )
}