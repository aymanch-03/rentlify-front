import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");
// const bearerToken = "Bearer " + token;
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1/",
  headers: { "x-access-token": token },
});

export default axiosInstance;
