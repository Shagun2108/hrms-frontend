import axios from "axios";

const instance = axios.create({
  baseURL: "https://hrms-8syy.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
