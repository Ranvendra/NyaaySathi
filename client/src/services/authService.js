import api from "./api";

// Auth API is mounted at /auth
// The base API URL is already configured in api.js

export const signup = async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};
