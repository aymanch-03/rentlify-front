import axios from "axios";
import Cookies from "js-cookie";

const bearerToken = "Bearer " + Cookies.get("token");
console.log(bearerToken);
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1",
  headers: { Authorization: bearerToken },
});
export default axiosInstance;
