import { Outlet } from "react-router-dom";
import Layout from "../components/Layout";

const ProductsLayout = () => {
  return (
    <Layout blockPrefix="products">
      <Outlet />
    </Layout>
  );
};

export default ProductsLayout;
