"use client"

import { Spinner } from '../../Atoms/Spinner';
import styles from './index.module.scss';

export const LoadingModal = () => {
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.loading}>
        <Spinner />
      </div>
    </>
  );
};
