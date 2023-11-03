import React from 'react'
import styles from './Modal.module.scss'
import CloseBtnIcon from '../Icons/CloseBtnIcon'
import PropTypes from 'prop-types'

export default function Modal({
  title,
  closeButton,
  closeModal,
  text,
  actionBtn,
  cancelBtn,
  removeOrder,
}) {
  return (
    <div className={styles.container} onClick={closeModal}>
      <div className={styles.modal}>
        {closeButton && (
          <span className={styles.btn__close} onClick={closeModal}>
            <CloseBtnIcon></CloseBtnIcon>
          </span>
        )}
        <h3 className={styles.modal__title}>{title}</h3>
        <div className={styles.modal__text}>{text}</div>
        <div className={styles.modal__btn}>
          <button className={styles.modal__btn__confirm} onClick={removeOrder}>
            {actionBtn}
          </button>
          <button className={styles.modal__btn__cancel} onClick={closeModal}>
            {cancelBtn}
          </button>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  closeButton: PropTypes.func,
  closeModal: PropTypes.func,
  actionBtn: PropTypes.string,
  cancelBtn: PropTypes.string,
  removeOrder: PropTypes.func,
}
