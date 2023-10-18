import React from 'react'
import PropTypes from 'prop-types';

export default function Input(props) {
    const {field, form, label, ...rest} = props;
    const {name} = field;

    return (
        <div className="mt-2">
            <label >
                <input {...field} {...rest} className="form-control"/>
                {form.errors[name] && form.touched[name] &&
                    <div>{form.errors[name]}</div>}
            </label>
        </div>
    )
}

Input.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
};