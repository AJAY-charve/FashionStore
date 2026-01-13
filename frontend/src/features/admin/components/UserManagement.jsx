// import React, { useState } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   addUser,
//   deleteUser,
//   fetchUsers,
//   updateUser,
// } from "../../../redux/slice/adminSlice";

// const UserManagement = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.auth);
//   const { users, loading, error } = useSelector((state) => state.admin);

//   useEffect(() => {
//     if (user && user.role !== "admin") {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   useEffect(() => {
//     if (user && user.role === "admin") {
//       dispatch(fetchUsers());
//     }
//   }, [dispatch, user]);

//   const [formData, setFromData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "customer",
//   });

//   const handleChange = (e) => {
//     setFromData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(formData);
//     dispatch(addUser(formData));

//     setFromData({
//       name: "",
//       email: "",
//       password: "",
//       role: "customer",
//     });
//   };

//   const handleRoleChange = (id, newRole) => {
//     // console.log(id, newRole);
//     dispatch(updateUser({ id: id, role: newRole }));
//   };

//   const handleDeleteUser = (id) => {
//     if (window.confirm("Are your sure want to delete this user")) {
//       // console.log("deleting user with id", id);
//       dispatch(deleteUser(id));
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
//       <h2 className="text-2xl font-bold mb-4">User Management</h2>
//       {/* add new user form */}
//       <div className="p-6 rounded-lg mb-6">
//         <h3 className="text-lg font-bold mb-4">Add New User</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Role</label>
//             <select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="customer">Customer</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//           >
//             Add User
//           </button>
//         </form>
//       </div>

//       {/* user list management */}
//       <div className="overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="min-w-full text-left text-gray-500">
//           <thead className="bg-gray-100 text-xs uppercase text-gray-700">
//             <tr>
//               <th className="py-3 px-4">Name</th>
//               <th className="py-3 px-4">Email</th>
//               <th className="py-3 px-4">Role</th>
//               <th className="py-3 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id} className="border-b hover:bg-gray-50">
//                 <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
//                   {user.name}
//                 </td>
//                 <td className="p-4 ">{user.email}</td>
//                 <td className="p-4 ">
//                   <select
//                     value={user.role}
//                     onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                     className="p-2 border rounded"
//                   >
//                     <option value="customer">Customer</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </td>
//                 <td className="p-4 ">
//                   <button
//                     onClick={() => handleDeleteUser(user._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

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
  const { users = [], loading, error } = useSelector((state) => state.admin);

  /* -------------------- AUTH GUARD -------------------- */
  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  /* -------------------- FETCH USERS -------------------- */
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(fetchUsers());
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
        pageSizeOptions={[10, 20, 50]}
        maxHeight={800}
      />
    </div>
  );
};

export default UserManagement;
