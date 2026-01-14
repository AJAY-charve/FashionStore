import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FilterSidebar from "../Products/FilterSidebar";
import SortOption from "../Products/SortOption";
import ProductGrid from "../Products/ProductGrid";
import { fetchProductByFilters } from "../../../redux/slice/productSlice";

const Collection = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(fetchProductByFilters({ collection, ...queryParams }));
  }, [collection, searchParams, dispatch]);

  // close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="lg:hidden fixed bottom-4 left-4 z-50 bg-black text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
      >
        <FaFilter />
        Filter
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white border-r shadow-lg
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <FilterSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <main className="flex-1  h-[1000px] overflow-y-auto c p-4 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold uppercase tracking-wide">
            All Collection
          </h1>
          <SortOption />
        </div>

        <ProductGrid products={products} loading={loading} error={error} />
      </main>
    </div>
  );
};
export default Collection;
