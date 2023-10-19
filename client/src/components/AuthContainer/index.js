import React, {useState} from 'react'
import styles from './AuthContainer.module.scss'
import RegisterForm from '../RegisterForm'
import SignInForm from '../SignInForm'
// import {useSelector} from "react-redux";
// import axios from "axios";
// import {HOST, refreshAccessToken, setAuthToken} from "../Token";


export default function AuthorithationPage() {
    const [activeBtn, setActiveBtn] = useState('Sign in')
    // const status = useSelector(state => state.user.status)
    // const data = useSelector(state => state.user.data)

    const setActiveBtnRegister = () => {
        setActiveBtn('Register')
    }
    const setActiveBtnSignIn = () => {
        setActiveBtn('Sign in')
    }

    // async function send() {
    //     const tokenRefresh = await refreshAccessToken(status, data);
    //     setAuthToken(tokenRefresh)
    //
    //     const newProduct = {
    //         name: "new product for testing purposes",
    //         currentPrice: 199.99,
    //         previousPrice: 250,
    //         categories: "men",
    //         imageUrls: [
    //             "img/products/men/001.png",
    //             "img/products/men/002.png",
    //             "img/products/men/003.png",
    //             "img/products/men/004.png"
    //         ],
    //         quantity: 100,
    //         color: "red",
    //         productUrl: "/men",
    //         brand: "braaaand",
    //         myCustomParam: "some string or json for custom param"
    //     };
    //     if (status === true) {
    //         axios
    //             .post(HOST + "/products", newProduct)
    //             .then(newProduct => {
    //                 console.log('ONO BLYAT', newProduct)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             });
    //     }
    // }

    return (
        <div className={styles['auth-wrapper']}>
            <div className={styles['auth-container']}>
                <h1 className={styles['auth-title']}>My account</h1>
                <div className={styles['btn-container']}>
                    <button
                        className={`${styles['auth-btn']} ${activeBtn === 'Sign in' && styles['auth-btn--active']}`}
                        onClick={setActiveBtnSignIn}
                    >Sign in
                    </button>
                    <button
                        className={`${styles['auth-btn']} ${activeBtn === 'Register' && styles['auth-btn--active']}`}
                        onClick={setActiveBtnRegister}
                    >Register
                    </button>
                </div>
                {
                    activeBtn === 'Register' &&
                    <div className={styles['form-container']}>
                        <RegisterForm></RegisterForm>
                    </div>
                }
                {
                    activeBtn === 'Sign in' &&
                    <div className={styles['form-container']}>
                        <SignInForm></SignInForm>
                    </div>

                }

                {/* eslint-disable spaced-comment */
                    /*<button onClick={send}>ТЕСТ</button>*/
                }
            </div>
        </div>
    )
}