import axios from "axios";

const api = axios.create({
  baseURL: "http://backendfoundation.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
