import axios from "axios";

export default axios.create({
  baseURL: "http://10.11.6.11:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});