import axios from "axios";

const api = axios.create({

  baseURL: "http://localhost:7040/api",
  // baseURL: "https://api.reservely.com.br/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

