// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // fetch products by collection and optional filters
// export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts",
//     async () => {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`
//                 }
//             }
//         )
//         return response.data
//     }
// )


// export const createProduct = createAsyncThunk("adminProdcuts/createProduct",
//     async ({ productData }, { rejectWithValue }) => {

//         // console.log("productData", productData);


//         try {
//             const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`,
//                 productData,
//                 // {
//                 //     "name": "Men Cotton T-Shirt",
//                 //     "description": "Premium quality cotton t-shirt for daily wear",
//                 //     "price": 999,
//                 //     "discountPrice": 799,
//                 //     "countInStock": 50,
//                 //     "sku": "TSHIRT-MEN-001",
//                 //     "category": "Clothing",
//                 //     "brand": "UrbanStyle",
//                 //     "sizes": [
//                 //         "S",
//                 //         "M",
//                 //         "L",
//                 //         "XL"
//                 //     ],
//                 //     "colors": [
//                 //         "Black",
//                 //         "White",
//                 //         "Navy Blue"
//                 //     ],
//                 //     "collections": "Summer 2025",
//                 //     "material": "100% Cotton",
//                 //     "gender": "Men",
//                 //     "images": [
//                 //         {
//                 //             "url": "https://picsum.photos/150?random=1040",
//                 //             "altText": "Front view of t-shirt",
//                 //             "_id": "696261a71d3153794e6e72e8"
//                 //         },
//                 //         {
//                 //             "url": "https://picsum.photos/150?random=1000",
//                 //             "altText": "Back view of t-shirt",
//                 //             "_id": "696261a71d3153794e6e72e9"
//                 //         }
//                 //     ],
//                 //     "isFeatured": true,
//                 //     "isPublished": true,
//                 //     "rating": 0,
//                 //     "numReviews": 0,
//                 //     "tags": [
//                 //         "tshirt",
//                 //         "men",
//                 //         "cotton",
//                 //         "summer"
//                 //     ],
//                 //     "user": "69621b92c694d969c770690f",
//                 //     "_id": "696261a71d3153794e6e72e7",
//                 //     "createdAt": "2026-01-10T14:26:47.571Z",
//                 //     "updatedAt": "2026-01-10T14:26:47.571Z",
//                 //     "__v": 0
//                 // },
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

// export const updateProduct = createAsyncThunk("adminProdcuts/updateProduct",
//     async ({ id, productData }) => {
//         const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
//             productData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`
//                 }
//             }
//         )
//         return response.data
//     }
// )

// export const deleteProduct = createAsyncThunk("adminProdcuts/deleteProduct",
//     async (id) => {
//         const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("userToken")}`
//                 }
//             }
//         )
//         return id
//     }
// )


// const adminProductSlice = createSlice({
//     name: "adminProducts",
//     initialState: {
//         products: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAdminProducts.pending, (state) => {
//                 state.loading = true
//             })
//             .addCase(fetchAdminProducts.fulfilled, (state, action) => {
//                 state.loading = false
//                 state.products = action.payload
//             })
//             .addCase(fetchAdminProducts.rejected, (state) => {
//                 state.loading = false
//                 state.error = action.error.message
//             })
//             //create product
//             // .addCase(createProduct.fulfilled, (state, action) => {
//             //     state.products = push(action.payload)
//             // })
//             .addCase(createProduct.fulfilled, (state, action) => {
//                 state.products.push(action.payload);
//             })

//             // update product
//             .addCase(updateProduct.fulfilled, (state, action) => {
//                 const index = state.products.findIndex((product) => product._id === action.payload._id)
//                 if (index !== -1) {
//                     state.products[index] = action.payload
//                 }
//             })
//             // delete product
//             // .addCase(deleteProduct.fulfilled, (state, action) => {
//             //     state.products = state.products.filter((product) => product._id === action.payload._id)
//             // })

//             .addCase(deleteProduct.fulfilled, (state, action) => {
//                 state.products = state.products.filter(
//                     (product) => product._id !== action.payload
//                 );
//             });

//     }
// })

// export default adminProductSlice.reducer











import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ---------------- FETCH PRODUCTS ---------------- */
export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchProducts",
    async ({ page = 1, limit = 10 }) => {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products?page=${page}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return response.data;
    }
);



export const createProduct = createAsyncThunk("adminProdcuts/createProduct",
    async ({ productData }, { rejectWithValue }) => {

        // console.log("productData", productData);


        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`,
                productData,
                // {
                //     "name": "Men Cotton T-Shirt",
                //     "description": "Premium quality cotton t-shirt for daily wear",
                //     "price": 999,
                //     "discountPrice": 799,
                //     "countInStock": 50,
                //     "sku": "TSHIRT-MEN-001",
                //     "category": "Clothing",
                //     "brand": "UrbanStyle",
                //     "sizes": [
                //         "S",
                //         "M",
                //         "L",
                //         "XL"
                //     ],
                //     "colors": [
                //         "Black",
                //         "White",
                //         "Navy Blue"
                //     ],
                //     "collections": "Summer 2025",
                //     "material": "100% Cotton",
                //     "gender": "Men",
                //     "images": [
                //         {
                //             "url": "https://picsum.photos/150?random=1040",
                //             "altText": "Front view of t-shirt",
                //             "_id": "696261a71d3153794e6e72e8"
                //         },
                //         {
                //             "url": "https://picsum.photos/150?random=1000",
                //             "altText": "Back view of t-shirt",
                //             "_id": "696261a71d3153794e6e72e9"
                //         }
                //     ],
                //     "isFeatured": true,
                //     "isPublished": true,
                //     "rating": 0,
                //     "numReviews": 0,
                //     "tags": [
                //         "tshirt",
                //         "men",
                //         "cotton",
                //         "summer"
                //     ],
                //     "user": "69621b92c694d969c770690f",
                //     "_id": "696261a71d3153794e6e72e7",
                //     "createdAt": "2026-01-10T14:26:47.571Z",
                //     "updatedAt": "2026-01-10T14:26:47.571Z",
                //     "__v": 0
                // },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            return response.data
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateProduct = createAsyncThunk("adminProdcuts/updateProduct",
    async ({ id, productData }) => {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
    }
)

/* ---------------- DELETE PRODUCT ---------------- */
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id) => {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
        );
        return id;
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        page: 1,
        totalPages: 1,
        totalProducts: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.page = action.payload.page;
                state.totalPages = action.payload.totalPages;
                state.totalProducts = action.payload.totalProducts;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //create product
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
            })

            // update product
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((product) => product._id === action.payload._id)
                if (index !== -1) {
                    state.products[index] = action.payload
                }
            })

            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(
                    (p) => p._id !== action.payload
                );
            });
    },
});

export default adminProductSlice.reducer;
