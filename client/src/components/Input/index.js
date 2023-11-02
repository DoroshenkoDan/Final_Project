import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'
import ShowPasswordIcon from '../Icons/ShowPasswordIcon'
import HiddenPasswordIcon from "../Icons/HiddenPasswordIcon";
import InputMask from 'react-input-mask';

export default function Input(props) {
    const [visibilityPassword, setVisibilityPassword] = useState(false)
    const {field, form, ...rest} = props
    const {name} = field

    const toggleVisibilityPassword = () => {
        setVisibilityPassword(prevState => !prevState)
    }

    return (
        <div className={styles['input-container']}>
            <label>
                {field.name === 'telephone' &&
                    <InputMask
                        mask="+380999999999"
                        maskChar="_"
                        {...field}
                        {...rest}
                        type="tel"
                        className={styles['form-input']}
                    />
                }
                {field.name !== 'telephone' &&
                    <input {...field} {...rest}
                           type={((field.name === 'password' || field.name === 'repeatPassword') && !visibilityPassword) ? 'password' : 'text'}
                           className={styles['form-input']}/>}
                {(field.name === 'password' || field.name === 'repeatPassword') && !visibilityPassword &&
                    <span className={styles['icon-password']}
                          onClick={toggleVisibilityPassword}>
                        <ShowPasswordIcon/>
                    </span>
                }
                {(field.name === 'password' || field.name === 'repeatPassword') && visibilityPassword &&
                    <span className={styles['icon-password']}
                          onClick={toggleVisibilityPassword}>
                        <HiddenPasswordIcon/>
                    </span>
                }
                {form.errors[name] && form.touched[name] && (
                    <div className={styles['text-error']}>{form.errors[name]}</div>
                )}
            </label>
        </div>
    )
}

Input.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
}
