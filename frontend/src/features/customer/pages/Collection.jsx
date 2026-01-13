// import React, { useEffect, useRef, useState } from "react";
// import { FaFilter } from "react-icons/fa6";
// import FilterSidebar from "../components/Products/FilterSidebar";
// import SortOption from "../components/Products/SortOption";
// import ProductGrid from "../components/Products/ProductGrid";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductByFilters } from "../redux/slice/productSlice";

// const Collection = () => {
//   const { collection } = useParams();
//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   const sidebarRef = useRef(null);
//   const queryParams = Object.fromEntries([...searchParams]);

//   useEffect(() => {
//     dispatch(
//       fetchProductByFilters({
//         collection,
//         ...queryParams,
//       })
//     );
//   }, [dispatch, collection, searchParams]);

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleClickOutside = (e) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//       setIsSidebarOpen(false);
//     }
//   };

//   useEffect(() => {
//     // add event lister for click
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col lg:flex-row">
//       {/* Mobile filter */}
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden border p-2 flex justify-center items-center"
//       >
//         <FaFilter className="mr-2" />
//       </button>

//       {/* filter sidebar */}
//       <div
//         ref={sidebarRef}
//         className={`
//           fixed lg:static top-0 left-0 z-40 w-72 bg-white border-r
//           transform transition-transform duration-300
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0
//           h-full overflow-y-auto
//           pt-14 lg:pt-0
//         `}
//       >
//         <FilterSidebar />
//       </div>
//       <div className="flex-grow p-4">
//         <h2 className="text-2xl uppercase mb-4">All Collection</h2>

//         {/* Sort option */}
//         <SortOption />

//         {/* Product Preview */}
//         <ProductGrid products={products} loading={loading} error={error} />
//       </div>
//     </div>
//   );
// };

// export default Collection;

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

// import React, { useEffect, useRef, useState } from "react";
// import { FaFilter } from "react-icons/fa6";
// import { useParams, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import FilterSidebar from "../Products/FilterSidebar";
// import SortOption from "../Products/SortOption";
// import ProductGrid from "../Products/ProductGrid";
// import { fetchProductByFilters } from "../../../redux/slice/productSlice";

// const Collection = () => {
//   const { collection } = useParams();
//   const [searchParams] = useSearchParams();
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector((state) => state.products);

//   const sidebarRef = useRef(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const queryParams = Object.fromEntries([...searchParams]);

//   useEffect(() => {
//     dispatch(fetchProductByFilters({ collection, ...queryParams }));
//   }, [collection, searchParams, dispatch]);

//   // outside click close (mobile)
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//         setIsSidebarOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden ">
//       {/* Mobile Filter Button */}
//       <button
//         onClick={() => setIsSidebarOpen(true)}
//         className="lg:hidden fixed bottom-4 left-4 z-50 bg-black text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
//       >
//         <FaFilter />
//         Filter
//       </button>

//       {/* Sidebar */}
//       <aside
//         ref={sidebarRef}
//         className={`fixed lg:static inset-y-0 left-0 z-40 w-72
//         bg-white border-r shadow-lg
//         transform transition-transform duration-300
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//         lg:translate-x-0
//         h-screen overflow-y-auto sidebar-scroll`}
//       >
//         <FilterSidebar closeSidebar={() => setIsSidebarOpen(false)} />
//       </aside>

//       {/* Products Section */}
//       <main className="flex-1 h-screen overflow-y-auto sidebar-scroll p-4 lg:p-8">
//         {/* Header */}
//         {/* <div className="sticky top-0 bg-gray-50 z-10 pb-4">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             <h1 className="text-2xl font-semibold uppercase tracking-wide">
//               {collection || "All Collection"}
//             </h1>
//             <SortOption />
//           </div>
//         </div> */}

//         {/* Products */}
//         <ProductGrid products={products} loading={loading} error={error} />
//       </main>
//     </div>
//   );
// };

export default Collection;
