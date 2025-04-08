// plugins
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import Home from "./pages/HomePage";
import PageLayout from "./layouts/PageLayout";
import ProductsLayout from "./layouts/ProductsLayout";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import GuardPage from "./pages/GuardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <GuardPage>
            <DashboardPage />
          </GuardPage>
        ),
      },
      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: "add",
            element: <AddProductPage />,
          },
        ],
      },
      {
        path: "cart",
        element: (
          <GuardPage>
            <CartPage />
          </GuardPage>
        ),
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
