import React, { useState } from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Icon from "../../../Icon";
import Modal from "../../../Modal";
import Share from "./Share";

const Panel = ({ className }) => {
  const [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <div className={cn(styles.panel, className)}>
        <div className={styles.avatar}>
          <img src="/images/content/avatar.jpg" alt="Avatar" />
        </div>
        <button className={styles.share} onClick={() => setVisibleModal(true)}>
          <Icon name="share" size="24" />
        </button>
      </div>
      <Modal
        outerClassName={styles.outer}
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
      >
        <Share />
      </Modal>
    </>
  );
};

export default Panel;
