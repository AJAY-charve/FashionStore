// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { fetchOrderDetails } from "../../../redux/slice/orderSlice";

// const OrderDetails = () => {
//   const { id } = useParams();

//   console.log("id", id);

//   // const [orderDetails, setOrderDetails] = useState(null);
//   const dispatch = useDispatch();

//   const { orderDetails, loading, error } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(fetchOrderDetails({ orderId: id }));
//   }, [dispatch, id]);

//   if (loading) {
//     return <p>Loading..</p>;
//   }

//   if (error) {
//     return <p>Error : {error}</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6">
//       <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
//       {!orderDetails ? (
//         <p>No Order details</p>
//       ) : (
//         <div className="p-4 sm:p-6 rounded-lg border">
//           {/* order info */}
//           <div className="flex flex-col sm:flex-row justify-between mb-8">
//             <div className="">
//               <h3 className="text-lg md:text-xl font-semibold">
//                 Order Id : {orderDetails._id}
//               </h3>
//               <p className="text-gray-600">
//                 {new Date(orderDetails.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//             <div className="flex flex-col items-start sm:items-center mt-4 sm:mt-0">
//               <span
//                 className={`${
//                   orderDetails.isPaid
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 } px-3 py-1 rounded-full text-sm font-medium mb-2`}
//               >
//                 {orderDetails.isPaid ? "Approved" : "Pending"}
//               </span>
//               <span
//                 className={`${
//                   orderDetails.isDelivered
//                     ? "bg-green-100 text-green-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 } px-3 py-1 rounded-full text-sm font-medium mb-2`}
//               >
//                 {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
//               </span>
//             </div>
//           </div>
//           {/* costumer payment and shipping info */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
//             <div>
//               <h4 className="text-lg font-semibold mb-2">Payment Info </h4>
//               <p>Payment Methode : {orderDetails.paymentMethode}</p>
//               <p>Status : {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-2">Shipping Info </h4>
//               <p>Shipping Methode : {orderDetails.shippingMethode}</p>
//               <p>
//                 Address :{orderDetails.shippingAddress.city},{" "}
//                 {orderDetails.shippingAddress.country}
//               </p>
//             </div>
//           </div>
//           {/* product list */}
//           <div className="overflow-x-auto">
//             <h4 className="text-lg font-semibold mb-4">Products</h4>
//             <table className="min-w-full text-gray-600 mb-4">
//               <thead className="bg-gray-100 ">
//                 <tr>
//                   <th className="py-2 px-4">Name</th>
//                   <th className="py-2 px-4">Unit Price</th>
//                   <th className="py-2 px-4">Quantity</th>
//                   <th className="py-2 px-4">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderDetails.orderItems.map((item) => (
//                   <tr key={item.productId} className="border-b ">
//                     <td className="py-2 px-4 flex items-center">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-12 h-12  object-cover rounded-lg mr-4"
//                       />
//                       <Link
//                         to={`/product/${item.productId}`}
//                         className="text-blue-500 hover:underline"
//                       >
//                         {item.name}
//                       </Link>
//                     </td>
//                     <td className="px-4 py-2">${item.price}</td>
//                     <td className="px-4 py-2">{item.quantity}</td>
//                     <td className="px-4 py-2">${item.price * item.quantity}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Back to Orders Link */}
//           <Link to="/my-orders" className="text-blue-500 hover:underline">
//             Back to My Orders
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDetails;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CustomTable from "../../components/common/CustomTable";
import { fetchOrderDetails } from "../../../redux/slice/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrderDetails({ orderId: id }));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  if (!orderDetails) {
    return <p>No Order details</p>;
  }

  /* ---------------- PRODUCT TABLE COLUMNS ---------------- */
  const productColumns = [
    {
      title: "Product",
      key: "name",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.image}
            alt={row.name}
            className="w-12 h-12 object-cover rounded-lg"
          />
          <Link
            to={`/product/${row.productId}`}
            className="text-blue-600 hover:underline"
          >
            {row.name}
          </Link>
        </div>
      ),
    },
    {
      title: "Unit Price",
      key: "price",
      render: (row) => `₹${row.price}`,
    },
    {
      title: "Quantity",
      key: "quantity",
    },
    {
      title: "Total",
      key: "total",
      render: (row) => `₹${row.price * row.quantity}`,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

      <div className="p-4 sm:p-6 rounded-lg border bg-white">
        {/* ---------------- ORDER INFO ---------------- */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID : {orderDetails._id}
            </h3>
            <p className="text-gray-600">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  orderDetails.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {orderDetails.isPaid ? "Paid" : "Pending"}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
                ${
                  orderDetails.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Pending Delivery"}
            </span>
          </div>
        </div>

        {/* ---------------- PAYMENT & SHIPPING ---------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
            <p>Method : {orderDetails.paymentMethode}</p>
            <p>Status : {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
            <p>Method : {orderDetails.shippingMethode}</p>
            <p>
              Address : {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>

        {/* ---------------- PRODUCTS (CustomTable) ---------------- */}
        <h4 className="text-lg font-semibold mb-4">Products</h4>

        <CustomTable
          columns={productColumns}
          data={orderDetails.orderItems}
          loading={false}
          pageSizeOptions={[5, 10, 20]}
          maxHeight={400}
        />

        {/* ---------------- BACK LINK ---------------- */}
        <div className="mt-6">
          <Link to="/my-orders" className="text-blue-600 hover:underline">
            ← Back to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
