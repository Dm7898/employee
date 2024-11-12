import axios from "axios";

// Create an instance of Axios with the base URL
export const api = axios.create({
<<<<<<< HEAD
  baseURL: "https://employee-iel6.onrender.com", // Base URL for your API
=======
  baseURL: "http://localhost:5000",
>>>>>>> 1b76177 (updated one)
  headers: {
    "Content-Type": "application/json",
  },
});
