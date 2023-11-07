import React from 'react';
import CustomerUpdate from '../../components/Profile/CustomerUpdate';
import PasswordUpdate from '../../components/Profile/PasswordUpdate';
import { NavLink } from 'react-router-dom';
import styles from './ProfilePage.module.scss'

function ProfilePage() {
     return (
          <div className={styles.profile__container}>
            <div className={styles.profile__update}>
                <CustomerUpdate/>
                <PasswordUpdate/>
            </div>            
            <div className=''>
                <NavLink to="/orders/" className={styles.profile__order}>
                    <button className={styles.profile__btn}>Your orders</button>
                </NavLink>
            </div>
        </div>          
    
    
     )
    
    
        
    
}

export default ProfilePage;