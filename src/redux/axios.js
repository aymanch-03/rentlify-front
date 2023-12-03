import axios from "axios";
// import Cookies from "js-cookie";

// const clientToken = Cookies.get("clientToken");

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/v1",
});

export default axiosInstance;
