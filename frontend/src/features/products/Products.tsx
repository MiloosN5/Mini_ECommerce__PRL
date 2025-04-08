// react
import { useEffect, useState } from "react";

// redux
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addToCart } from "../cart/cartSlice";
import { updateCart } from "../cart/cartThunk";
import { Product } from "./productsSlice";

// components
import { UnknownIcon } from "../../components/images/UnknownIcon";
import List from "../../components/List";
import Button from "../../components/Button";

// services / hooks
import { getComplementaryHex } from "../../services/colorService";
import { useHeightObserver } from "../../hooks/useHeightObserver";

// images
import { productImages } from "../../data/images";

const Products = () => {
  const dispatch = useAppDispatch();
  const userCart = useAppSelector((state: RootState) => state.auth.userCart);
  const { pickedColor } = useAppSelector((state: RootState) => state.color);
  const comColor = getComplementaryHex(pickedColor);
  const { items } = useAppSelector((state: RootState) => state.products);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { imageRef, imageHeight } = useHeightObserver<HTMLDivElement>();
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    if (items.length > 0) {
      const initialQuantities = items.reduce(
        (acc, item) => {
          acc[String(item.id)] = 1;
          return acc;
        },
        {} as { [id: string]: number },
      );

      setQuantities(initialQuantities);
    }
  }, [items]);

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({ ...product, quantity: quantities[String(product.id)] }),
    );
    if (userCart) {
      dispatch(updateCart(userCart))
        .unwrap()
        .then((result) => {
          console.log("Updated Cart after 'addToCart' - Fulfilled:", result);
        })
        .catch((error) => {
          console.log("Updated Cart after 'addToCart' - Rejected:", error);
        });
    }
  };

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="products-container">
      <List
        parent="products-container"
        data={items}
        modifier="products"
        schema={(item: Product) => {
          const ImageComponent = productImages[item.name.toLowerCase()];
          const isInCart = cartItems.some(
            (cartItem) => cartItem.id === item.id,
          );
          const quantity = quantities[String(item.id)] || 1;
          return (
            <>
              <div
                ref={imageRef}
                className="list__image list--products__image"
                style={{ width: imageHeight }}
              >
                {ImageComponent ? (
                  <ImageComponent color={comColor} />
                ) : (
                  <UnknownIcon color={comColor} />
                )}
              </div>
              <div className="list__data list--cart__data">
                <span>NAME</span>
                {item.name}
              </div>
              <div className="list__data list--cart__data">
                <span>PRICE</span>${item.price}
              </div>
              <input
                key={`input-${quantity}`}
                disabled={isInCart}
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => handleQuantityChange(e, String(item.id))}
              />
                <Button
                  isDisabled={isInCart || !userCart}
                  mode="outlined"
                  orientation="col"
                  handleClick={() => handleAddToCart(item)}
                >
                  <span>{isInCart ? "Added" : "Add to Cart"}</span>
                </Button>
            </>
          );
        }}
      />
    </div>
  );
};

export default Products;
