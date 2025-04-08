import Apple from '../components/images/products/AppleProductImage';
import StrawBerry from '../components/images/products/StrawberryProductImage';

import Home from '../components/images/navbar/HomeIcon'
import Dashboard from '../components/images/navbar/DashboardIcon'
import Products from '../components/images/navbar/ProductsIcon'
import AddProduct from '../components/images/navbar/AddProductIcon'
import Login from '../components/images/navbar/LoginIcon'
import Signup from '../components/images/navbar/SignupIcon'
import Cart from '../components/images/navbar/CartIcon'
import Logout from '../components/images/navbar/LogoutIcon'

const products = { Apple, StrawBerry };
const routes = { Home, Dashboard, Products, AddProduct, Login, Signup, Cart, Logout }

export const productImages = Object.fromEntries(
  Object.entries(products).map(([key, value]) => [key.toLowerCase(), value])
);

export const routeImages = Object.fromEntries(
  Object.entries(routes).map(([key, value]) => [key.toLowerCase(), value])
);




