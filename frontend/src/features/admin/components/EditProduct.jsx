import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchProductDetails } from "../../../redux/slice/productSlice";
import { updateProduct } from "../../../redux/slice/adminProductSlice";
import { toast } from "sonner";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  // fetch product
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails({ id }));
    }
  }, [dispatch, id]);

  // fill form after fetch
  useEffect(() => {
    if (selectedProduct?._id) {
      setProductData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || 0,
        countInStock: selectedProduct.countInStock || 0,
        sku: selectedProduct.sku || "",
        category: selectedProduct.category || "",
        brand: selectedProduct.brand || "",
        sizes: selectedProduct.sizes || [],
        colors: selectedProduct.colors || [],
        collections: selectedProduct.collections || "",
        material: selectedProduct.material || "",
        gender: selectedProduct.gender || "",
        images: selectedProduct.images || [],
      });
    }
  }, [selectedProduct]);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProductData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "countInStock" ? Number(value) : value,
    }));
  };

  // image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, { url: data.imageUrl, altText: "" }],
      }));

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error("❌ Image upload failed");
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateProduct({ id, productData })).unwrap();
      toast.success("✏️ Product updated successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("❌ Product update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        {/* name */}
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
          required
        />

        {/* description */}
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border p-2 mb-4"
          required
        />

        {/* price */}
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />

        {/* stock */}
        <input
          type="number"
          name="countInStock"
          value={productData.countInStock}
          onChange={handleChange}
          className="w-full border p-2 mb-4"
        />

        {/* sizes */}
        <input
          type="text"
          value={productData.sizes.join(", ")}
          onChange={(e) =>
            setProductData({
              ...productData,
              sizes: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          className="w-full border p-2 mb-4"
        />

        {/* colors */}
        <input
          type="text"
          value={productData.colors.join(", ")}
          onChange={(e) =>
            setProductData({
              ...productData,
              colors: e.target.value.split(",").map((c) => c.trim()),
            })
          }
          className="w-full border p-2 mb-4"
        />

        {/* images */}
        <input type="file" onChange={handleImageUpload} />

        <div className="flex gap-3 mt-3">
          {productData.images.map((img, i) => (
            <img key={i} src={img.url} className="w-20 h-20 rounded" />
          ))}
        </div>

        <button
          disabled={uploading}
          className="w-full mt-6 bg-green-600 text-white py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
