// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";

// components
import Header from "../components/Header";
import Section from "../components/Section";

const DashboardSection = () => {
  const { totalPrice, totalQuantity } = useAppSelector(
    (state: RootState) => state.cart,
  );
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <Section
      blockPrefix="dashboard"
      sectionLevel="level1"
      headerChildren={
        <Header
          parent="dashboard-section"
          blockPrefix="dashboard"
          title="Dashboard"
          level={2}
          visibleTitle={false}
        />
      }
      contentChildren={
        user ? (
          <div className="dashboard-container">
            <p className="dashboard-section__message">
              Welcome, {user.name || "Stranger"}!
            </p>
            <p className="dashboard-section__quantity">
              Cart items: {totalQuantity}
            </p>
            <p className="dashboard-section__price">
              Cart prices: {totalPrice}$
            </p>
          </div>
        ) : (
          <div className="dashboard-section__noUser">
            <p>There is no user</p>
          </div>
        )
      }
    />
  );
};

export default DashboardSection;
