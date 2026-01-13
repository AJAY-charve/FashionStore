// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchAllOrders,
//   updateOrderStatus,
// } from "../../../redux/slice/adminOrderSlice";

// const OrderManagement = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);
//   const { orders, loading, error } = useSelector((state) => state.adminOrders);

//   useEffect(() => {
//     if (user && user.role !== "admin") {
//       navigate("/");
//     } else {
//       dispatch(fetchAllOrders());
//     }
//   }, [dispatch, user, navigate]);

//   const handleStatusChange = (orderId, status) => {
//     // console.log(orderId, status);
//     dispatch(updateOrderStatus({ id: orderId, status }));
//   };

//   if (loading) {
//     return <p>Loading..</p>;
//   }

//   if (error) {
//     return <p>Error : {error}</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Order Management</h2>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg ">
//         <table className="min-w-full text-left text-gray-500">
//           <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//             <tr>
//               <th className="py-3 px-4">Order ID</th>
//               <th className="py-3 px-4">Customer</th>
//               <th className="py-3 px-4">Total Price</th>
//               <th className="py-3 px-4">Status</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <tr
//                   key={order._id}
//                   className="border-b hover:text-gray-50 cursor-pointer"
//                 >
//                   <td className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">
//                     #{order._id}
//                   </td>
//                   <td className="p-4">{order.user.name}</td>
//                   <td className="p-4">${order.totalPrice.toFixed(2)}</td>
//                   <td className="p-4">
//                     <select
//                       value={order.status}
//                       onChange={(e) =>
//                         handleStatusChange(order._id, e.target.value)
//                       }
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
//                        rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
//                     >
//                       <option value="Processing">Processing</option>
//                       <option value="Shipped">Shipped</option>
//                       <option value="Delivered">Delivered</option>
//                       <option value="Cancelled">Cancelled</option>
//                     </select>
//                   </td>
//                   <td className="p-4">
//                     <button
//                       onClick={() => handleStatusChange(order._id, "Delivered")}
//                       className="bg-green-500 text-white px-4 py-2 ruonded hover:bg-green-600"
//                     >
//                       Mark as Delivered
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="p-4 text-center text-gray-500">
//                   No Orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderManagement;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import CustomTable from "../../components/common/CustomTable";

// import {
//   fetchAllOrders,
//   updateOrderStatus,
// } from "../../../redux/slice/adminOrderSlice";

// const OrderManagement = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);
//   const {
//     orders = [],
//     loading,
//     error,
//   } = useSelector((state) => state.adminOrders);

//   /* ---------------- ADMIN GUARD + FETCH ---------------- */
//   useEffect(() => {
//     if (user && user.role !== "admin") {
//       navigate("/");
//     } else if (user?.role === "admin") {
//       dispatch(fetchAllOrders());
//     }
//   }, [dispatch, user, navigate]);

//   /* ---------------- ACTIONS ---------------- */
//   const handleStatusChange = (orderId, status) => {
//     dispatch(updateOrderStatus({ id: orderId, status }));
//   };

//   /* ---------------- TABLE COLUMNS ---------------- */
//   const columns = [
//     {
//       title: "Order ID",
//       key: "_id",
//       render: (row) => (
//         <span className="font-medium text-gray-900">#{row._id}</span>
//       ),
//     },
//     {
//       title: "Customer",
//       key: "user",
//       render: (row) => row.user?.name || "N/A",
//     },
//     {
//       title: "Total Price",
//       key: "totalPrice",
//       render: (row) => `₹${row.totalPrice.toFixed(2)}`,
//     },
//     {
//       title: "Status",
//       key: "status",
//       render: (row) => (
//         <select
//           value={row.status}
//           onChange={(e) => handleStatusChange(row._id, e.target.value)}
//           className="border rounded px-2 py-1 text-sm bg-white"
//         >
//           <option value="Processing">Processing</option>
//           <option value="Shipped">Shipped</option>
//           <option value="Delivered">Delivered</option>
//           <option value="Cancelled">Cancelled</option>
//         </select>
//       ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (row) => (
//         <button
//           onClick={() => handleStatusChange(row._id, "Delivered")}
//           disabled={row.status === "Delivered"}
//           className={`px-3 py-1 rounded text-sm text-white
//             ${
//               row.status === "Delivered"
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//         >
//           Mark Delivered
//         </button>
//       ),
//     },
//   ];

//   /* ---------------- ERROR STATE ---------------- */
//   if (error) {
//     return <div className="p-6 text-red-500 font-semibold">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6">
//       <h2 className="text-2xl font-bold mb-6">Order Management</h2>

//       <CustomTable
//         columns={columns}
//         data={orders}
//         loading={loading}
//         pageSizeOptions={[10, 20, 50]}
//         maxHeight={800}
//       />
//     </div>
//   );
// };

// export default OrderManagement;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import CustomTable from "../../components/common/CustomTable";
import {
  fetchAllOrders,
  updateOrderStatus,
  clearStatus,
} from "../../../redux/slice/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    orders = [],
    loading,
    error,
    successMessage,
  } = useSelector((state) => state.adminOrders);

  /* ================= ADMIN GUARD ================= */
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    } else if (user?.role === "admin") {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  /* ================= TOAST HANDLER ================= */
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(clearStatus());
    }

    if (error) {
      toast.error(error);
      dispatch(clearStatus());
    }
  }, [successMessage, error, dispatch]);

  /* ================= ACTIONS ================= */
  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "Order ID",
      key: "_id",
      render: (row) => (
        <span className="font-medium text-gray-900">#{row._id}</span>
      ),
    },
    {
      title: "Customer",
      key: "user",
      render: (row) => row.user?.name || "N/A",
    },
    {
      title: "Total Price",
      key: "totalPrice",
      render: (row) => `₹${row.totalPrice.toFixed(2)}`,
    },
    {
      title: "Status",
      key: "status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          disabled={loading}
          className="border rounded px-2 py-1 text-sm bg-white"
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => handleStatusChange(row._id, "Delivered")}
          disabled={row.status === "Delivered" || loading}
          className={`px-3 py-1 rounded text-sm text-white
            ${
              row.status === "Delivered"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
        >
          Mark Delivered
        </button>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

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

export default OrderManagement;
