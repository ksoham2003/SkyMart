import axios from "axios";

// Vercel backend base URL
const BACKEND_URL = "https://e-commerce-task-virid.vercel.app";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api/products`,
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

/**
 * Utility helper to map Mongoose Product Schema to the DummyJSON schema 
 * used extensively throughout the SkyMart frontend pages.
 */
function mapBackendProduct(product) {
  if (!product) return null;

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images.map(img => `${BACKEND_URL}/uploads/${img}`)
    : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"];

  return {
    id: product._id,
    title: product.name || "Unnamed Product",
    description: product.description || "",
    price: product.price || 0,
    category: product.category || "general",
    thumbnail: images[0],
    images: images,
    rating: 4.5, // Default mockup value (not supported in current backend schema)
    stock: 50,    // Default mockup value (not supported in current backend schema)
  };
}

export async function getAllProducts() {
  const response = await api.get("/");
  // Our backend returns custom ApiResponse with products list inside data array
  const backendProducts = response.data?.data || [];
  return {
    products: backendProducts.map(mapBackendProduct),
  };
}

export async function getProductById(id) {
  const response = await api.get(`/${id}`);
  // Our backend returns single product details inside data field
  const backendProduct = response.data?.data;
  return mapBackendProduct(backendProduct);
}

export async function getProductsByCategory(category) {
  // Our backend filters by query parameter: GET /?category=name
  const response = await api.get(`/?category=${category}`);
  const backendProducts = response.data?.data || [];
  return {
    products: backendProducts.map(mapBackendProduct),
  };
}

export default api;
