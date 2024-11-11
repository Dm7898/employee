import axios from "axios";

// Create an instance of Axios with the base URL
export const api = axios.create({
  baseURL: "http://localhost:5000", // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});
