import axios from "axios";

const api = axios.create({

  // baseURL: "http://localhost:7040/api",
  baseURL: "http://64.225.58.63:7040/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

