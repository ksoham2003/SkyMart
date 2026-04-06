import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../pages/Home";
import About from "../pages/About";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import { getAllProducts, getProductById, getProductsByCategory } from "../api/ProductApi";

function AppRouters(){
    let router = createBrowserRouter([
        {
            path:"/",
            element: <AuthLayout/>,
            children: [
                {
                    path:"login",
                    element: <Login/>
                },
                {
                    path:"register",
                    element: <Register/>
                }
            ]
        },
        {
            path:"/",
            element: <MainLayout/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path:"home",
                    element: <Home/>
                },
                {
                    path:"about",
                    element: <About/>
                },
                {
                    path:"shop",
                    element: <Shop/>,
                    loader: async () => {
                        return await getAllProducts();
                    }
                },
                {
                    path:"products/:id",
                    element: <ProductDetails/>,
                    loader: async ({ params }) => {
                        const product = await getProductById(params.id);
                        if (!product) return null;
                        
                        let relatedProducts = [];
                        try {
                            const res = await getProductsByCategory(product.category);
                            relatedProducts = res.products || [];
                        } catch (e) {
                            console.error(e);
                        }
                        
                        return { product, relatedProducts };
                    }
                }
            ]
        }
    ])
    return <RouterProvider router={router}/>;
}

export default AppRouters;