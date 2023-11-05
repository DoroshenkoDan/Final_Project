import React from 'react';
import styles from './Profile.module.scss'
import {SlTrash} from "react-icons/sl"
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik'
import * as Yup from 'yup'


function CustomerUpdate() {

  const customer = useSelector((state) => state.store.user).data

  
    return (
      <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          login: '',
          email: '',
          password: '',
          telephone: '',          
        }}
        // onSubmit={handleSubmit}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .min(2, 'Must be more than 1 characters')
            .required('Firstname is required')
            .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid firstname format'),
          lastName: Yup.string()
            .max(25, 'Must be 25 characters or less')
            .min(2, 'Must be more than 1 character')
            .required('Lastname is required')
            .matches(/^[^\p{P}\p{S}\d]+$/u, 'Invalid lastname format'),
          login: Yup.string()
            .max(10, 'Login must be between 3 and 10 characters')
            .min(3, 'Login must be between 3 and 10 characters')
            .matches(/^[a-zA-Z0-9]+$/, 'Invalid login format')
            .required('Email is required'),
          email: Yup.string()
            .matches(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Invalid email format',
            )
            .required('Email is required'),
          password: Yup.string()
            .matches(
              /^[a-zA-Z0-9]+$/,
              'Allowed characters for password is a-z, A-Z, 0-9.',
            )
            .required('Email is required')
            .max(30, 'Password must be between 7 and 30 characters')
            .min(7, 'Password must be between 7 and 30 characters'),
          telephone: Yup.string()
            .matches(
              /^\+380\d{3}\d{2}\d{2}\d{2}$/,
              'That is not a valid phone number. Example valid form number: +380501234567',
            )
            .required('Mobile is required'),  
          
        })}
      >
        <Form className={styles.profile} noValidate>
          <div className={styles.profile__container}>                
            <div className={styles.profile__content}>
              <h2 className={styles.profile__title}>Фото профиля</h2>
              <div className={styles.profile__user}>
                <img className={styles.profile__img} src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D'/>
                <button className={styles.profile__btn}>Выберите файл</button>
                <p className={styles.profile__icon}><SlTrash/></p>                        
              </div>
          <p className={styles.profile__info}>Максимальный размер фото 5МБ</p>
          <h3 className={styles.profile__title}>Личная информация</h3>
          <p className={styles.profile__title}>Мое имя</p>          
          <input
            defaultValue={customer.firstName}
            className={styles.profile__input}
            type="text"            
            name="firstName"
            
          />
          <p className={styles.profile__title}>Введите Фамилию</p>
          <input
            defaultValue={customer.lastName} 
            className={styles.profile__input}
            type="text"
            placeholder="lastName"
            name="lastName"
            
          />
          <p className={styles.profile__title}>Введите логин</p>
          <input
            defaultValue={customer.login} 
            className={styles.profile__input}
            type="text"
            placeholder="login"
            name="login"
            
          />
          <p className={styles.profile__title}>Email</p>
          <input
            defaultValue={customer.email} 
            className={styles.profile__input}          
            type="email"
            placeholder="email"
            name="email"
           
          />
          <p className={styles.profile__title}>Введите номер телефона</p>
          <input
            defaultValue={customer.telephone} 
            className={styles.profile__input}
            type="tel"
            placeholder="telephone"
            name="telephone"
            
          />          
          <div>
            <button className={styles.profile__btn2} type="submit">
              Send
            </button>
          </div>
          </div>
      </div>   
        </Form>        
      </Formik>
      </>
       
    );
}

export default CustomerUpdate;