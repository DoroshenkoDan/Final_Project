import React from 'react';
import CustomerUpdate from '../../components/Profile/UpdateProfile';
import PasswordUpdate from '../../components/Profile/UpdatePassword';
import { NavLink } from 'react-router-dom'
import {PiNavigationArrowDuotone} from "react-icons/pi"

import styles from './ProfilePage.module.scss'
// import OrderPage from '../OrderPage/OrderPage';


function ProfilePage() {
    // const [showOrderPage, setShowOrderPage] = useState(false);

    // const handleShowOrderPage = () => {
    //     setShowOrderPage(true);
    // }
     return (
          <div className={styles.profile__container}>
            <div className={styles.profile__update}>
            <NavLink to="/orders/">
                            <p className={styles.profile__link}>Your orders<PiNavigationArrowDuotone/></p>                            
                        </NavLink>
                <CustomerUpdate/>
                <PasswordUpdate/>
            </div>            
            {/* <div className={styles.profile__order}>                
            <button className={styles.profile__btn} onClick={handleShowOrderPage}>
                    Your orders
                </button>
                {showOrderPage && <OrderPage />}
            </div> */}
        </div>          
    
    
     )
    
    
        
    
}

export default ProfilePage;