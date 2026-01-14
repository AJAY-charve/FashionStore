import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAdminProducts } from "../../../redux/slice/adminProductSlice";
import { fetchAllOrders } from "../../../redux/slice/adminOrderSlice";
import CustomTable from "../../components/common/CustomTable";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading: productLoading } = useSelector(
    (state) => state.adminProducts
  );
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const orderColumns = [
    { header: "Order ID", accessor: "_id" },
    { header: "User", accessor: "users.name" },
    { header: "Total Price", accessor: "totalPrice" },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Action",
      cell: (row) => (
        <button
          onClick={() => navigate(`/admin/orders/${row._id}`)}
          className="text-blue-600 hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  if (productLoading || ordersLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ====== STATS ====== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹{totalSales.toFixed(2)}</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">{totalOrders}</p>
          <Link
            to="/admin/orders"
            className="text-blue-600 text-sm mt-2 inline-block"
          >
            Manage Orders →
          </Link>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-3xl font-bold mt-2">{products.length}</p>
          <Link
            to="/admin/products"
            className="text-blue-600 text-sm mt-2 inline-block"
          >
            Manage Products →
          </Link>
        </div>
      </div>

      {/* ====== RECENT ORDERS TABLE ====== */}
      {/* <div className="bg-white border rounded-xl p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <CustomTable
          columns={orderColumns}
          data={orders}
          rowsPerPageOptions={[10, 20, 50]}
          noDataText="No recent orders found"
          maxHeight="800px"
        />
      </div> */}
    </div>
  );
};

export default AdminHomePage;
