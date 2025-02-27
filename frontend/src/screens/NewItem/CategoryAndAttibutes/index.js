import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./CategoryAndAttibutes.module.sass";
import Card from "../../../components/Card";
import Dropdown from "../../../components/Dropdown";
import Tooltip from "../../../components/Tooltip";
import TextInput from "../../../components/TextInput";
import Icon from "../../../components/Icon";
import { WithContext as ReactTags } from "react-tag-input";
import {getCategories,createCategory} from "../../../services/categoryService";

const MAX_TAGS = 5;

const optionsCategory = ["Select category", "Create a new category"];

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

const CategoryAndAttibutes = ({ className, setCategory, setTags, token }) => {
  const [category, setCategoryState] = useState(optionsCategory[0]);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [tags, setTagsState] = useState([{ id: "Work", text: "Work" }]);

  // ✅ Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories(token);
      if (data.length > 0) {
        setCategories(data.map((cat) => cat.name));
        setCategoryState("Select category"); // ✅ Default to dropdown
      } else {
        setIsCreatingCategory(true); // ✅ Default to input field if no categories exist
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCategoryChange = (selectedValue) => {
    if (selectedValue === "Create a new category") {
      setIsCreatingCategory(true);
      setNewCategory("");
    } else {
      setIsCreatingCategory(false);
      setCategoryState(selectedValue);
      setCategory(selectedValue);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return;

    try {
        if (!token) throw new Error("User not authenticated"); // ✅ Ensure token exists

        const category = await createCategory(newCategory, token); // ✅ Use token correctly

        setCategories((prev) => [...prev, category.name]); // ✅ Add new category
        setCategoryState(category.name); // ✅ Set category state
        setCategory(category.name);
        setNewCategory("");
        setIsCreatingCategory(false); // ✅ Switch back to dropdown
    } catch (error) {
        console.error("Failed to create category:", error.message);
    }
};

  const handleAddition = (tag) => {
    if (tags.length < MAX_TAGS) {
      setTagsState([...tags, tag]);
      setTags([...tags, tag.text]); // Ensure parent state updates as well
    }
  };

  const handleDelete = (i) => {
    const updatedTags = tags.filter((tag, index) => index !== i);
    setTagsState(updatedTags);
    setTags(updatedTags.map((tag) => tag.text)); // Update parent state
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTagsState(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTagsState([]);
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTagsState(updatedTags);
  };

  return (
    <Card className={cn(styles.card, className)} title="Category & Tags" classTitle="title-purple">
      <div className={styles.images}>
        {/* ✅ If no categories exist, default to text input */}
        {isCreatingCategory ? (
          <div className={styles.inputWrapper}>
          <TextInput
            className={styles.field}
            label="Category"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            button={
              <div onClick={handleCreateCategory}>
                <span>Create</span> <Icon name="arrow-right" size="24" />
              </div>
            }
          />
        </div>
        ) : (
          <Dropdown
            className={styles.field}
            label="Category"
            tooltip="Maximum 100 characters. No HTML or emoji allowed"
            value={category}
            setValue={handleCategoryChange}
            options={[...categories, "Create a new category"]}
          />
        )}
        <div className={styles.head}>
          <div className={styles.label}>
            Tags{" "}
            <Tooltip className={styles.tooltip} title="Maximum 100 characters. No HTML or emoji allowed" icon="info" place="right" />
          </div>
          <div className={styles.counter}>
            <span>{tags.length}</span>/5 tags
          </div>
        </div>
        <div className={styles.tags}>
          <ReactTags
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            delimiters={delimiters}
            handleTagClick={handleTagClick}
            onClearAll={onClearAll}
            onTagUpdate={onTagUpdate}
            suggestions={[{ id: "1", text: "Work" }]}
            placeholder="Enter tags to describe your item"
            minQueryLength={2}
            maxLength={20}
            autofocus={false}
            allowDeleteFromEmptyInput={true}
            autocomplete={true}
            readOnly={false}
            allowUnique={true}
            allowDragDrop={true}
            inline={true}
            inputFieldPosition="inline"
            allowAdditionFromPaste={true}
            editable={true}
            clearAll={true}
            tags={tags}
          />
        </div>
      </div>
    </Card>
  );
};

export default CategoryAndAttibutes;