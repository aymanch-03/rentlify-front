import axios from "axios";

const token = "Bearer " + window.localStorage.getItem("token");
export const axiosInsatnce = axios.create({
  baseURL: "http://localhost:5000/v1/",
  headers: { "x-access-token": token },
});
