// react
import { useEffect, useState } from "react";

// redux
import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  removeFromCart,
  clearCart,
  Product,
  changeQuantity,
} from "./cartSlice";
import { updateCart } from "./cartThunk";

// plugins
import { useNavigate } from "react-router-dom";

// components
import { UnknownIcon } from "../../components/images/UnknownIcon";
import Button from "../../components/Button";
import List from "../../components/List";

// images
import { productImages } from "../../data/images";

// services
import { getComplementaryHex } from "../../services/colorService";
import { useHeightObserver } from "../../hooks/useHeightObserver";


const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userCart = useAppSelector((state: RootState) => state.auth.userCart);
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const { items, totalPrice, totalQuantity } = useAppSelector(
    (state: RootState) => state.cart,
  );
  const { pickedColor } = useAppSelector((state: RootState) => state.color);
  const comColor = getComplementaryHex(pickedColor);
  const { imageRef, imageHeight } = useHeightObserver<HTMLDivElement>();
  const [quantities, setQuantities] = useState<{ [id: string]: number }>({});
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (items.length > 0) {
      const initialQuantities = items.reduce(
        (acc, item) => {
          acc[String(item.id)] = item.quantity || 1;
          return acc;
        },
        {} as { [id: string]: number },
      );

      setQuantities(initialQuantities);
    }
  }, [items]);

  const handleNewQuantity = (item: Product) => {
    setEditMode((prev) => ({ ...prev, [String(item.id)]: false }));
    dispatch(
      changeQuantity({ product: item, newQ: quantities[String(item.id)] }),
    );
    if (userCart) {
      dispatch(updateCart(userCart))
        .unwrap()
        .then((result) => {
          console.log(
            "Updated Cart after 'changeQuantity' - Fulfilled:",
            result,
          );
        })
        .catch((error) => {
          console.log(
            "Updated Cart after 'changeQuantity' - Rejected:",
            error,
          );
        });
    }
  };

  const handleRemoveFromCart = (item: Product) => {
    dispatch(removeFromCart(item.id));
    if (userCart) {
      dispatch(updateCart(userCart))
        .unwrap()
        .then((result) => {
          console.log(
            "Updated Cart after 'removeFromCart' - Fulfilled:",
            result,
          );
        })
        .catch((error) => {
          console.log("Updated Cart after 'removeFromCart' - Rejected:", error);
        });
    }
  };

  const handleClearFromCart = () => {
    dispatch(clearCart());
    if (userCart) {
      dispatch(updateCart(userCart))
        .unwrap()
        .then((result) => {
          console.log("Updated Cart after 'clearCart' - Fulfilled:", result);
        })
        .catch((error) => {
          console.log("Updated Cart after 'clearCart' - Rejected:", error);
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

  const enableQuantityInput = (item: Product) => {
    setEditMode((prev) => ({ ...prev, [String(item.id)]: true }));
  };

  if (!userId) navigate("/");

  return (
    <div className="cart-container">
      <List
        parent="cart-container"
        data={items}
        modifier="cart"
        schema={(item: Product) => {
          const ImageComponent = productImages[item.name.toLowerCase()];
          const quantity = quantities[String(item.id)] || item.quantity;
          const isEditing = editMode[String(item.id)] || false;
          return (
            <>
              <div
                className="list__image list--cart__image"
                ref={imageRef}
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
                <span>PRICE</span>
                {item.price}$
              </div>
              <div className="list__data list--cart__data">
                <span>QUANTITY</span>
                <div>
                  <input
                    disabled={!isEditing}
                    key={`input-${quantity}`}
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e, String(item.id))}
                  />
                  {!isEditing ? (
                    <Button
                      mode="outlined"
                      orientation="col"
                      handleClick={() => enableQuantityInput(item)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      mode="outlined"
                      orientation="col"
                      handleClick={() => handleNewQuantity(item)}
                    >
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
              <div className="list__data list--cart__data">
                <span>TOTAL</span>
                {(item.quantity && item.quantity * item.price) || 0}$
              </div>
              <Button
                parent="list"
                mode="outlined"
                modifier="cart"
                orientation="col"
                handleClick={() => handleRemoveFromCart(item)}
              >
                <span>Remove</span>
              </Button>
            </>
          );
        }}
      />
      <div className="cart-container__summary">
        <p>Total price: {totalPrice}</p>
        <p>Total quantity: {totalQuantity} articles</p>
      </div>
      <Button
        parent="cart-container"
        mode="outlined"
        orientation="col"
        handleClick={() => handleClearFromCart()}
      >
        <span>Empty the cart</span>
      </Button>
    </div>
  );
};

export default Cart;
