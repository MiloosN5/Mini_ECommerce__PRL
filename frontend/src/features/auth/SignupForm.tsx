// react
import { useState } from "react";

// redux
import { useAppDispatch } from "../../hooks/reduxHooks";
import { registerUser } from "./authThunk";
import Form from "../../components/Form";

interface SignupData {
  name: string;
  password: string;
  email: string;
}

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then((result) => {
        console.log("User registered - Fulfilled:", result);
      })
      .catch((error) => {
        console.log("User registered - Rejected:", error);
      });
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <div className="signup-container">
      <Form
        modifier="signup"
        handleSubmit={handleSubmit}
        buttonName="Signup"
        fieldsets={[
          {
            id: "fieldset1",
            fields: [
              <>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </>,
              <>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  value={formData.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  minLength={6}
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

export default SignupForm;
