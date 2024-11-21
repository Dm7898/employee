import axios from "axios";

// Create an instance of Axios with the base URL
export const api = axios.create({
  baseURL: "https://employee-1-po53.onrender.com", // Set the base URL
  headers: {
    "Content-Type": "application/json", // Default Content-Type header
  },
});
