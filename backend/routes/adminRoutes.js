// const express = require("express")
// const User = require("../models/User")
// const { protect, admin } = require("../middleware/authMiddleware")

// const router = express.Router()

// // get all users
// // access private/admin
// router.get("/", protect, admin, async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.json(users)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" })
//     }
// })


// // add user
// // private/admin
// router.post("/", protect, admin, async (req, res) => {
//     const { name, email, password, role } = req.body

//     try {
//         let user = await User.findOne({ email })
//         if (user) {
//             return res.status(400).json({ message: "user already exist" })
//         }

//         user = new User({
//             name,
//             email,
//             password,
//             role: role || "customer"
//         })

//         await user.save()
//         res.status(201).json({ message: "User created successfully" })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" })
//     }
// })

// // update user
// // private/admin
// router.put("/:id", protect, admin, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (user) {
//             user.name = req.body.name || user.name;
//             user.email = req.body.email || user.email;
//             user.role = req.body.role || user.role;
//         }
//         const updateUser = await user.save()
//         res.json({ message: "User updated successfullu", user: updateUser })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Server Errror" })
//     }
// })


// // delte user access private/admin
// router.delete("/:id", protect, admin, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         if (user) {
//             await user.deleteOne()
//             res.json({ message: "User deleted successfullu" })
//         } else {
//             res.status(404).json({ message: "User not found" })
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Server Errror" })
//     }
// })


// module.exports = router



const express = require("express")
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/adminController")

const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

router.get("/", protect, admin, getAllUsers)
router.post("/", protect, admin, createUser)
router.put("/:id", protect, admin, updateUser)
router.delete("/:id", protect, admin, deleteUser)

module.exports = router
