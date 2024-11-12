import axios from "axios";

// Create an instance of Axios with the base URL
export const api = axios.create({
  baseURL: "https://employee-9ltt.vercel.app/", // Base URL for your API
  headers: {
    "Content-Type": "application/json",
  },
});
