import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com/products",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.method, config.url);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error?.response?.status, error?.response?.data);
    return Promise.reject(error);
  }
);

export async function getAllProducts() {
  const response = await api.get("/");
  return response.data;
}

export async function getProductById(id) {
  const response = await api.get(`/${id}`);
  return response.data;
}

export async function getProductsByCategory(category) {
  const response = await api.get(`/category/${category}`);
  return response.data;
}

export default api;
