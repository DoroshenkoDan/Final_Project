import React from 'react'
import PropTypes from 'prop-types';
import styles from './Input.module.scss'

export default function Input(props) {
    const {field, form, label, ...rest} = props;
    const {name} = field;

    return (
        <div className={styles['input-container']}>
            <label >
                <input {...field} {...rest} className={styles['form-input']} />
                {form.errors[name] && form.touched[name] &&
                    <div className={styles['text-error']}>{form.errors[name]}</div>}
            </label>
        </div>
    )
}

Input.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
};