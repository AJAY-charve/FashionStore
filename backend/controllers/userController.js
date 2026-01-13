const User = require("../models/User")
const jwt = require("jsonwebtoken")

// helper function to generate JWT
const generateToken = (user) => {
    const payload = { user: { id: user._id, role: user.role } }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" })
}

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: "User already exists" })

        user = new User({ name, email, password })
        await user.save()

        const token = generateToken(user)

        res.status(201).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = await user.matchPassword(password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        const token = generateToken(user)

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
    })
}

module.exports = {
    registerUser,
    authUser,
    getUserProfile
}
