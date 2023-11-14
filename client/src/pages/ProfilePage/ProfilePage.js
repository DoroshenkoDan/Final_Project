import React, {useState} from 'react';
import UpdateProfile from '../../components/Profile/UpdateProfile';
import UpdatePassword from '../../components/Profile/UpdatePassword';
import { NavLink } from 'react-router-dom'
import {PiNavigationArrowDuotone} from "react-icons/pi"
import Toast from '../../components/Toast';

import styles from './ProfilePage.module.scss'

function ProfilePage() {
    const [formStatus, setFormStatus] = useState({ type: null, message: '' });
    const [showToast, setShowToast] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);

    const handleStatus =()=>{
        setErrorStatus(true)
      }

  const handleButtonClick = () => {
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };


    console.log(formStatus.message);
  
     return (
            <>
                <div className={styles.profile__container}>
                    <div className={styles.profile__update}>
                        <NavLink to="/orders/">
                            <p className={styles.profile__link}>Your orders<PiNavigationArrowDuotone/></p>                            
                        </NavLink>
                        <UpdateProfile formStatus={formStatus} setFormStatus={setFormStatus} handleButtonClick={handleButtonClick} handleStatus={handleStatus}/>
                        <UpdatePassword formStatus={formStatus} setFormStatus={setFormStatus} handleButtonClick={handleButtonClick}/>
                    </div> 
                </div>                
                {showToast && <Toast message={formStatus.message} onClose={handleToastClose} errorStatus={errorStatus}/>} 

            </>
          
     )
}

export default ProfilePage;