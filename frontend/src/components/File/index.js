import React from "react";
import cn from "classnames";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./File.module.sass";
import Icon from "../Icon";
import Tooltip from "../Tooltip";

const File = ({ className, label, tooltip, title, setImageFile,setPreviewUrl }) => {
  const [fileName, setFileName] = React.useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validarte file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("⚠️ Invalid file type. Only JPG, PNG, and WEBP are allowed.", {
        position: "bottom-left",
        autoClose: 5000,
    });
    return;
    }
    if (file.size > 1024 * 1024 * 5) {
      toast.error("⚠️ File too large. Max size is 5MB.", {
        position: "bottom-left",
        autoClose: 4000,
    });
    return;
    }

    setImageFile(file);
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));

    toast.success("✅ Image selected successfully!", {
      position: "bottom-left",
      autoClose: 3000,
    });
  };
  
  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <div className={styles.label}>
          {label}{" "}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div className={styles.wrap}>
        <input className={styles.input} type="file" onChange={handleFileChange} />
        <div className={styles.box}>
          <Icon name="upload" size="24" />
          {title}
        </div>
      </div>
    </div>
  );
};

export default File;
