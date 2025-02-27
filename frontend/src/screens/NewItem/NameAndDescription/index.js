import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./NameAndDescription.module.sass";
import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";


const options = ["Note", "Task", "Project"];

const NameAndDescription = ({ className, setTitle, descriptionState, setDescription, selectedType, setSelectedType}) => {
    return (
        <Card
            className={cn(styles.card, className)}
            title="Title & Description"
            classTitle="title-green"
            head={
                <Link
                    className={cn("button-stroke button-small", styles.button)}
                    to="/dashboard"
                >
                    <Icon name="arrow-left" size="24" />
                    <span>Back</span>
                </Link>
            }
        >
            <div className={styles.description}>
                <TextInput
                    className={styles.field}
                    label="Title"
                    name="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)} 
                    tooltip="Maximum 100 characters. No HTML or emoji allowed"
                    required
                />
                <Editor
                    classEditor={styles.editor}
                    label="Description"
                    state={descriptionState}
                    onChange={setDescription}
                    tooltip="Description"
                />
                <Dropdown
                    className={styles.field}
                    label="Type of Item"
                    tooltip="Select whether this is a Note, Task, or Project"
                    options={options}
                    value={selectedType} // ✅ Bind state to value
                    setValue={setSelectedType} // ✅ Update selected type on change
                    required
                />
            </div>
        </Card>
    );
};

export default NameAndDescription;
