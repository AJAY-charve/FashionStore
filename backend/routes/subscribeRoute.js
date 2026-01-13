// const express = require("express")

// const router = express.Router()
// const Subscriber = require("../models/Subscriber")

// // handle newletter subscription
// // access public

// // router.post("/subscribe", async (req, res) => {
// //     const { email } = req.body
// //     if (!email) {
// //         return res.status(400).json({ message: "Email is required" })
// //     }

// //     try {
// //         const subscriber = await Subscriber.findOne({ email })
// //         if (subscriber) {
// //             return res.status(400).json({ message: "email is already subscribe" })
// //         }

// //         // create a new subscriber
// //         subscriber = new Subscriber({ email })
// //         await subscriber.save()

// //         res.status(201).json({ message: "Successfully subscribe to the newsletter" })
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).json({ message: "Server Error" })
// //     }
// // })

// router.post("/subscribe", async (req, res) => {
//     const { email } = req.body
//     if (!email) {
//         return res.status(400).json({ message: "Email is required" })
//     }

//     try {
//         // check if already subscribed
//         let subscriber = await Subscriber.findOne({ email })
//         if (subscriber) {
//             return res.status(400).json({ message: "Email is already subscribed" })
//         }

//         // create a new subscriber
//         subscriber = new Subscriber({ email })  // use 'let' above
//         await subscriber.save()

//         res.status(201).json({ message: "Successfully subscribed to the newsletter" })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" })
//     }
// })


// module.exports = router





const express = require("express")
const {
    subscribeNewsletter
} = require("../controllers/subscribeController")

const router = express.Router()

// subscribe newsletter (public)
router.post("/subscribe", subscribeNewsletter)

module.exports = router
