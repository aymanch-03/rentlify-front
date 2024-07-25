import axios from "axios";
// import Cookies from "js-cookie";

// const clientToken = Cookies.get("clientToken");

const axiosInstance = axios.create({
  baseURL: "https://rentlify-backend.vercel.app/v1/",
  withCredentials: true,
});

export default axiosInstance;
