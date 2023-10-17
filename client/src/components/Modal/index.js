import React, { useState } from 'react'
import styles from './Modal.module.scss'

export default function ModalWindow() {
  const [showModal, setShowModal] = useState(false)

  function handleBuyClick() {
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  return (
    <div className="cart-container">
      <button onClick={handleBuyClick}>Купити</button>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.closeButton} onClick={handleCloseModal}>
              &times;
            </span>
            Спасибо, наш менеджер свяжеться с Вами!
          </div>
        </div>
      )}
    </div>
  )
}
