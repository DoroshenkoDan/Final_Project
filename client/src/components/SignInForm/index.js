import React from 'react'
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import styles from './SignInForm.module.scss'
// import { HOST, setAuthToken} from "../Token";
import Input from "../Input";
// import {useDispatch} from "react-redux";
// import {changeData, changeStatusTrue, setToken} from "../../Redux/reducers/userReducers";
// import axios from "axios";

import { Login } from '../../Redux/reducers/customerReduser';

export default function OrderForm() {
    // const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const {loginOrEmail, password} = values;
        Login(loginOrEmail, password)
        

    }

    return (
        <Formik
            initialValues={{
                loginOrEmail: '',
                password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                loginOrEmail: Yup.string().required('Login or Email is required'),
                password: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Allowed characters for password is a-z, A-Z, 0-9.').required('Email is required').max(30, 'Password must be between 7 and 30 characters').min(7, 'Password must be between 7 and 30 characters'),
            })}>
            <Form className='form__user-address' noValidate>
                <Field
                    type='text'
                    placeholder='login or email'
                    name='loginOrEmail'
                    component={Input}
                />
                <Field
                    type='password'
                    placeholder='password'
                    name='password'
                    component={Input}
                />
                <div>
                    <button className={styles['btn-send']} type="submit">Send</button>
                </div>
            </ Form>
        </Formik>
    )
}