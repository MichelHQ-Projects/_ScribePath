import React from "react";
import cn from "classnames";

import styles from "./PriorityAndCompletion.module.sass";

import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Schedule from "../../../components/Schedule";
import Switch from "../../../components/Switch";
import Tooltip from "../../../components/Tooltip"; // ✅ Ensure Tooltip is imported

const options = ["Low", "Medium", "High"];

const PriorityAndScheduling = ({ 
    className, 
    selectedPriority, 
    setSelectedPriority, 
    completed, 
    setCompleted, 
    startDate, 
    setStartDate, 
}) => {
    return (
        <Card className={cn(styles.card, className)} title="Priority & Scheduling" classTitle="title-green">
            <div className={styles.description}>
                <Schedule
                    className={styles.card}
                    startDate={startDate}
                    setStartDate={setStartDate}
                />
                <Dropdown
                    className={styles.field}
                    label="Priority"
                    tooltip="Select the level of priority of this task."
                    options={options}
                    value={selectedPriority} // ✅ Correct binding
                    setValue={setSelectedPriority} // ✅ Correct binding
                />
                <div className={styles.line}>
                    <div className={styles.info}>
                        Is This Task Completed? {" "}
                        <Tooltip className={styles.tooltip} title="Mark task as completed" icon="info" place="top" />
                    </div>
                    <Switch className={styles.switch} value={completed} onChange={() => setCompleted(!completed)} />
                </div>
            </div>
        </Card>
    );
};

export default PriorityAndScheduling;