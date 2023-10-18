import React, {useState} from 'react'
import styles from './AuthorizationContainer.module.scss'

export default function AuthorithationPage() {
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
                <button
                    className={`${styles['auth-btn']} ${styles['auth-btn--sign']} ${activeBtn === 'Sign in' && styles['auth-btn--active']}`}
                    onClick={setActiveBtnSignIn}
                >Sign in
                </button>
                <button className={`${styles['auth-btn']} ${activeBtn === 'Register' && styles['auth-btn--active']}`}
                onClick={setActiveBtnRegister}
                >Register</button>
            </div>
        </div>
    )
}