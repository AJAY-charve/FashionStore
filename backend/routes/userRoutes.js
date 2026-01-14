const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const { registerUser, authUser, getUserProfile } = require("../controllers/userController")

// Register user
router.post("/register", registerUser)

// Login user
router.post("/login", authUser)

// User profile
router.get("/profile", protect, getUserProfile)

module.exports = router
