import React from 'react';
import styles from './Profile.module.scss'
import {SlTrash} from "react-icons/sl"
// import axios from 'axios'
import { getCustomer } from '../Token';



function Profile() {

    const customer = async () => {
    try {
      const persistRoot = await JSON.parse(localStorage.getItem('persist:root'));
      const user = await JSON.parse(persistRoot.user);
      const response = await getCustomer(user.token);
      return response.data;
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  }

  const user1 =[]

  const customerPromise = customer();
  

  customerPromise.then((data) => {
    user1.push(data);
  });

  console.log(user1);
 
//  const getCustomer = async () => {
//          const persistRoot = JSON.parse(localStorage.getItem('persist:root'))
//         const user = JSON.parse(persistRoot.user)    
//         setAuthToken(user.token)
//         const response = await axios.get(HOST + '/customers/customer')
        
//             return response.data;
                 
        
//       }

      

    //   console.log(getCustomer());
   
    // useEffect(()=>{
              
    //   getCustomer()
    // }, [])

    // console.log(customer);
   



    return (
        <div className={styles.profile}>
            <div className={styles.profile__container}>                
                <div className={styles.profile__content}>
                    <h2 className={styles.profile__title}>Фото профиля</h2>
                    <div className={styles.profile__user}>
                        <img className={styles.profile__img} src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'/>
                        <button className={styles.profile__btn}>Выберите файл</button>
                        <p className={styles.profile__icon}><SlTrash/></p>                        
                    </div>
                    <p className={styles.profile__info}>Максимальный размер фото 5МБ</p>
                    <h3 className={styles.profile__title}>Лична\ информация</h3>
                    <p className={styles.profile__title}>Мщу имя</p>
                    <input className={styles.profile__input} placeholder='Введите имя' type='text'/>
                    <p className={styles.profile__title}>Email</p>
                    <input className={styles.profile__input} placeholder='Введите email' type='tel'/>
                    <p className={styles.profile__title}>Введите номер телефона</p>
                    <input className={styles.profile__input} placeholder='Введите номер телефона' type='text'/>
                    <button className={styles.profile__btn2}>Сохранить</button>
                    <h3 className={styles.profile__title}>Изменение пароля</h3>
                    <p className={styles.profile__title}>Тукущий пароль</p>
                    <input className={styles.profile__input} placeholder='Пароль' type='password'/>
                    <p className={styles.profile__title}>Новый пароль</p>
                    <input className={styles.profile__input} placeholder='Пароль' type='password'/>
                    <p className={styles.profile__title}>Подтвердите пароль</p>
                    <input className={styles.profile__input} placeholder='Пароль' type='password'/>
                    <button className={styles.profile__btn2}>Сохранить</button>
                    <h3 className={styles.profile__title}>Удалить профиль</h3>
                    <p className={styles.profile__remove}><span className='profile__remove-icon'><SlTrash/></span>Удалить профиль</p>
                </div>
            </div>            
        </div>
    );
}

export default Profile;