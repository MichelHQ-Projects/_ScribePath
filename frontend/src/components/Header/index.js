import React, { useState } from "react";
import cn from "classnames";
import styles from "./Header.module.sass";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import Search from "./Search";
import Messages from "./Messages";
import Notification from "./Notification";
import User from "./User";

const Header = ({ onOpen }) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    onOpen();
    setVisible(false);
  };

  return (
    <header className={styles.header}>
      <button className={styles.burger} onClick={() => handleClick()}></button>
      <Search className={cn(styles.search, { [styles.visible]: visible })} />
      <button
        className={cn(styles.buttonSearch, { [styles.active]: visible })}
        onClick={() => setVisible(!visible)}
      >
        <Icon name="search" size="24" />
      </button>
      <div className={styles.control} onClick={() => setVisible(false)}>
        <Link className={cn("button", styles.button)} to="/item/create">
          <Icon name="add" size="24" />
          <span>Create</span>
        </Link>
        {/* <Messages className={styles.messages} />
        <Notification className={styles.notification} /> */}
        <User className={styles.user} />
      </div>
      {/* <div className={styles.btns}>
        <Link className={styles.link} to="/sign-in">
          Sign in
        </Link>
        <Link className={cn("button", styles.button)} to="/sign-up">
          Sign up
        </Link>
      </div> */}
    </header>
  );
};

export default Header;
