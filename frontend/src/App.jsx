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
