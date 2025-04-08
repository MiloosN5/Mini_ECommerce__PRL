// react
import { useEffect } from "react";

// redux
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

// plugins
import { Outlet } from "react-router-dom";

// components
import RootHeader from "../headers/RootHeader";
import Layout from "../components/Layout";

// services
import { darkenHex, getComplementaryHex } from "../services/colorService";
import { fetchCart } from "../features/cart/cartThunk";

const PageLayout = () => {
  const dispatch = useAppDispatch();
  const { pickedColor } = useAppSelector((state: RootState) => state.color);
  const comColor = getComplementaryHex(pickedColor);
  const pickedColorDarker = darkenHex(pickedColor, 10);
  const comColorDarker = darkenHex(comColor, 10);
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const userCart = useAppSelector((state: RootState) => state.auth.userCart);

  useEffect(() => {
    document.documentElement.style.setProperty("--pickedColor", pickedColor);
    document.documentElement.style.setProperty("--comColor", comColor);
    document.documentElement.style.setProperty(
      "--pickedColorDarker",
      pickedColorDarker,
    );
    document.documentElement.style.setProperty(
      "--comColorDarker",
      comColorDarker,
    );
  }, [pickedColor]);

  useEffect(() => {
    if (userId && userCart) {
      dispatch(fetchCart(userCart))
        .unwrap()
        .then((result) => {
          console.log("Fetched Cart on Init - Fulfilled:", result);
        })
        .catch((error) => {
          console.log("Fetched Cart on Init - Rejected:", error);
        });
    }
  }, [userId, userCart]);

  return (
    <Layout
      blockPrefix="page"
      style={{
        backgroundImage: `linear-gradient(135deg, ${pickedColor}, ${pickedColorDarker})`,
      }}
    >
      <RootHeader />
      <main>
        <Outlet />
      </main>
    </Layout>
  );
};

export default PageLayout;
