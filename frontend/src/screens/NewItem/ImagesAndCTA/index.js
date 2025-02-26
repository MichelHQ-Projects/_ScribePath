import React, { useState } from "react";
import cn from "classnames";
import styles from "./ImagesAndCTA.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";

const ImagesAndCTA = ({ className }) => {

  return (
    <Card
      className={cn(styles.card, className)}
      title="Image"
      classTitle="title-blue"
    >
      <div className={styles.images}>
        <File
          className={styles.field}
          title="Click or drop image"
          label="Cover images"
          tooltip="Maximum 100 characters. No HTML or emoji allowed"
        />
      </div>
    </Card>
  );
};

export default ImagesAndCTA;
