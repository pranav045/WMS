import axios from "axios";

const API = axios.create({
  baseURL: "https://wms-b7au.onrender.com/api", // Render backend
});

export default API;
