import React, { useState } from "react";
import styles from "./Products.module.sass";
import cn from "classnames";
import Card from "../../../components/Card";
import Form from "../../../components/Form";
import Dropdown from "../../../components/Dropdown";
import Notes from "./Notes";
import Table from "./Table";

// data
import { tasks } from "../../../mocks/traffic";
import { meetings } from "../../../mocks/viewers";

const indicatorsTasks = [
  {
    title: "Due Today",
    color: "#FFBC99",
  },
  {
    title: "Due This Week",
    color: "#CABDFF",
  },
  {
    title: "Scheduled",
    color: "#B5E4CA",
  },
];

const indicatorsSchedule = [
  {
    title: "Due",
    color: "#B5E4CA",
  },
  {
    title: "Completed",
    color: "#CABDFF",
  },
];

const DetailedOverview = () => {
  const navigation = ["Notes", "Tasks", "Schedule"];

  const [activeTab, setActiveTab] = useState(navigation[0]);
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <Card
      className={styles.card}
      title="Detailed Overview"
      classTitle={cn("title-purple", styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <Form
            className={styles.form}
            value={search}
            setValue={setSearch}
            onSubmit={() => handleSubmit()}
            placeholder="Search"
            type="text"
            name="search"
            icon="search"
          />
          <div className={styles.control}>
            <button className={cn("button-stroke button-small", styles.button)}>
              Deleted
            </button>
            <button className={cn("button-stroke button-small", styles.button)}>
              Set status
            </button>
            <div className={styles.counter}>3 selected</div>
          </div>
          <div className={cn(styles.nav, "tablet-hide")}>
            {navigation.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: x === activeTab,
                })}
                onClick={() => setActiveTab(x)}
                key={index}
              >
                {x}
              </button>
            ))}
          </div>
          <div className={cn(styles.dropdown, "tablet-show")}>
            <Dropdown
              classDropdownHead={styles.dropdownHead}
              value={activeTab}
              setValue={setActiveTab}
              options={navigation}
              small
            />
          </div>
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          {activeTab === navigation[0] && <Notes />}
          {activeTab === navigation[1] && (
            <Table
              title="Tasks Status"
              items={tasks}
              legend={indicatorsTasks}
            />
          )}
          {activeTab === navigation[2] && (
            <Table title="Meetings" items={meetings} legend={indicatorsSchedule} />
          )}
        </div>
      </div>
    </Card>
  );
};

export default DetailedOverview;
