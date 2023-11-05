import React from 'react';
import styles from './Profile.module.scss'
import {SlTrash} from "react-icons/sl"
import { useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from '../Input';




function PasswordUpdate() {

  const customer = useSelector((state) => state.store.user).data

  
    return (
      <>
    <Formik
        initialValues={{
          password: '',
          newPassword: ''         
        }}
        // onSubmit={handleSubmit}
        validationSchema={Yup.object({          
          password: Yup.string()
            .matches(
              /^[a-zA-Z0-9]+$/,
              'Allowed characters for password is a-z, A-Z, 0-9.',
            )
            .required('Email is required')
            .max(30, 'Password must be between 7 and 30 characters')
            .min(7, 'Password must be between 7 and 30 characters'),
          
        })}
      >
        <Form className={styles.profile} noValidate>
          <div className={styles.profile__container}>                
            <div className={styles.profile__content}>
                <h3 className={styles.profile__title}>Изменение пароля</h3>
                <p className={styles.profile__title}>Тукущий пароль</p>
                <Field
                    // defaultValue={customer.password} 
                    className={styles.profile__input}
                    type="password"
                    placeholder={customer.password}
                    name="password"
                    component={Input}           
                />
                <p className={styles.profile__title}>Новый пароль</p>
                <Field
                    defaultValue={customer.password} 
                    className={styles.profile__input}
                    type="password"
                    // placeholder="password"
                    name="password"
                    component={Input}           
                />
                <p className={styles.profile__title}>Подтвердите пароль</p>
                <Field
                    defaultValue={customer.password} 
                    className={styles.profile__input}
                    type="password"
                    // placeholder="password"
                    name="password"
                    component={Input}           
                />
                <button className={styles.profile__btn2} type="submit">
              Send
            </button>
            <h3 className={styles.profile__title}>Удалить профиль</h3>
            <p className={styles.profile__remove}><span className='profile__remove-icon'><SlTrash/></span>Удалить профиль</p>                                
            </div>
            </div>   
        </Form>        
      </Formik>
      </>
       
    );
}

export default PasswordUpdate;