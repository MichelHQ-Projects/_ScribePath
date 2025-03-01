import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import { EditorState } from "draft-js";

import styles from "./NameAndDescription.module.sass";

import Card from "../../../components/Card";
import Icon from "../../../components/Icon";
import TextInput from "../../../components/TextInput";
import Editor from "../../../components/Editor";
import Dropdown from "../../../components/Dropdown";


const options = ["Note", "Task", "Project"];

const NameAndDescription = ({ className, title, setTitle, descriptionState, setDescription, selectedType, setSelectedType}) => {

    const handleEditorChange = (newState) => {
        if (newState instanceof EditorState) {
            setDescription(newState); // ✅ Ensure only valid `EditorState` is set
        }
    };

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    tooltip="Give your note a clear and concise title. Maximum 100 characters."
                    required
                />
                <Editor
                    classEditor={styles.editor}
                    label="Description"
                    state={descriptionState}
                    onChange={handleEditorChange}
                    tooltip="Write the details of your note here. Supports rich text formatting."
                    placeholder="Write your description here..." 
                    required
                />
                <Dropdown
                    className={styles.field}
                    label="Type of Item"
                    tooltip="Select whether this is a Note, Task, or Project."
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
