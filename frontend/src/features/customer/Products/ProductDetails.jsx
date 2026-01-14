import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../../redux/slice/productSlice";

import { addToCart } from "../../../redux/slice/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  // console.log("productId", productId);

  // console.log("selectedProduct", selectedProduct);

  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuanity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails({ id: productFetchId }));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuanityChange = (action) => {
    if (action === "plus") setQuanity((prev) => prev + 1);
    if (action === "minus" && quantity > 1) setQuanity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a size and color before adding to cart..", {
        duration: 1000,
      });
    }

    setIsButtonDisabled(true);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
        // userId,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error}</p>;
  }

  return (
    <div className="p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* left thumbnail */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>
            {/* Main image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={mainImage}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* mobile thumbnail */}
            <div className="md:hidden flex overscroll-x-auto space-x-4 mb-4s">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url ? "border-black" : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            <div className="md:w-1/2 flex flex-col md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>
              <div className="flex items-baseline gap-3 mb-2">
                {selectedProduct.orignalPrice && (
                  <p className="text-lg text-gray-500 line-through">
                    ${selectedProduct.orignalPrice}
                  </p>
                )}
                <p className="text-xl text-black font-semibold">
                  ${selectedProduct.price}
                </p>
              </div>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>

              {/* Colors */}
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Color</p>
                <div className="flex gap-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColor === color
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Sizes</p>
                <div className="flex gap-2 flex-wrap">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">Quantity</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-3 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`w-full py-3 rounded text-white ${
                  isButtonDisabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-black hover:bg-gray-900"
                } mb-6`}
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </button>

              {/* Characteristics */}
              <div className="text-gray-700">
                <h3 className="text-xl font-bold mb-3">Characteristics</h3>
                <table className="w-full text-left text-sm">
                  <tbody>
                    <tr>
                      <td className="py-1 font-medium">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-medium">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Aslo Like
            </h2>
            {/* <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import { toast } from "sonner";
// import ProductGrid from "./ProductGrid";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductDetails,
//   fetchSimilarProducts,
// } from "../../redux/slice/productSlice";
// import { addToCart } from "../../redux/slice/cartSlice";

// const ProductDetails = ({ productId }) => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { selectedProduct, loading, error, similarProducts } = useSelector(
//     (state) => state.products
//   );

//   const { userId, guestId } = useSelector((state) => state.auth);
//   const [mainImage, setMainImage] = useState();
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

//   const productFetchId = productId || id;

//   useEffect(() => {
//     if (productFetchId) {
//       dispatch(fetchProductDetails({ id: productFetchId }));
//       dispatch(fetchSimilarProducts({ id: productFetchId }));
//     }
//   }, [dispatch, productFetchId]);

//   useEffect(() => {
//     if (selectedProduct?.images?.length > 0) {
//       setMainImage(selectedProduct.images[0].url);
//     }
//   }, [selectedProduct]);

//   const handleQuantityChange = (action) => {
//     if (action === "plus") setQuantity((prev) => prev + 1);
//     if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
//   };

//   const handleAddToCart = () => {
//     if (!selectedColor || !selectedSize) {
//       toast.error("Please select a size and color before adding to cart.", {
//         duration: 1000,
//       });
//       return;
//     }

//     setIsButtonDisabled(true);
//     dispatch(
//       addToCart({
//         productId: productFetchId,
//         quantity,
//         size: selectedSize,
//         color: selectedColor,
//         guestId,
//         userId,
//       })
//     )
//       .then(() => {
//         toast.success("Product added to cart!", {
//           duration: 1000,
//         });
//       })
//       .finally(() => {
//         setIsButtonDisabled(false);
//       });
//   };

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center mt-10">Error: {error}</p>;

//   return (
//     <div className="p-4 md:p-6 bg-gray-50">
//       {selectedProduct && (
//         <div
//           className="max-w-6xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md"
//         >
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Thumbnails - Desktop */}
//             <div className="hidden md:flex flex-col gap-4 w-20">
//               {selectedProduct.images.map((image, idx) => (
//                 <img
//                   key={idx}
//                   src={image.url}
//                   alt={image.altText || `Thumbnail ${idx}`}
//                   className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
//                     mainImage === image.url ? "border-black" : "border-gray-300"
//                   }`}
//                   onClick={() => setMainImage(image.url)}
//                 />
//               ))}
//             </div>

