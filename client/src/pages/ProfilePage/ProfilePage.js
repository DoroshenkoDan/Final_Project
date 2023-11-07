import React, {useState} from 'react';
import CustomerUpdate from '../../components/Profile/UpdateProfile';
import PasswordUpdate from '../../components/Profile/UpdatePassword';

import styles from './ProfilePage.module.scss'
import OrderPage from '../OrderPage/OrderPage';


function ProfilePage() {
    const [showOrderPage, setShowOrderPage] = useState(false);

    const handleShowOrderPage = () => {
        setShowOrderPage(true);
    }
     return (
          <div className={styles.profile__container}>
            <div className={styles.profile__update}>
                <CustomerUpdate/>
                <PasswordUpdate/>
            </div>            
            <div className={styles.profile__order}>                
            <button className={styles.profile__btn} onClick={handleShowOrderPage}>
                    Your orders
                </button>
                {showOrderPage && <OrderPage />}
            </div>
        </div>          
    
    
     )
    
    
        
    
}

export default ProfilePage;