import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // ✅ Import AuthContext
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./User.module.sass";
import Icon from "../../Icon";

const items = [
    {
        menu: [
            {
                title: "Profile",
                url: "/shop",
            },
            {
                title: "Edit profile",
                url: "/settings",
            },
        ],
    },
    {
        menu: [
            {
                title: "Administration",
                icon: "bar-chart",
                url: "/administration",
            },
            {
                title: "Invite Teammates",
                icon: "ticket",
                url: "/invite",
            },
            {
                title: "Teams",
                icon: "grid",
                url: "/teams",
            },
        ],
    },
    {
        menu: [
            {
                title: "Upgrade to Pro",
                icon: "leaderboard",
                color: true,
                url: "/upgrade-to-pro",
            },
        ],
    },
    {
        menu: [
            {
                title: "Account settings",
                url: "/settings",
            },
            {
                title: "Log out",
                action: "logout", // ✅ Add action to detect logout clicks
            },
        ],
    },
];

const User = ({ className }) => {
    const [visible, setVisible] = useState(false);
    const { pathname } = useLocation();
    const { logout } = useAuth(); // ✅ Get logout function
    const navigate = useNavigate(); // ✅ Redirect after logout

    const handleMenuClick = (item) => {
        if (item.action === "logout") {
            logout(); // ✅ Call Firebase logout
            navigate("/signin"); // ✅ Redirect user to Sign-in
        }
        setVisible(false);
    };

    return (
        <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
            <div
                className={cn(styles.user, className, {
                    [styles.active]: visible,
                })}
            >
                <button
                    className={styles.head}
                    onClick={() => setVisible(!visible)}
                >
                    <img src="/images/content/avatar.jpg" alt="Avatar" />
                </button>
                <div className={styles.body}>
                    {items.map((item, index) => (
                        <div className={styles.menu} key={index}>
                            {item.menu.map((x, index) =>
                                x.url ? (
                                    <NavLink
                                        className={cn(styles.item, {
                                            [styles.color]: x.color,
                                            [styles.active]: pathname === x.url,
                                        })}
                                        to={x.url}
                                        onClick={() => setVisible(false)}
                                        key={index}
                                    >
                                        {x.icon && (
                                            <Icon name={x.icon} size="24" />
                                        )}
                                        {x.title}
                                    </NavLink>
                                ) : (
                                    <button
                                        className={styles.item}
                                        onClick={() => handleMenuClick(x)}
                                        key={index}
                                    >
                                        {x.title}
                                    </button>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default User;
