import axios from "axios";

// Create an instance of Axios with the base URL
export const api = axios.create({
  baseURL: "http://localhost:5000", // Set the base URL
  headers: {
    "Content-Type": "application/json", // Default Content-Type header
  },
});
