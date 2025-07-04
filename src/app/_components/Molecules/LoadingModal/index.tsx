"use client"

import { Spinner } from '../../Atoms/Spinner';
import styles from './index.module.scss';

type Props = {
  open?: boolean
}

export const LoadingModal = (props: Props) => {
  if (!props.open) {
    return null
  }
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.loading}>
        <Spinner />
      </div>
    </>
  );
};
