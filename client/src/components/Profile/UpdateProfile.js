import React, {useEffect, useState} from 'react';
import styles from './Profile.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import Input from './InputProfile';
import { HOST } from '../Token';
import axios from 'axios';
import { changeData } from '../../Redux/reducers/userReducers';


function UpdateProfile() {
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
        dispatch(changeData(updatedCustomer))
        
       
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
          avatarUrl: customer.avatarUrl || '',     
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
              <h2 className={styles.profile__title}>Profile photo</h2>              
              <div className={styles.profile__user}>
                 <img className={styles.profile__img} src={customer.avatarUrl}/>               
                <Field
                  className={styles.profile__input2}     
                  type="text"
                  placeholder="enter the image address"                        
                  name="avatarUrl"
                  component={Input}                              
                />                                       
              </div>
          <p className={styles.profile__info}>Maximum photo size 5MB</p>
          <h3 className={styles.profile__title__name}>Personal information</h3>
          <p className={styles.profile__title}>First name</p>          
          <Field
            className={styles.profile__input}
            type="text"            
            name="firstName"
            component={Input}            
          />
          <p className={styles.profile__title}>Last name</p>
          <Field
            className={styles.profile__input}
            type="text"
            name="lastName"
            component={Input}
            
          />
          <p className={styles.profile__title}>Login</p>
          <Field
            className={styles.profile__input}
            type="text"
            name="login"
            component={Input}
            
          />
          <p className={styles.profile__title}>Email</p>
          <Field
            className={styles.profile__input}          
            type="email"
            name="email"
            component={Input}           
          />          
          <div>
            <button className={styles.profile__btn2} type="submit">
            Save
            </button>
          </div>
          </div>
      </div>   
        </Form>        
      </Formik>
      </>
       
    );
}

export default UpdateProfile;