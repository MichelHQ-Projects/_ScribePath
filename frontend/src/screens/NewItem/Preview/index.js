import React from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";

const Preview = ({ visible, onClose, title, imageUrl }) => {

  if (!visible) return null;
  
  return (
    <div className={cn(styles.preview, { [styles.visible]: visible })}>
      <Card
        className={styles.card}
        classCardHead={styles.head}
        title="Preview"
        classTitle="title-blue"
        head={
          <button type="button" className={styles.button} onClick={onClose}>
            <Icon name="close" size="24" />
          </button>
        }
      >
        <div className={styles.body}>
          <div className={styles.photo}>
            <img src={imageUrl || "/images/content/photo-1.jpg"} alt="Product" />
          </div>
          <div className={styles.line}>
            <div className={styles.title}>
            {title || "Untitled Note"} {/* Default if empty */}
            </div>
          </div>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <img src="/images/content/avatar.jpg" alt="Avatar" />
            </div>
            <div className={styles.text}>
              by <span>Hortense</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Preview;
