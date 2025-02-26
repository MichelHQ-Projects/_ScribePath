import axios from 'axios';

const API_URL = '/api/categories';

export const getCategories = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {Authorization: `Bearer ${token}`}
        });
        return response.data;
    } catch (error) {
        console.error('Error while fetching categories', error);
        throw new Error(error.response?.data?.message || "Failed to fetch categories");
    }
};

export const createCategory = async (categoryName, token) => {
    try {
        const response = await axios.post(
            API_URL,
            {name: categoryName},
            {headers: {Authorization: `Bearer ${token}`}}
        )
        return response.data;
    } catch (error) {
        console.error('Error while creating category', error);
        throw new Error(error.response?.data?.message || "Failed to create category");
    }
};

export const updateCategory = async (categoryId, newName, token) => {
    try {
        const response= await axios.put(
            '${API_URL}/${categoryId}',
            {name: newName},
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return response.data;
    } catch (error) {
        console.error('Error while updating category', error);
        throw new Error(error.response?.data?.message || "Failed to update category");
    }
};

export const deleteCategory = async (categoryId, token) => {
    try {
        const response = await axios.delete(
            '${API_URL}/${categoryId}',
            {headers: {Authorization: `Bearer ${token}`}}
        );
        return response.data;
    } catch (error) {
        console.error('Error while deleting category', error);
        throw new Error(error.response?.data?.message || "Failed to delete category");
    }
};