import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.set("token", token);
  return config;
});

export default api;