import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/tasks`; // ✅ Ensure this is correct


export const createTask = async (taskData, token) => {
    try {
        const response = await axios.post(API_URL, taskData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("🚨 Error Creating Task:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to create task");
    }
};

/**
 * @desc Get all tasks for the authenticated user
 * @param {String} token - Firebase Auth token
 */
export const getTasks = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("🚨 Error Fetching Tasks:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch tasks");
    }
};

/**
 * @desc Get a single task by ID
 * @param {String} taskId - The ID of the task to fetch
 * @param {String} token - Firebase Auth token
 */
export const getTaskById = async (taskId, token) => {
    try {
        const response = await axios.get(`${API_URL}/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`🚨 Error Fetching Task ${taskId}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch task");
    }
};

/**
 * @desc Update a task
 * @param {String} taskId - The ID of the task to update
 * @param {Object} taskData - Updated task data
 * @param {String} token - Firebase Auth token
 */
export const updateTask = async (taskId, taskData, token) => {
    try {
        const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`🚨 Error Updating Task ${taskId}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to update task");
    }
};

/**
 * @desc Delete a task
 * @param {String} taskId - The ID of the task to delete
 * @param {String} token - Firebase Auth token
 */
export const deleteTask = async (taskId, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`🚨 Error Deleting Task ${taskId}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to delete task");
    }
};