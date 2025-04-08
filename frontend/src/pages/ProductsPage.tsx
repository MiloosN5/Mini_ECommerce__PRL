import { useEffect } from "react";
import Page from "../components/Page";
import ProductsSection from "../sections/ProductsSection";
import { fetchProducts } from "../features/products/productsThunk";
import { useAppDispatch } from "../hooks/reduxHooks";

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .then((result) => {
        console.log("Fetched Products - Fulfilled:", result);
      })
      .catch((error) => {
        console.log("Fetched Products -  Rejected:", error);
      });
  }, [dispatch]);
  return (
    <Page blockPrefix="products">
      <ProductsSection />
    </Page>
  );
};

export default ProductsPage;
