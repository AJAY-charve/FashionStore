// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import UserLayout from "./components/Layout/UserLayout";
// import Home from "./features/customer/pages/Home";
// import { Toaster, toast } from "sonner";
// import Login from "./features/customer/auth/Login";
// import Register from "./features/customer/auth/Register";
// import Profile from "./features/customer/pages/Profile";
// import Collection from "./features/customer/pages/Collection";
// // import ProductDetails from "./features/Products/ProductDetails";
// import ProductDetails from "./features/customer/Products/ProductDetails";
// import Checkout from "./features/customer/Cart/Checkout";
// import OrderConfirmation from "./features/customer/Products/OrderConfirmation";
// import OrderDetails from "./features/customer/pages/OrderDetails";
// import MyOrders from "./features/customer/pages/MyOrders";

// // import AdminLayout from "./components/admin/AdminLayout";
// // import AdminHomePage from "./pages/AdminHomePage";
// // import UserManagement from "./components/admin/UserManagement";
// // import ProductManagement from "./components/admin/ProductManagement";
// // import EditProduct from "./components/admin/EditProduct";
// // import OrderManagement from "./components/admin/OrderManagement";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import ProtectedRoute from "./features/admin/ProtectedRoute";
// import AdminLayout from "./features/admin/components/AdminLayout";
// import UserManagement from "./features/admin/components/UserManagement";
// import ProductManagement from "./features/admin/components/ProductManagement";
// import OrderManagement from "./features/admin/components/OrderManagement";
// import AdminHomePage from "./features/admin/components/AdminHomePage";
// import EditProduct from "./features/admin/components/EditProduct";
// import UserLayout from "./features/customer/Layout/UserLayout";

// const App = () => {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Toaster position="top-right" />
//         <Routes>
//           <Route path="/" element={<UserLayout />}>
//             {/* User Layout */}
//             <Route index element={<Home />} />
//             <Route path="login" element={<Login />} />
//             <Route path="register" element={<Register />} />
//             <Route path="profile" element={<Profile />} />
//             <Route path="collections/:collection" element={<Collection />} />
//             <Route path="product/:id" element={<ProductDetails />} />
//             <Route path="checkout" element={<Checkout />} />
//             <Route path="order-confirmation" element={<OrderConfirmation />} />
//             <Route path="order/:id" element={<OrderDetails />} />
//             <Route path="my-orders" element={<MyOrders />} />

//             <Route />
//           </Route>

//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute role="admin">
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route index element={<AdminHomePage />} />
//             <Route path="users" element={<UserManagement />} />
//             <Route path="products" element={<ProductManagement />} />
//             <Route path="products/:id/edit" element={<EditProduct />} />
//             <Route path="orders" element={<OrderManagement />} />
//             <Route />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import store from "./redux/store";
import CustomerRoutes from "./features/customer/Routes/CustomerRoutes";
import AdminRoutes from "./features/admin/Routes/AdminRoutes";
import NotFound from "./NotFound";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          {CustomerRoutes}
          {AdminRoutes}
          {/* <AdminRoutes /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
