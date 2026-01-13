import React, { useEffect, useState } from "react";
import Hero from "../Layout/Hero";
import GenderCollection from "../Products/GenderCollection";
import NewArrivals from "../Products/NewArrivals";
import ProductDetails from "../Products/ProductDetails";
import ProductGrid from "../Products/ProductGrid";
import FeaturedCollection from "../Products/FeaturedCollection";
import FeaturesSection from "../Products/FeaturesSection";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../../../redux/slice/productSlice";

// const placeholderProducts = [
//   {
//     _id: "1",
//     name: "Product 1",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?rondom=21",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "10",
//     name: "Product 1",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?rondom=122",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "12",
//     name: "Product 1",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?rondom=123",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
//   {
//     _id: "10",
//     name: "Product 13",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?rondom=132",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },

//   {
//     _id: "150",
//     name: "Product 13",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?rondom=1342",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },

//   {
//     _id: "160",
//     name: "Product 13",
//     price: 100,
//     images: [
//       {
//         url: "https://picsum.photos/500/500?rondom=1732",
//         altText: "Stylish Jacket",
//       },
//     ],
//   },
// ];

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        // console.log("Best Seller API data:", response.data);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  // console.log("bestSeller", bestSellerProduct);

  return (
    <div>
      <Hero />
      {/* <GenderCollection />
      <NewArrivals /> */}

      {/* Best Saller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller products</p>
      )}

      {/* <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection /> */}
    </div>
  );
};

export default Home;
