import React, { useState } from "react";
import styles from "./Sidebar.module.sass";
import { Link, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import Icon from "../Icon";
import Theme from "../Theme";
import Dropdown from "./Dropdown";
import Help from "./Help";
import Image from "../Image";

const navigation = [
    {
        title: "Home",
        icon: "home",
        url: "/dashboard",
    },
    {
        title: "Activity",
        slug: "activity",
        icon: "diamond",
        add: true,
        dropdown: [
            {
                title: "Notes",
                url: "/activity/notes",
            },
            {
                title: "Tasks",
                url: "/activity/tasks",
                counter: "2",
                colorCounter: "#FFBC99",
            },
            {
                title: "Focus Mode",
                url: "/activity/focus",
            },
            {
                title: "Schedule",
                url: "/activity/schedule",
            },
            {
                title: "Categories & Tags",
                url: "/activity/filters",
                counter: "8",
                colorCounter: "#B5E4CA",
            },
        ],
    },
    {
        title: "Collaboration & Productivity",
        slug: "team",
        icon: "profile-circle",
        dropdown: [
            {
                title: "Shared Notes",
                url: "/team/notes",
            },
            {
                title: "Attachments",
                url: "/team/attachments",
            },
        ],
    },
    {
        title: "App Settings",
        icon: "setting",
        url: "/settings",
    },
];

const Sidebar = ({ className, onClose }) => {
    const [visibleHelp, setVisibleHelp] = useState(false);
    const [visible, setVisible] = useState(false);

    const { pathname } = useLocation();

    return (
        <>
            <div
                className={cn(styles.sidebar, className, {
                    [styles.active]: visible,
                })}
            >
                <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="24" />
                </button>
                <Link className={styles.logo} to="/" onClick={onClose}>
                    <Image
                        className={styles.pic}
                        src="/images/logo-dark.png"
                        srcDark="/images/logo-light.png"
                        alt="Core"
                    />
                </Link>
                <div className={styles.menu}>
                    {navigation.map((x, index) =>
                        x.url ? (
                            <NavLink
                                className={cn(styles.item, {
                                    [styles.active]: pathname === x.url,
                                })}
                                to={x.url}
                                key={index}
                                onClick={onClose}
                            >
                                <Icon name={x.icon} size="24" />
                                {x.title}
                            </NavLink>
                        ) : (
                            <Dropdown
                                className={styles.dropdown}
                                visibleSidebar={visible}
                                setValue={setVisible}
                                key={index}
                                item={x}
                                onClose={onClose}
                            />
                        )
                    )}
                </div>
                <button
                    className={styles.toggle}
                    onClick={() => setVisible(!visible)}
                >
                    <Icon name="arrow-right" size="24" />
                    <Icon name="close" size="24" />
                </button>
                <div className={styles.foot}>
                    <button
                        className={styles.link}
                        onClick={() => setVisibleHelp(true)}
                    >
                        <Icon name="help" size="24" />
                        Help & getting started
                        <div className={styles.counter}>8</div>
                    </button>
                    <Theme className={styles.theme} visibleSidebar={visible} />
                </div>
            </div>
            <Help
                visible={visibleHelp}
                setVisible={setVisibleHelp}
                onClose={onClose}
            />
            <div
                className={cn(styles.overlay, { [styles.active]: visible })}
                onClick={() => setVisible(false)}
            ></div>
        </>
    );
};

export default Sidebar;
