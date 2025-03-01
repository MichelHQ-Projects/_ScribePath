import React from "react";
import cn from "classnames";
import styles from "./Panel.module.sass";
import Actions from "../../../components/Actions";

const Panel = ({
  setVisiblePreview,
  setVisibleSchedule,
  onSubmit,
  onClearForm,
  onGenerateLink,
  loading,
  isEditing,
  itemType
}) => {

  
  const actions = [
    // ✅ Show "Schedule Task" only if itemType is "Task"
    ...(itemType === "Task"
        ? [
            {
                title: "Schedule Task",
                icon: "calendar",
                action: () => setVisibleSchedule(true),
            }
        ]
        : []),
      {},
    {
        title: "Save & Share",
        icon: "link",
        action: onGenerateLink, // ✅ Generates link & saves
    },
    {
      title: "Preview",
      icon: "expand",
      action: () => setVisiblePreview(true),
  },
    {
        title: "Clear",
        icon: "close",
        action: onClearForm, // ✅ Clears the form
    },
];

  return (
    <div className={cn("panel", styles.panel)}>
      {/* ✅ Only show "Last Saved" if editing */}
      {isEditing ? (
        <div className={styles.info}>Last saved <span>Oct 4, 2021 - 23:32</span></div>
    ) : (
        <div className={styles.info}>Don't forget to save! <span>Avoid losing your progress!</span></div>
    )}
      <div className={styles.btns}>
        {/* ✅ "Save" button triggers form submission */}
        <button className={cn("button", styles.button)} onClick={onSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Note"}
        </button>
        <Actions
          className={styles.actions}
          classActionsHead={styles.actionsHead}
          classActionsBody={styles.actionsBody}
          classActionsOption={styles.actionsOption}
          items={actions}
          up
        />
      </div>
    </div>
  );
};

export default Panel;
