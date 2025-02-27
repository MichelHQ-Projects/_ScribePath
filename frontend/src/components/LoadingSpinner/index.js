import React from "react";
import styles from "./LoadingSpinner.module.sass";

const LoadingSpinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingSpinner;
