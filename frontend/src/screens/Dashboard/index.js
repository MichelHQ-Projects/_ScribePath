import React from "react";
import styles from "./ProductsDashboard.module.sass";
import TooltipGlodal from "../../components/TooltipGlodal";
import Overview from "./Overview";
import Productivity from "./Productivity";
import ScheduleManagement from "./ScheduleManagement";
import DetailedOverview from "./DetailedOverview";

const Dashboard = () => {
    return (
        <>
            <div className={styles.section}>
                <Overview className={styles.card} />
                <div className={styles.row}>
                    <div className={styles.col}>
                        <Productivity />
                    </div>
                    <div className={styles.col}>
                        <ScheduleManagement />
                    </div>
                </div>
                <DetailedOverview />
            </div>
            <TooltipGlodal />
        </>
    );
};

export default Dashboard;
