// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // fetct all orders
// export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders",
//     async (_DO_NOT_USE_ActionTypes, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`
//                     }
//                 }
//             )
//             return response.data
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue(error.response.data)
//         }
//     }
// ) 

// // update order delevery status
// export const updateOrderStatus = createAsyncThunk("adminOrders/updateOrderStatus",
//     async ({ id, status }, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//                 { status },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`
//                     }
//                 }
//             )
//             return response.data
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue(error.response.data)
//         }
//     }
// )


// // delete an order
// export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder",
//     async (id, { rejectWithValue }) => {
//         try {
//             await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`
//                     }
//                 }
//             )
//             return id
//         } catch (error) {
//             console.error(error);
//             return rejectWithValue(error.response.data)
//         }
//     }
// )



// const adminOrderSlice = createSlice({
//     name: "adminOrder",
//     initialState: {
//         orders: [],
//         totalOrder: 0,
//         totalSales: 0,
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // fetch all orders
//             .addCase(fetchAllOrders.pending, (state) => {
//                 state.loading = true,
//                     state.error = null
//             })
//             .addCase(fetchAllOrders.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.orders = action.payload
//                 state.totalOrder = action.length

//                 // calculate for total sales
//                 const totalSales = action.payload((acc, order) => {
//                     return acc + order.totalPrice
//                 })
//                 state.totalSales = totalSales
//             })
//             .addCase(fetchAllOrders.rejected, (state) => {
//                 state.loading = false
//                 state.error = action.payload.message
//             })

//             //update order status
//             .addCase(updateOrderStatus.fulfilled, (state, action) => {
//                 const updatedOrder = action.payload
//                 const orderIndex = state.orders.findIndex((order) => order._id === updatedOrder._id)
//                 if (orderIndex !== -1) {
//                     state.orders[index] = updatedOrder
//                 }

//             })

//             // delete order
//             .addCase(deleteOrder.fulfilled, (state, action) => {
//                 state.orders = state.orders.filter((order) => order._id !== action.payload._id)
//             })
//     }
// })

// export default adminOrderSlice.reducer


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`;

// /* =========================
//    FETCH ALL ORDERS (ADMIN)
// ========================= */
// export const fetchAllOrders = createAsyncThunk(
//     "adminOrders/fetchAllOrders",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(API_URL, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                 },
//             });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to fetch orders");
//         }
//     }
// );

// /* =========================
//    UPDATE ORDER STATUS
// ========================= */
// export const updateOrderStatus = createAsyncThunk(
//     "adminOrders/updateOrderStatus",
//     async ({ id, status }, { rejectWithValue }) => {
//         try {
//             const response = await axios.put(
//                 `${API_URL}/${id}`,
//                 { status },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                     },
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to update order");
//         }
//     }
// );

// /* =========================
//    DELETE ORDER
// ========================= */
// export const deleteOrder = createAsyncThunk(
//     "adminOrders/deleteOrder",
//     async (id, { rejectWithValue }) => {
//         try {
//             await axios.delete(`${API_URL}/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//                 },
//             });
//             return id;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to delete order");
//         }
//     }
// );

// /* =========================
//    SLICE
// ========================= */
// const adminOrderSlice = createSlice({
//     name: "adminOrders",
//     initialState: {
//         orders: [],
//         totalOrders: 0,
//         totalSales: 0,
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             /* FETCH ALL ORDERS */
//             .addCase(fetchAllOrders.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchAllOrders.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.orders = action.payload;
//                 state.totalOrders = action.payload.length;

//                 state.totalSales = action.payload.reduce(
//                     (acc, order) => acc + Number(order.totalPrice),
//                     0
//                 );
//             })
//             .addCase(fetchAllOrders.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })

//             /* UPDATE ORDER STATUS */
//             .addCase(updateOrderStatus.fulfilled, (state, action) => {
//                 const updatedOrder = action.payload;
//                 const index = state.orders.findIndex(
//                     (order) => order._id === updatedOrder._id
//                 );
//                 if (index !== -1) {
//                     state.orders[index] = updatedOrder;
//                 }
//             })

//             /* DELETE ORDER */
//             .addCase(deleteOrder.fulfilled, (state, action) => {
//                 state.orders = state.orders.filter(
//                     (order) => order._id !== action.payload
//                 );
//                 state.totalOrders = state.orders.length;

//                 state.totalSales = state.orders.reduce(
//                     (acc, order) => acc + Number(order.totalPrice),
//                     0
//                 );
//             });
//     },
// });

// export default adminOrderSlice.reducer;




import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`;

/* =========================
   FETCH ALL ORDERS (ADMIN)
========================= */
export const fetchAllOrders = createAsyncThunk(
    "adminOrders/fetchAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to fetch orders"
            );
        }
    }
);

/* =========================
   UPDATE ORDER STATUS
========================= */
export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrderStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${API_URL}/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to update order status"
            );
        }
    }
);

/* =========================
   DELETE ORDER
========================= */
export const deleteOrder = createAsyncThunk(
    "adminOrders/deleteOrder",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Failed to delete order"
            );
        }
    }
);

/* =========================
   SLICE
========================= */
const adminOrderSlice = createSlice({
    name: "adminOrders",
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearStatus(state) {
            state.error = null;
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            /* FETCH ALL ORDERS */
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
                state.totalSales = action.payload.reduce(
                    (acc, order) => acc + Number(order.totalPrice),
                    0
                );
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* UPDATE ORDER STATUS */
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;

                const index = state.orders.findIndex(
                    (order) => order._id === updatedOrder._id
                );
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }

                state.successMessage = "Order status updated successfully";
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            /* DELETE ORDER */
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter(
                    (order) => order._id !== action.payload
                );
                state.totalOrders = state.orders.length;
                state.totalSales = state.orders.reduce(
                    (acc, order) => acc + Number(order.totalPrice),
                    0
                );
                state.successMessage = "Order deleted successfully";
            });
    },
});

export const { clearStatus } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
