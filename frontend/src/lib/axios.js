import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5001/api" // 👈 dev mode backend
    : "https://chat-app-project-backend-gixv.onrender.com/api", // 👈 prod backend
  withCredentials: true, // 👈 ensure cookies are sent
});
