// import React from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   deleteProduct,
//   fetchAdminProducts,
// } from "../../../redux/slice/adminProductSlice";

// const ProductManagement = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // const { user } = useSelector((state) => state.auth);
//   const { products, loading, error } = useSelector(
//     (state) => state.adminProducts
//   );

//   useEffect(() => {
//     dispatch(fetchAdminProducts());
//   }, [dispatch]);

//   const handleDelte = (id) => {
//     if (window.confirm("Are you sure you want to delete the Product")) {
//       // console.log("Delete Product with id", id);
//       dispatch(deleteProduct(id));
//     }
//   };

//   if (loading) {
//     return <p>Loading..</p>;
//   }

//   if (error) {
//     return <p>Error : {error}</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-6">Product Management</h2>
//       <Link
//         to="/admin/products/create"
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         + Add Product
//       </Link>
//       <div className="overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="min-w-full text-left text-gray-500">
//           <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//             <tr>
//               <th className="py-3 px-4">Name</th>
//               <th className="py-3 px-4">Price</th>
//               <th className="py-3 px-4">SKU</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <tr
//                   key={product._id}
//                   className="border-b hover:bg-gray-50 cursor-pointer"
//                 >
//                   <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
//                     {product.name}
//                   </td>
//                   <td className="p-4">${product.price}</td>
//                   <td className="p-4">{product.sku}</td>
//                   <td className="p-4">
//                     <Link
//                       to={`/admin/products/${product._id}/edit`}
//                       className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelte(product._id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                     >
//                       Delet
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={4} className="p-4 text-center text-gray-500">
//                   No Products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ProductManagement;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomTable from "../../components/common/CustomTable";

import {
  deleteProduct,
  fetchAdminProducts,
} from "../../../redux/slice/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.adminProducts);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  /* ---------------- ACTIONS ---------------- */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Price",
      key: "price",
      render: (row) => `₹${row.price}`,
    },
    {
      title: "SKU",
      key: "sku",
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/products/${row._id}/edit`}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  /* ---------------- ERROR STATE ---------------- */
  if (error) {
    return <div className="p-6 text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>

        <Link
          to="/admin/products/create"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </Link>
      </div>

      {/* Product Table */}
      <CustomTable
        columns={columns}
        data={products}
        loading={loading}
        pageSizeOptions={[10, 20, 50]}
        maxHeight={800}
      />
    </div>
  );
};

export default ProductManagement;
