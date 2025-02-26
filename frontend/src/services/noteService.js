import axios from 'axios';

const API_URL = '/api/notes'; // Adjust based on backend URL

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

