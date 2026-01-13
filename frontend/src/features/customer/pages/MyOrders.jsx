// import React, { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { fetchUserOrders } from "../../../redux/slice/orderSlice";

// const MyOrders = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { orders, loading, error } = useSelector((state) => state.order);

//   useEffect(() => {
//     dispatch(fetchUserOrders());
//   }, [dispatch]);

//   const handleRowClick = (id) => {
//     navigate(`/order/${id}`);
//   };

//   if (loading) {
//     return <p>Loading..</p>;
//   }

//   if (error) {
//     return <p>Error : {error}</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6">
//       <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
//       <div className="relative shadow-md sm:rounded-lg overflow-hidden">
//         <table className="min-w-full text-left text-gray-500">
//           <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//             <tr>
//               <th className="py-2 px-4 sm:py-3 ">Image</th>
//               <th className="py-2 px-4 sm:py-3 ">Order ID</th>
//               <th className="py-2 px-4 sm:py-3 ">Created</th>
//               <th className="py-2 px-4 sm:py-3 ">Shipping Address</th>
//               <th className="py-2 px-4 sm:py-3 ">Items</th>
//               <th className="py-2 px-4 sm:py-3 ">Price</th>
//               <th className="py-2 px-4 sm:py-3 ">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr
//                   key={order._id}
//                   onClick={() => handleRowClick(order._id)}
//                   className="border-b hover: border-gray-50 cursor-pointer"
//                 >
//                   <td className="py-2 sm:py-4 sm:px-4">
//                     <img
//                       src={order.orderItems[0].images}
//                       alt={order.orderItems[0].name}
//                       className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
//                     />
//                   </td>
//                   <td className="py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
//                     #{order._id}
//                   </td>
//                   <td className="py-2 px-2 sm:py-4 sm:px-4">
//                     {new Date(order.createdAt).toLocaleDateString()}{" "}
//                     {new Date(order.createdAt).toLocaleTimeString()}{" "}
//                   </td>
//                   <td className="py-2 px-2 sm:py-4 sm:px-4">
//                     {order.shippingAddress
//                       ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
//                       : "N/A"}
//                   </td>
//                   <td className="py-2 px-2 sm:py-4 sm:px-4">
//                     {order.orderItems.length}
//                   </td>
//                   <td className="py-2 px-2 sm:py-4 sm:px-4">
//                     ${order.totalPrice}
//                   </td>
//                   <td className="py-2 px-2 sm:py-4 sm:px-4">
//                     <span
//                       className={`${
//                         order.isPaid
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
//                     >
//                       {order.isPaid ? "Paid" : "Pending"}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
//                   You have no orders
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/common/CustomTable";
import { fetchUserOrders } from "../../../redux/slice/orderSlice";

const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders = [], loading, error } = useSelector((state) => state.order);

  /* ---------------- FETCH ORDERS ---------------- */
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  /* ---------------- VIEW ORDER ---------------- */
  const handleViewOrder = (id) => {
    navigate(`/order/${id}`);
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      title: "Image",
      key: "image",
      render: (row) => (
        <img
          src={row.orderItems?.[0]?.images}
          alt={row.orderItems?.[0]?.name}
          className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
        />
      ),
    },
    {
      title: "Order ID",
      key: "_id",
      render: (row) => (
        <span className="font-medium text-gray-900">#{row._id}</span>
      ),
    },
    {
      title: "Created",
      key: "createdAt",
      render: (row) => (
        <>
          {new Date(row.createdAt).toLocaleDateString()}{" "}
          {new Date(row.createdAt).toLocaleTimeString()}
        </>
      ),
    },
    {
      title: "Shipping Address",
      key: "shippingAddress",
      render: (row) =>
        row.shippingAddress
          ? `${row.shippingAddress.city}, ${row.shippingAddress.country}`
          : "N/A",
    },
    {
      title: "Items",
      key: "items",
      render: (row) => row.orderItems?.length || 0,
    },
    {
      title: "Price",
      key: "totalPrice",
      render: (row) => `₹${row.totalPrice}`,
    },
    {
      title: "Status",
      key: "isPaid",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium
            ${
              row.isPaid
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {row.isPaid ? "Paid" : "Pending"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => {
            // console.log("row", row._id);

            handleViewOrder(row._id);
          }}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          View
        </button>
      ),
    },
  ];

  /* ---------------- ERROR STATE ---------------- */
  if (error) {
    return <div className="p-6 text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <CustomTable
        columns={columns}
        data={orders}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}
        maxHeight={800}
      />
    </div>
  );
};

export default MyOrders;
