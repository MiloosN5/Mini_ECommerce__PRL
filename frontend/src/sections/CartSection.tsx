// redux
import { RootState } from "../store/store";
import { useAppSelector } from "../hooks/reduxHooks";
import Cart from "../features/cart/Cart";

// icons
import { FaArrowRightLong } from "react-icons/fa6";

// components
import CartImage from "../components/images/decorations/CartImage";
import Section from "../components/Section";
import Header from "../components/Header";
import Anchor from "../components/Anchor";

// services
import { getComplementaryHex } from "../services/colorService";

const CartSection = () => {
    const userCart = useAppSelector((state: RootState) => state.auth.userCart);
    const { items } = useAppSelector((state: RootState) => state.cart);
    const { pickedColor } = useAppSelector((state: RootState) => state.color);
    const comColor = getComplementaryHex(pickedColor);

    return (
        <Section
            blockPrefix="cart"
            sectionLevel="level1"
            headerChildren={
                <Header
                    parent="cart-section"
                    blockPrefix="cart"
                    level={2}
                    title="Cart"
                    visibleTitle={true}
                >
                    <CartImage />
                </Header>
            }
            contentChildren={
                userCart ? (
                    <>
                        {items.length !== 0 ? (
                            <Cart />
                        ) : (
                            <div className="cart-section__empty">
                                <p>Your cart is empty.</p>
                            </div>
                        )}
                        <Section
                            parent="cart-section"
                            blockPrefix="CTA"
                            sectionLevel="level2"
                            headerChildren={
                                <Header
                                    parent="CTA-section"
                                    blockPrefix="CTA"
                                    sectionLevel="level2"
                                    level={2}
                                    title="CTA"
                                    visibleTitle={false}
                                />
                            }
                            contentChildren={
                                <div className="CTA-container">
                                    <div className="CTA-section__action">
                                        <span className="CTA-section__actionTitle">
                                            Want to buy something? Check out our offers!
                                        </span>
                                        <FaArrowRightLong color={comColor} />{" "}
                                        <Anchor
                                            URL={`/products`}
                                            mode="invert"
                                            orientation="col"
                                            hasLink={true}
                                            parent="CTA-section"
                                            modifier="actionBtn"
                                        >
                                            <span>Click</span>
                                        </Anchor>
                                    </div>
                                </div>
                            }
                        />
                    </>
                ) : (
                    <div className="cart-section__unknown">
                        <p>The cart does not exist.</p>
                    </div>
                )
            }
        />
    );
};

export default CartSection;
