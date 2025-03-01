import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/notes`; // ✅ Ensure this is correct

/**
 * @desc Create a new task
 * @param {Object} taskData - The task details (title, content, category, etc.)
 * @param {String} token - Firebase Auth token for authentication
 */

export const createNote = async (noteData, token) => {
    try {
        const response = await axios.post(API_URL, noteData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

        }); 
        return response.data;
    } catch (error) {
        console.error('Error while creating note', error);
        throw new Error(error.response?.data?.message || "Failed to create note");
    }
};

