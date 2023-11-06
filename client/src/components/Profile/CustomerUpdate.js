import React, {useEffect, useState} from 'react';
import styles from './Profile.module.scss'
import {SlTrash} from "react-icons/sl"
import { useSelector, useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from '../Profile/InputProfile';
import { HOST } from '../Token';
import axios from 'axios';
import { changeData } from '../../Redux/reducers/userReducers';


function CustomerUpdate() {
  const customer = useSelector((state) => state.store.user).data
  const [formStatus, setFormStatus] = useState({ type: null, message: '' })
  const dispatch = useDispatch()

  const handleSubmit = (updatedCustomer, { resetForm }) => {
    axios
      .put(HOST + '/customers', updatedCustomer)
      .then((savedCustomer) => {
        setFormStatus({
          type: 'success',
          message: 'You are successfully updated',
        })
        
       
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          const massageData = err.response.data
          const objectKey = Object.keys(massageData)[0]
          const errorMessage = massageData[objectKey]
          setFormStatus({
            type: 'error',
            message: `Update failed! ${errorMessage}`,
          })
        } else {          
          setFormStatus({
            type: 'error',
            message: 'Update failed due to an unknown error.',
          })
        }
      })
      useEffect(()=>{
        dispatch(changeData(updatedCustomer))
      },[])
    resetForm()
  }

  
    return (
      <>
      {formStatus.type !== null && (
        <p
          className={`${styles.form__message} ${
            formStatus.type === 'error' && styles.form__messageError
          }`}
        >
          {formStatus.message}
        </p>
      )}
      <Formik
        initialValues={{
          firstName: customer.firstName || '',
          lastName: customer.lastName || '',
          login: customer.login || '',
          email: customer.email || '',
          telephone: customer.telephone || '',     
        }}
        onSubmit={handleSubmit}
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
          <Field
            className={styles.profile__input}
            type="text"            
            name="firstName"
            component={Input}            
          />
          <p className={styles.profile__title}>Введите Фамилию</p>
          <Field
            className={styles.profile__input}
            type="text"
            placeholder="lastName"
            name="lastName"
            component={Input}
            
          />
          <p className={styles.profile__title}>Введите логин</p>
          <Field
            className={styles.profile__input}
            type="text"
            placeholder="login"
            name="login"
            component={Input}
            
          />
          <p className={styles.profile__title}>Email</p>
          <Field
            className={styles.profile__input}          
            type="email"
            placeholder="email"
            name="email"
            component={Input}           
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