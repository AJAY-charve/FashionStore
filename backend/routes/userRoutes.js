const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const { registerUser, authUser, getUserProfile } = require("../controllers/userController")

router.post("/register", registerUser)

router.post("/login", authUser)

router.get("/profile", protect, getUserProfile)

module.exports = router
