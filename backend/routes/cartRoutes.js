const express = require("express")
const {
    addToCart,
    updateCartItem,
    removeFromCart,
    getUserCart,
    mergeCart
} = require("../controllers/chartController")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", addToCart)
router.put("/", updateCartItem)
router.delete("/", removeFromCart)
router.get("/", getUserCart)
router.post("/merge", protect, mergeCart)

module.exports = router
