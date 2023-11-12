import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CloseBtnIcon from "../Icons/CloseBtnIcon";
import styles from "./Toast.module.scss";

export default function Toast({ message, duration = 2500, onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 100 / (duration / 100));
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(interval);
      setIsVisible(false);
      onClose && onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return isVisible ? (
    <div className={styles.toast}>
      <span
        className={styles.btn__close}
        data-testid="btn-close"
        onClick={onClose}
      >
        <CloseBtnIcon></CloseBtnIcon>
      </span>
      <p className={styles.toast__message}>{message}</p>
      <div className={styles.toast__progress__bar} style={{ width: `${progress}%` }} />
    </div>
  ) : null;
}

Toast.propTypes = {
  message: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};