//             {/* Main Image */}
//             <div className="md:w-1/2 flex justify-center">
//               <img
//                 src={mainImage}
//                 alt="Main Product"
//                 className="w-full max-h-[400px] object-contain rounded-lg"
//               />
//             </div>

//             {/* Right Section */}
//             <div className="md:w-1/2 flex flex-col">
//               <h1 className="text-2xl md:text-3xl font-semibold mb-2">
//                 {selectedProduct.name}
//               </h1>
//               <div className="flex items-baseline gap-3 mb-2">
//                 {selectedProduct.orignalPrice && (
//                   <p className="text-lg text-gray-500 line-through">
//                     ${selectedProduct.orignalPrice}
//                   </p>
//                 )}
//                 <p className="text-xl text-black font-semibold">
//                   ${selectedProduct.price}
//                 </p>
//               </div>
//               <p className="text-gray-600 mb-4">
//                 {selectedProduct.description}
//               </p>

//               {/* Colors */}
//               <div className="mb-4">
//                 <p className="text-gray-700 mb-2">Color</p>
//                 <div className="flex gap-2">
//                   {selectedProduct.colors.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => setSelectedColor(color)}
//                       className={`w-8 h-8 rounded-full border-2 ${
//                         selectedColor === color
//                           ? "border-black"
//                           : "border-gray-300"
//                       }`}
//                       style={{ backgroundColor: color.toLowerCase() }}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Sizes */}
//               <div className="mb-4">
//                 <p className="text-gray-700 mb-2">Sizes</p>
//                 <div className="flex gap-2 flex-wrap">
//                   {selectedProduct.sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`px-4 py-2 rounded border ${
//                         selectedSize === size
//                           ? "bg-black text-white"
//                           : "bg-white text-black"
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Quantity */}
//               <div className="mb-6">
//                 <p className="text-gray-700 mb-2">Quantity</p>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => handleQuantityChange("minus")}
//                     className="px-3 py-1 bg-gray-200 rounded text-lg"
//                   >
//                     -
//                   </button>
//                   <span className="text-lg">{quantity}</span>
//                   <button
//                     onClick={() => handleQuantityChange("plus")}
//                     className="px-3 py-1 bg-gray-200 rounded text-lg"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Add to Cart */}
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isButtonDisabled}
//                 className={`w-full py-3 rounded text-white ${
//                   isButtonDisabled
//                     ? "bg-gray-500 cursor-not-allowed"
//                     : "bg-black hover:bg-gray-900"
//                 } mb-6`}
//               >
//                 {isButtonDisabled ? "Adding..." : "ADD TO CART"}
//               </button>

//               {/* Characteristics */}
//               <div className="text-gray-700">
//                 <h3 className="text-xl font-bold mb-3">Characteristics</h3>
//                 <table className="w-full text-left text-sm">
//                   <tbody>
//                     <tr>
//                       <td className="py-1 font-medium">Brand</td>
//                       <td className="py-1">{selectedProduct.brand}</td>
//                     </tr>
//                     <tr>
//                       <td className="py-1 font-medium">Material</td>
//                       <td className="py-1">{selectedProduct.material}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Thumbnails */}
//           <div className="md:hidden flex gap-2 overflow-x-auto mt-4 pb-2">
//             {selectedProduct.images.map((image, idx) => (
//               <img
//                 key={idx}
//                 src={image.url}
//                 alt={image.altText || `Thumbnail ${idx}`}
//                 className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
//                   mainImage === image.url ? "border-black" : "border-gray-300"
//                 }`}
//                 onClick={() => setMainImage(image.url)}
//               />
//             ))}
//           </div>

//           {/* Similar Products */}
//           <div className="mt-12">
//             <h2 className="text-2xl font-medium text-center mb-6">
//               You May Also Like
//             </h2>
//             <ProductGrid
//               products={similarProducts}
//               loading={loading}
//               error={error}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;
