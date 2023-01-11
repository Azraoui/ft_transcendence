import axios from "axios";

export default axios.create({
  baseURL: `http://${import.meta.env.VITE_IP}:5000/api`,
  headers: {
    "Content-type": "application/json"
  }
});