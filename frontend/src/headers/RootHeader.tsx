// redux
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logoutUser } from "../features/auth/authThunk";
import { removeCart } from "../features/cart/cartSlice";

// plugins
import { useNavigate } from "react-router-dom";

// components
import Logo from "../components/images/LogoIcon";
import Header from "../components/Header";
import ColorPicker from "../components/ColorPicker";
import Nav from "../components/Nav";
import List from "../components/List";
import { UnknownIcon } from "../components/images/UnknownIcon";
import LogoutIcon from "../components/images/navbar/LogoutIcon";

// services
import { getComplementaryHex } from "../services/colorService";
import Anchor from "../components/Anchor";
import Button from "../components/Button";

// data (images & routes)
import { routes } from "../data/routes";
import { routeImages } from "../data/images";

const RootHeader = () => {
  const dispatch = useAppDispatch();
  const { pickedColor } = useAppSelector((state: RootState) => state.color);
  const comColor = getComplementaryHex(pickedColor);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const totalQuantity = useAppSelector((state: RootState) =>
    token ? state.cart?.totalQuantity : 0,
  );

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      dispatch(removeCart());
      navigate("/");
    });
  };

  return (
    <Header blockPrefix="root" level={2} title="Root" visibleTitle={false}>
      <div className="root-header__logo">
        <Logo />
      </div>
      <div className="root-header__bgColorPicker">
        <ColorPicker label="PICKED COLOR" />
      </div>
      <Nav modifier="root">
        <List
          parent="nav--root"
          modifier="nav"
          data={routes}
          schema={(item: any) => {
            const ImageComponent = routeImages[item.name.toLowerCase()];
            return item.action === "anchor" ? (
              <>
                <Anchor
                  modifier="nav"
                  URL={`${item.URL}`}
                  orientation="row"
                  hasLink={true}
                >
                  {ImageComponent ? (
                    <ImageComponent color={comColor} />
                  ) : (
                    <UnknownIcon color={comColor} />
                  )}
                  <span>{item.name.toUpperCase()}</span>
                  {item.name === "cart" && (
                    <span aria-label="quantity">{totalQuantity}</span>
                  )}
                </Anchor>
                {item.children && (
                  <List
                    modifier="sub"
                    data={item.children}
                    schema={(child: any) => {
                      const ImageComponent =
                        routeImages[child.name.toLowerCase().replace(" ", "")];
                      return (
                        <Anchor
                          modifier="nav"
                          URL={`${child.URL}`}
                          orientation="row"
                          hasLink={true}
                        >
                          {ImageComponent ? (
                            <ImageComponent color={comColor} />
                          ) : (
                            <UnknownIcon color={comColor} />
                          )}
                          <span>{child.name.toUpperCase()}</span>
                        </Anchor>
                      );
                    }}
                  />
                )}
              </>
            ) : (
              <Button
                mode="nav"
                orientation="row"
                handleClick={() => handleLogout()}
              >
                <LogoutIcon color={comColor} />
                <span>Logout</span>
              </Button>
            );
          }}
        />
      </Nav>
    </Header>
  );
};

export default RootHeader;
