import React, { useState } from "react";
import styles from "./Schedule.module.sass";
import cn from "classnames";
import Item from "./Item";
import Icon from "../Icon";
import Tooltip from "../Tooltip"; // ✅ Ensure Tooltip is imported
import DatePicker from "react-datepicker";
import { format } from "date-fns";

const Schedule = ({
  className,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
}) => {
  const [visibleDate, setVisibleDate] = useState(false);
  const [visibleTime, setVisibleTime] = useState(false);

  const handleClick = () => {
    setStartDate(null);
    setTimeout(() => setStartDate(new Date()), 10);
    setVisibleDate(false);
  };

  return (
    <div className={cn(styles.schedule, className)}>
      <div className={styles.title}>
        Due Date {" "}
      <Tooltip className={styles.tooltip} title="Mark task as completed" icon="info" place="top" />
      </div>
      <div className={styles.list}>
        <Item
          className={styles.item}
          category="Date"
          icon="calendar"
          value={startDate && format(startDate, "MMMM dd, yyyy")}
          visible={visibleDate}
          setVisible={setVisibleDate}
        >
          <div className={styles.date}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormatCalendar={"MMMM yyyy"}
              inline
            />
            <div className={styles.foot}>
              <button
                className={cn("button-stroke button-small", styles.button)}
                type="button"
                onClick={() => handleClick()}
              >
                Clear
              </button>
              <button
                className={cn("button-small", styles.button)}
                type="button"
                onClick={() => setVisibleDate(false)}
              >
                Close
              </button>
            </div>
          </div>
        </Item>
      </div>
    </div>
  );
};

export default Schedule;
