import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products = [], loading, error }) => {
  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!products.length) {
    return <p className="text-center mt-10">No products found</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="group"
        >
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-sm transition">
            <div className="h-48 overflow-hidden">
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                className="h-full w-full object-cover "
              />
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-1 text-gray-600 font-semibold">
                ₹{product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
