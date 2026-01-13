// const express = require("express")
// const User = require("../models/User")
// const jwt = require("jsonwebtoken")
// const {protect} = require("../middleware/authMiddleware")

// const router = express.Router()

// // register new user  /api/users/register
// // access public
// router.post("/register", async(req, res)=>{
//     const {name, email, password} = req.body
//     try {
//         let user = await User.findOne({email})
//         if(user)return res.status(400).json({message : "User already exist"})

//             user = new User({name, email, password})
//             await user.save()

//             // create jswt paylod
//             const payload = {user: {id:user._id, role:user.role}}

//             // sign and return the token along with user data
//             jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "40h"}, 
//                 (err, token)=>{
//                     if(err) throw err

//                     // send the user and token is res
//                     res.status(201).json({
//                         user : {
//                             _id : user._id,
//                             name : user.name,
//                             email : user.email,
//                             role : user.role
//                         },
//                         token
//                     })
//                 }
//             )
//     } catch (error) {
//        console.log(error);
//        res.status(500).send("Server error")
//     }
// })

// // router post authenticate user
// // access public
// router.post("/login", async(req, res)=>{
//     const {email, password} = req.body

//     try {
//         let user = await User.findOne({email})
//         if(!user) return res.status(400).json({message : "Invalid creadentials"})
//             const isMatch = await user.matchPassword(password)
//         if(!isMatch) return res.status(400).json({message : "Invalid creadentials"})

//                // create jswt paylod
//             const payload = {user: {id:user._id, role:user.role}}

//             // sign and return the token along with user data
//             jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : "40h"}, 
//                 (err, token)=>{
//                     if(err) throw err

//                     res.json({
//                         user : {
//                             _id : user._id,
//                             name : user.name,
//                             email : user.email,
//                             role : user.role
//                         },
//                         token
//                     })
//                 }
//             )
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message : "server error"})

//     }
// })


// // user profile
// // protcted route, access private
// router.get("/profile", protect, async(req, res)=>{
//     res.json(req.user)
// })

// module.exports = router





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
