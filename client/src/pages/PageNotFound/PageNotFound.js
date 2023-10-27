import React from 'react';
import styles from './PageNotFound.module.scss';

export default function PageNotFound() {
  return (
    <div className={styles['not-found-container']}>
      <p className={styles['not-found-text']}>Page not found</p>
      {/* You can add more content or styling as needed */}
    </div>
  );
}
