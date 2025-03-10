import React from "react";
import styles from "./TooltipGlodal.module.sass";
import { Tooltip as ReactTooltip } from "react-tooltip";

const TooltipGlodal = () => {
    return (
        <ReactTooltip
            id="global-tooltip"
            className={styles.tooltipWpapper}
            effect="solid"
            border={true}
            borderColor="rgba(255, 255, 255, 0.12)"
            backgroundColor="#272B30"
            textColor="#F4F4F4"
        />
    );
};

export default TooltipGlodal;
