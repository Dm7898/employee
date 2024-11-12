import axios from "axios";

// Create an instance of Axios with the base URL
export const api = axios.create({
  baseURL: "https://employee-iel6.onrender.com/", // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});
