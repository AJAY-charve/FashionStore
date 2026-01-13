// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { clearCart } from "../../../redux/slice/cartSlice";

// const OrderConfirmation = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { checkout } = useSelector((state) => state.checkout);

//   useEffect(() => {
//     if (checkout && checkout._id) {
//       dispatch(clearCart());
//       localStorage.removeItem("cart");
//     } else {
//       navigate("/my-orders");
//     }
//   }, [checkout, dispatch, navigate]);

//   const calculatedEstimatedDelivery = (createdAt) => {
//     const orderDate = new Date(createdAt);
//     orderDate.setDate(orderDate.getDate() + 10);
//     return orderDate.toLocaleDateString();
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white">
//       <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
//         Thank Your for your Order!
//       </h1>

//       {checkout && (
//         <div className="p-6 rounded-lg border">
//           <div className="flex justify-between mb-20">
//             <div>
//               <h2 className="text-xl font-semibold ">
//                 Order ID : {checkout._id}
//               </h2>
//               <p className="text-gray-500">
//                 Order date : {new Date(checkout.createdAt).toLocaleDateString()}
//               </p>
//             </div>

//             {/* Esitmated delivery */}
//             <div>
//               <p className="text-emerald-700 text-sm">
//                 Estimated Delivery :{" "}
//                 {calculatedEstimatedDelivery(checkout.createdAt)}
//               </p>
//             </div>
//           </div>

//           {/* Order items */}
//           <div className="mb-20">
//             {checkout.checkoutItems.map((item) => (
//               <div key={item.productId} className="flex items-center mb-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-16 h-16 object-cover rounded-md mr-4"
//                 />
//                 <div>
//                   <h4 className="text-md font-semibold">{item.name}</h4>
//                   <p className="text-sm text-gray-500">
//                     {item.color} | {item.size}
//                   </p>
//                 </div>
//                 <div className="ml-auto text-right">
//                   <p className="text-md ">{item.price}</p>
//                   <p className="text-sm text-gray-500">Qty : {item.quantity}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {/* Payment and delvery date */}
//           <div className="grid grid-cols-2 gap-8">
//             {/* Payment infor */}
//             <div className="">
//               <h4 className="text-lg font-semibold mb-2">Payment</h4>
//               <p className="text-gray-600">Paypal</p>
//             </div>

//             {/* Delivery Info */}
//             <div>
//               <h4 className="text-lg font-semibold mb-2">Delivery</h4>
//               <p className="text-gray-600">
//                 {checkout.shippingAddress.address}
//               </p>
//               <p className="text-gray-600">
//                 {checkout.shippingAddress.city},{" "}
//                 {checkout.shippingAddress.country}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderConfirmation;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/slice/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const estimatedDelivery = (createdAt) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + 10);
    return date.toLocaleDateString();
  };

  if (!checkout) return null;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-2xl text-emerald-700">✓</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700">
            Order Confirmed
          </h1>
          <p className="text-gray-500 mt-2">Thank you for your purchase</p>
        </div>

        {/* Order Info */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 border-b pb-5 mb-6">
          <div>
            <h2 className="text-lg font-semibold">
              Order ID: <span className="text-gray-600">{checkout._id}</span>
            </h2>
            <p className="text-sm text-gray-500">
              Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="text-sm font-medium text-emerald-700">
            Estimated Delivery: {estimatedDelivery(checkout.createdAt)}
          </div>
        </div>

        {/* Items */}
        <div className="space-y-4 mb-8">
          {checkout.checkoutItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border rounded-md p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />

              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.color} • {item.size}
                </p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>

              <div className="font-semibold text-gray-800">₹{item.price}</div>
            </div>
          ))}
        </div>

        {/* Payment & Delivery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Method</h4>
            <p className="text-gray-600">PayPal</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Delivery Address</h4>
            <p className="text-gray-600">{checkout.shippingAddress.address}</p>
            <p className="text-gray-600">
              {checkout.shippingAddress.city},{" "}
              {checkout.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/my-orders")}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
