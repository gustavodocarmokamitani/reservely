import axios from "axios";

const api = axios.create({

  baseURL: "http://backendfoundation.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
