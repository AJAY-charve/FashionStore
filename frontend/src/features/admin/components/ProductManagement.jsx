// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import CustomTable from "../../components/common/CustomTable";

// import {
//   deleteProduct,
//   fetchAdminProducts,
// } from "../../../redux/slice/adminProductSlice";

// const ProductManagement = () => {
//   const dispatch = useDispatch();

//   const {
//     products = [],
//     loading,
//     error,
//   } = useSelector((state) => state.adminProducts);

//   /* ---------------- FETCH PRODUCTS ---------------- */
//   useEffect(() => {
//     dispatch(fetchAdminProducts());
//   }, [dispatch]);

//   /* ---------------- ACTIONS ---------------- */
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   /* ---------------- TABLE COLUMNS ---------------- */
//   const columns = [
//     {
//       title: "Name",
//       key: "name",
//     },
//     {
//       title: "Price",
//       key: "price",
//       render: (row) => `₹${row.price}`,
//     },
//     {
//       title: "SKU",
//       key: "sku",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (row) => (
//         <div className="flex gap-2">
//           <Link
//             to={`/admin/products/${row._id}/edit`}
//             className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
//           >
//             Edit
//           </Link>
//           <button
//             onClick={() => handleDelete(row._id)}
//             className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   /* ---------------- ERROR STATE ---------------- */
//   if (error) {
//     return <div className="p-6 text-red-500 font-semibold">Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-4 sm:p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <h2 className="text-2xl font-bold">Product Management</h2>

//         <Link
//           to="/admin/products/create"
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           + Add Product
//         </Link>
//       </div>

//       {/* Product Table */}
//       <CustomTable
//         columns={columns}
//         data={products}
//         loading={loading}
//         pageSizeOptions={[10, 20, 50]}
//         maxHeight={800}
//       />
//     </div>
//   );
// };

// export default ProductManagement;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomTable from "../../components/common/CustomTable";
import {
  fetchAdminProducts,
  deleteProduct,
} from "../../../redux/slice/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();

  const { products, loading, page, totalPages } = useSelector(
    (state) => state.adminProducts
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchAdminProducts({ page: currentPage, limit: rowsPerPage }));
  }, [dispatch, currentPage, rowsPerPage]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const columns = [
    { title: "Name", key: "name" },
    {
      title: "Price",
      key: "price",
      render: (row) => `₹${row.price}`,
    },
    { title: "SKU", key: "sku" },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/products/${row._id}/edit`}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(row._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Link
          to="/admin/products/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      <CustomTable
        columns={columns}
        data={products}
        loading={loading}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default ProductManagement;
