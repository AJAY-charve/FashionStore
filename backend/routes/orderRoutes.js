// const express = require("express")
// const Order = require("../models/Order")
// const { protect } = require("../middleware/authMiddleware")
// const { findById } = require("../models/Checkout")

// const router = express.Router()

// // get logged in user orders
// // access private
// router.get("/my-orders", protect, async (req, res) => {
//     try {
//         const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
//         res.json(orders)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" })
//     }
// })

// // vGet order details by id
// // acces private
// router.get("/:id", protect, async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id).populate("user", "name email")
//         if (!order) {
//             return res.status(404).json({ message: "Order not found" })
//         }
//         res.json(order)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" })
//     }
// })

// module.exports = router



const express = require("express")
const {
    getMyOrders,
    getOrderById
} = require("../controllers/orderController")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/my-orders", protect, getMyOrders)
router.get("/:id", protect, getOrderById)

module.exports = router
