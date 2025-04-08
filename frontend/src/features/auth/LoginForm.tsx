// react
import { useState } from "react";

// redux
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchUserData, loginUser } from "./authThunk";
import { fetchCart } from "../cart/cartThunk";

// plugins
import { useNavigate } from "react-router-dom";

// components
import Form from "../../components/Form";

interface LoginData {
  password: string;
  email: string;
}

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await dispatch(loginUser(form));
      await dispatch(fetchCart(res.payload.cartId));
      await dispatch(fetchUserData());

      navigate(res.payload.redirect);
    } catch (error) {
      console.error("Error during submit:", error);
    }
  };

  return (
    <div className="login-container">
      <Form
        modifier="login"
        handleSubmit={handleSubmit}
        buttonName="Login"
        fieldsets={[
          {
            id: "fieldset1",
            fields: [
              <>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </>,
              <>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
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

export default LoginForm;
