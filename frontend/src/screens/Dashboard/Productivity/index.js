import React from "react";
import styles from "./Productivity.module.sass";
import Card from "../../../components/Card";
import Item from "./Item";

const items = [
  {
    title: "25 Sep - 1 Oct",
    notes: {
      counter: 18,
      color: "#B5E4CA",
      value: 37.8,
    },
    tasks: {
      counter: 3,
      color: "#CABDFF",
      value: 37.8,
    },
    focus: {
      counter: 83,
      color: "#B1E5FC",
      value: -37.8,
    },
    scheduled: {
      counter: 16,
      color: "#FFD88D",
      value: -56,
    },
  },
  {
    title: "18 Sep - 24 Oct",
    notes: {
      counter: 6,
      color: "#EFEFEF",
      value: 37.8,
    },
    tasks: {
      counter: 12,
      color: "#EFEFEF",
      value: -37.8,
    },
    focus: {
      counter: 48,
      color: "#EFEFEF",
      value: 12.8,
    },
    scheduled: {
      counter: 7,
      color: "#EFEFEF",
      value: -14.1,
    },
  },
];

const Productivity = () => {

  return (
    <Card
      className={styles.card}
      title="Productivity"
      classTitle="title-green"
    >
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>Week</div>
          <div className={styles.col}>Notes</div>
          <div className={styles.col}>Task</div>
          <div className={styles.col}>Focus</div>
          <div className={styles.col}>Scheduled</div>
        </div>
        {items.map((x, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.col}>
              <div className={styles.label}>Week</div>
              {x.title}
            </div>
            <div className={styles.col}>
              <div className={styles.label}>Notes</div>
              <Item className={styles.item} item={x.notes} />
            </div>
            <div className={styles.col}>
              <div className={styles.label}>Tasks</div>
              <Item className={styles.item} item={x.tasks} />
            </div>
            <div className={styles.col}>
              <div className={styles.label}>Focus</div>
              <Item className={styles.item} item={x.focus} />
            </div>
            <div className={styles.col}>
              <div className={styles.label}>Scheduled</div>
              <Item className={styles.item} item={x.scheduled} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Productivity;
