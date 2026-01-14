// const Product = require("../models/Product")

// // @desc    Get all products (Admin)
// // @route   GET /api/admin/products
// // @access  Private/Admin
// const getAllProductsAdmin = async (req, res) => {
//     try {
//         const products = await Product.find({})
//         res.json(products)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: "Server Error" })
//     }
// }

// module.exports = {
//     getAllProductsAdmin
// }





const Product = require("../models/Product");

// @desc    Get all products (Admin) with pagination
// @route   GET /api/admin/products
// @access  Private/Admin
const getAllProductsAdmin = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments();

        const products = await Product.find({})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            products,
            page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getAllProductsAdmin };
