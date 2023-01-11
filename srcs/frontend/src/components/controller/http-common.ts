import axios from "axios";

export default axios.create({
  baseURL: `http://${process.env.HOST_MACHINE_URL}:5000/api`,
  headers: {
    "Content-type": "application/json"
  }
});