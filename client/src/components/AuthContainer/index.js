import React, {useState} from 'react'
import styles from './AuthContainer.module.scss'
import RegisterForm from '../RegisterForm'
import SignInForm from '../SignInForm'


export default function AuthPage() {
    const [activeBtn, setActiveBtn] = useState('Sign in')

    const setActiveBtnRegister = () => {
        setActiveBtn('Register')
    }
    const setActiveBtnSignIn = () => {
        setActiveBtn('Sign in')
    }

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
                        <RegisterForm setActiveBtnSignIn={setActiveBtnSignIn}></RegisterForm>
                    </div>
                }
                {
                    activeBtn === 'Sign in' &&
                    <div className={styles['form-container']}>
                        <SignInForm></SignInForm>
                    </div>

                }
            </div>
        </div>
    )
}