import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../components/common/CustomTable";

import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
} from "../../../redux/slice/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const {
    users = [],
    loading,
    error,
    page,
    totalPages,
  } = useSelector((state) => state.admin);

  const [currentPage, setCurrentpage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -------------------- AUTH GUARD -------------------- */
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  /* -------------------- FETCH USERS -------------------- */
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchUsers({ page: currentPage, limit: rowsPerPage }));
    }
  }, [dispatch, user]);

  /* -------------------- FORM STATE -------------------- */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  /* -------------------- ACTIONS -------------------- */
  const handleRoleChange = (id, role) => {
    dispatch(updateUser({ id, role }));
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  /* -------------------- TABLE COLUMNS -------------------- */
  const columns = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      render: (row) => (
        <select
          value={row.role}
          onChange={(e) => handleRoleChange(row._id, e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (row) => (
        <button
          onClick={() => handleDeleteUser(row._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  /* -------------------- UI STATES -------------------- */
  if (error) {
    return <div className="p-6 text-red-500 font-semibold">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* -------------------- ADD USER -------------------- */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New User</h3>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* -------------------- USER TABLE -------------------- */}
      <CustomTable
        columns={columns}
        data={users}
        loading={loading}
        // pageSizeOptions={[10, 20, 50]}
        // maxHeight={800}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setCurrentpage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
};

export default UserManagement;
