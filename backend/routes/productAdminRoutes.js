// const express = require("express")
// const Product = require("../models/Product")
// const { protect, admin } = require("../middleware/authMiddleware")

// const router = express.Router()

// // Get all Products 
// // private/admin
// router.get("/", protect, admin, async (req, res) => {
//     try {
//         const products = await Product.find({})
//         res.json(products)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ Message: "Server Error" })
//     }
// })



// module.exports = router



const express = require("express")
const { getAllProductsAdmin } = require("../controllers/productAdminController")
const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, admin, getAllProductsAdmin)

module.exports = router
