// import React from "react";
// import { HiRadio } from "react-icons/hi2";
// import { useDispatch } from "react-redux";
// import {
//   removeFromCart,
//   updateCartItemQuantity,
// } from "../../redux/slice/cartSlice";

// const CartContents = ({ cart, userId, guestId }) => {
//   const dispatch = useDispatch();
//   // console.log("cart", cart);

//   const handleAddToCart = (productId, delta, quantity, size, color) => {
//     // console.log(productId, delta, quantity, size, color, guestId, userId);

//     const newQuantity = quantity + delta;
//     // console.log("newQuanity", newQuantity);

//     if (newQuantity >= 1) {
//       dispatch(
//         updateCartItemQuantity({
//           productId,
//           quantity: newQuantity,
//           guestId,
//           userId,
//           size,
//           color,
//         })
//       );
//     }
//   };

//   const handleRemoveFromCart = (productId, size, color) => {
//     dispatch(
//       removeFromCart({
//         productId,
//         guestId,
//         userId,
//         size,
//         color,
//       })
//     );
//   };

//   return (
//     <div>
//       {cart.products.map((product, index) => (
//         <div
//           key={index}
//           className="flex items-start justify-between py-4 border-b"
//         >
//           <div className="flex items-start">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-20 h-24 object-cover mr-4"
//             />
//             <div>
//               <h3>{product.name}</h3>
//               <p className="text-sm text-gray-500">
//                 size : {product.size} | color : {product.color}
//               </p>
//               <div className="flex items-center mt-2">
//                 <button
//                   onClick={() =>
//                     handleAddToCart(
//                       product.productId,
//                       -1,
//                       product.quantity,
//                       product.size,
//                       product.color
//                     )
//                   }
//                   className="border rounded px-2 py-1 text-xl font-medium"
//                 >
//                   -
//                 </button>
//                 <span className="mx-4">{product.quantity}</span>
//                 <button
//                   onClick={() =>
//                     handleAddToCart(
//                       product.productId,
//                       1,
//                       product.quantity,
//                       product.size,
//                       product.color
//                     )
//                   }
//                   className="border rounded px-2 py-1 text-xl font-medium"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div>
//             <p>$ {product.price.toLocaleString()}</p>
//             <button
//               onClick={() =>
//                 handleRemoveFromCart(
//                   product.productId,
//                   product.size,
//                   product.color
//                 )
//               }
//               type="button"
//             >
//               <HiRadio className="h-6 w-6 mt-2 text-red-600" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartContents;

// CartContents.js (Updated)
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../../redux/slice/cartSlice";
import axios from "axios";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = async (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  // const handleRemoveFromCart = async (productId, size, color) => {
  //   try {
  //     const res = await axios.delete("http://localhost:9000/api/cart", {
  //       data: {
  //         userId,
  //         productId,
  //         size,
  //         color,
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err.response?.data || err.message);
  //   }
  // };

  return (
    <div className="space-y-4">
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex justify-between items-start gap-4 border-b pb-4"
        >
          <div className="flex gap-4 items-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover rounded"
            />
            <div className="flex flex-col justify-between">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="mx-3">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-lg font-medium hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-semibold">$ {product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
              className="mt-2 hover:text-red-700 transition"
            >
              <HiOutlineTrash className="h-6 w-6 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
