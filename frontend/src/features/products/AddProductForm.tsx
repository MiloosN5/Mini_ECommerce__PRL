// react
import { useState } from "react";

// redux
import { addProduct } from "./productsThunk";
import { useAppDispatch } from "../../hooks/reduxHooks";

// components
import Form from "../../components/Form";

const AddProductForm = () => {
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState({
    name: "",
    price: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct(product))
      .unwrap()
      .then((result) => {
        console.log("Added product - Fulfilled:", result);
      })
      .catch((error) => {
        console.log("Added product - Rejected:", error);
      });
    setProduct({ name: "", price: 0 });
  };

  return (
    <div className="addProduct-container">
      <Form
        modifier="addProduct"
        handleSubmit={handleSubmit}
        buttonName="Add Product"
        fieldsets={[
          {
            id: "fieldset1",
            fields: [
              <>
                <label>Name of the product</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                />
              </>,
              <>
                <label>Price of the product</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </>,
            ],
          },
        ]}
      />
    </div>
  );
};

export default AddProductForm;
