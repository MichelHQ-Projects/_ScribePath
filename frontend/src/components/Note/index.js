import React from "react";
import cn from "classnames";
import styles from "./Note.module.sass";
import Control from "./Control";
import Icon from "../Icon";

const Note = ({
    className,
    item,
    onChange,
}) => {


    return (
        <div
            className={cn(styles.product, className)}
        >
            <div className={styles.preview}>
                <Control className={styles.control} />
                <img
                    srcSet={`${item.image2x} 2x`}
                    src={item.image}
                    alt="Note Image"
                />
            </div>
            <div className={styles.line}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.rating}>{item.ratingValue}</div>
            </div>
           
                <div className={styles.date}>
                    <Icon name="clock" size="24" /> {item.date}
                </div>
        </div>
    );
};

export default Note;
