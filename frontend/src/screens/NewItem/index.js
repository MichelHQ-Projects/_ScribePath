import React, { useState } from "react";
import styles from "./NewProduct.module.sass";
import { createNote } from "../../services/noteService";
import { useAuth } from "../../context/AuthContext";
import { convertToRaw } from "draft-js";

import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import ImagesAndCTA from "./ImagesAndCTA";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import Preview from "./Preview";
import Panel from "./Panel";

const API_URL = process.env.REACT_APP_API_BASE_URL 
    ? `${process.env.REACT_APP_API_BASE_URL}/api/notes`
    : 'http://localhost:5000/api/notes';

const NewProduct = () => {
    const { token } = useAuth();
    const [isEditing, setIsEditing] = useState(false); // ✅ Track if editing an existing item
    const [itemType, setItemType] = useState("Note"); // ✅ Track "Type of Item" selection
    const [visiblePreview, setVisiblePreview] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    //Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState(""); // ✅ Track uploaded image
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    const handleClearForm = () => {
        setTitle("");
        setDescription({});
        setCategory("");
        setTags([]);
        setItemType("Note"); // Reset type to default
    };

    const handleShareableLink = async () => {
        if (!title.trim() || !description.trim() || !category.trim()) {
            setError("Title, description, and category are required.");
            return;
        }
    
        const noteData = { title, content: description, category, tags };
        try {
            await createNote(noteData, token);
            const link = `${window.location.origin}/note/${title.replace(/\s+/g, "-").toLowerCase()}`;
            navigator.clipboard.writeText(link);
            setSuccess("Link copied & note saved!");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
    
        if (!token) {
            setError("User not authenticated"); // ✅ Ensure token exists
            setLoading(false);
            return;
        }
    
        if (itemType !== "Note") {
            setError("Only 'Note' is supported at this time.");
            setLoading(false);
            return;
        }

        // ✅ Extract plain text and full rich-text data
        let plainTextContent = "";
        let rawContent = null;

        if (description && description.getCurrentContent) {
            const contentState = description.getCurrentContent();
            plainTextContent = contentState.getPlainText();  // ✅ Store plain text
            rawContent = convertToRaw(contentState);  // ✅ Store full raw format
        }
    
        const noteData = {
            title,
            content: { raw: rawContent, text: plainTextContent },  // ✅ Store as object
            category,
            tags
        };
    
        try {
            const response = await createNote(noteData, token);
            if (!response) throw new Error("Failed to create note.");
    
            setSuccess("Note Created Successfully!");
            setIsEditing(true);
            handleClearForm(); // ✅ Reset form after success
    
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <NameAndDescription 
                            className={styles.card} 
                            setTitle={setTitle} 
                            setDescription={setDescription}
                            descriptionState={description}
                            selectedType={itemType} // ✅ Pass type selection
                            setSelectedType={setItemType} // ✅ Allow type change
                        />
                        <ImagesAndCTA 
                            className={styles.card} 
                            //Image handling
                        />
                        <CategoryAndAttibutes 
                            className={styles.card}
                            setCategory={setCategory} 
                            setTags={setTags}
                            token={token}
                        />
                    </div>
                    <div className={styles.col}>
                        <Preview
                            visible={visiblePreview}
                            onClose={() => setVisiblePreview(false)}
                            title={title} 
                            imageUrl={imageUrl}
                        />
                    </div>
                </div>
                <Panel
                    setVisiblePreview={setVisiblePreview}
                    setVisibleSchedule={setVisibleModal}
                    onSubmit={handleSubmit}
                    onClearForm={handleClearForm}
                    onGenerateLink={handleShareableLink}
                    loading={loading}
                    isEditing={isEditing}
                    itemType={itemType}
                />
                <TooltipGlodal />
                <Modal
                    visible={visibleModal}
                    onClose={() => setVisibleModal(false)}
                >
                    <Schedule
                        startDate={startDate}
                        setStartDate={setStartDate}
                        startTime={startTime}
                        setStartTime={setStartTime}
                    />
                </Modal>
                {/* ✅ Feedback UI */}
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>Note Created Successfully!</p>}
            </form>
        </>
    );
};

export default NewProduct;
