import axios from "axios";

// Create a centralized API instance
// This simplifies fetching logic across the app
const api = axios.create({
    baseURL: `${(import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(
        /\/$/,
        ""
    )
        }/api`,
    withCredentials: true,
});

export default api;
