import React, { useState } from "react";
import { createNote } from "../../services/noteService";
import { createTask } from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";
import { convertToRaw, EditorState } from "draft-js";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";

import 'react-toastify/dist/ReactToastify.css';
import styles from "./NewProduct.module.sass";

import TooltipGlodal from "../../components/TooltipGlodal";
import Modal from "../../components/Modal";
import Schedule from "../../components/Schedule";
import NameAndDescription from "./NameAndDescription";
import ImagesAndCTA from "./ImagesAndCTA";
import CategoryAndAttibutes from "./CategoryAndAttibutes";
import PriorityAndScheduling from "./PriorityAndScheduling";
import Preview from "./Preview";
import Panel from "./Panel";

const NewProduct = () => {    
    const { token } = useAuth();
    const [isEditing, setIsEditing] = useState(false); // ✅ Track if editing an existing item
    const [itemType, setItemType] = useState("Note"); // ✅ Track "Type of Item" selection
    const [visiblePreview, setVisiblePreview] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date()); // ✅ Task-Specific

    //Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(() => EditorState.createEmpty()); // ✅ Track rich-text data
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [priority, setPriority] = useState("Medium"); // ✅ Task-Specific
    const [completed, setCompleted] = useState(false); // ✅ Task-Specific

    const handleClearForm = () => {
        setTitle("");
        setDescription(EditorState.createEmpty());
        setCategory("");
        setTags([]);
        setItemType("Note"); // Reset type to default
        setImageFile(null);
        setPreviewUrl(null);
        setPriority("Medium");
        setCompleted(false);
    };

    const handleShareableLink = async () => {
        if (!title.trim() || !description || !category.trim()) {
            toast.error("⚠️ Please complete all required fields: Title, Description, Category", {
                position: "bottom-left",
                autoClose: 5000,
            });
            setLoading(false);
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
    
        // ✅ Validate required fields
        if (!title.trim() || !description || !category.trim()) {
            toast.error("⚠️ Please complete all required fields: Title, Description, Category", {
                position: "bottom-left",
                autoClose: 5000, // Auto close after 5 seconds
                hideProgressBar: true,
            });
            setLoading(false);
            return;
        }
    
        if (!token) {
            toast.error("⚠️ User not authenticated! Please log in.", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: true,
            });
            setLoading(false);
            return;
        }
    
        // if (itemType !== "Note") {
        //     toast.error("⚠️ Only 'Note' is supported at this time.", {
        //         position: "bottom-left",
        //         autoClose: 5000,
        //         hideProgressBar: true,
        //     });
        //     setLoading(false);
        //     return;
        // }
    
        // ✅ Extract plain text and full rich-text data
        let plainTextContent = "";
        let rawContent = null;
    
        if (description && description.getCurrentContent) {
            const contentState = description.getCurrentContent();
            plainTextContent = contentState.getPlainText(); // ✅ Store plain text
            rawContent = convertToRaw(contentState); // ✅ Store full raw format
        }

        // ✅ Upload Image to S3 if a new image was selected
        let uploadedImageUrl = null;

        if (imageFile) {
            const formData = new FormData();
            formData.append("image", imageFile);

            try {
                const uploadResponse = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/images/upload`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } }
                );
                uploadedImageUrl = uploadResponse.data.imageUrl;
                toast.success("✅ Image uploaded successfully!", { position: "bottom-left" });
            } catch (error) {
                toast.error("🚨 Image upload failed. Please try again.", { position: "bottom-left" });
                setLoading(false);
                return;
            }
        }
    
        const data = {
            title,
            content: { raw: rawContent, text: plainTextContent }, // ✅ Store as object
            category,
            tags: tags.map(tag => (typeof tag === "object" ? tag.text : tag)), // ✅ Extract tag text,
            imageUrl: uploadedImageUrl, // ✅ Store image URL
        };

        // ✅ If Creating a Task, Include Additional Fields
        if (itemType === "Task") {
            data.dueDate = startDate;
            data.priority = priority;
            data.completed = completed;
        }
    
        try {
            if (itemType === "Task") {
                await createTask(data, token); // ✅ Task API Call
            } else {
                await createNote(data, token); // ✅ Note API Call
            }

            toast.success(`✅ ${itemType} Created Successfully!`, { position: "bottom-left" });
            setIsEditing(true);
            handleClearForm();
        } catch (error) {
            toast.error(`🚨 Error: ${error.message}`, { position: "bottom-left" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <NameAndDescription 
                            className={styles.card}
                            title={title}
                            setTitle={setTitle} 
                            setDescription={setDescription}
                            descriptionState={description}
                            selectedType={itemType} // ✅ Pass type selection
                            setSelectedType={setItemType} // ✅ Allow type change
                        />
                        <ImagesAndCTA 
                            className={styles.card} 
                            setImageFile={setImageFile}
                            setPreviewUrl={setPreviewUrl}
                        />
                        <CategoryAndAttibutes 
                            className={styles.card}
                            setCategory={setCategory} 
                            setTags={setTags}
                            token={token}
                        />
                        {itemType === "Task" && 
                            <PriorityAndScheduling 
                            className={styles.card} 
                            selectedPriority={priority} 
                            setSelectedPriority={setPriority} 
                            completed={completed} 
                            setCompleted={setCompleted} 
                            startDate={startDate} 
                            setStartDate={setStartDate}  />}
                    </div>
                    <div className={styles.col}>
                        <Preview
                            visible={visiblePreview}
                            onClose={() => setVisiblePreview(false)}
                            title={title} 
                            imageUrl={previewUrl} // ✅ Updates dynamically
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
                    />
                </Modal>
            </form>
        </>
    );
};

export default NewProduct;
