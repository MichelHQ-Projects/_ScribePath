import React, { useState } from "react";
import cn from "classnames";
import styles from "./ImagesAndCTA.module.sass";
import Card from "../../../components/Card";
import File from "../../../components/File";

const ImagesAndCTA = ({ className, setImageFile, setPreviewUrl }) => {

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
          tooltip="Attach an image to your note for better visualization. PNG & JPG supported."
          setImageFile={setImageFile} // ✅ Pass file to parent
          setPreviewUrl={setPreviewUrl} // ✅ Update preview
        />
      </div>
    </Card>
  );
};

export default ImagesAndCTA;
