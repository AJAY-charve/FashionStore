import { Route } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";

import Home from "../pages/Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../pages/Profile";
import Collection from "../pages/Collection";
import ProductDetails from "../Products/ProductDetails";
import Checkout from "../Cart/Checkout";
import OrderConfirmation from "../Products/OrderConfirmation";
import OrderDetails from "../pages/OrderDetails";
import MyOrders from "../pages/MyOrders";

const CustomerRoutes = (
  <Route path="/" element={<UserLayout />}>
    <Route index element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="profile" element={<Profile />} />
    <Route path="collections/:collection" element={<Collection />} />
    <Route path="product/:id" element={<ProductDetails />} />
    <Route path="checkout" element={<Checkout />} />
    <Route path="order-confirmation" element={<OrderConfirmation />} />
    <Route path="order/:id" element={<OrderDetails />} />
    <Route path="my-orders" element={<MyOrders />} />
  </Route>
);

export default CustomerRoutes;
