// const express = require("express")
// const Checkout = require("../models/Checkout")
// const Cart = require("../models/Cart")
// const Product = require("../models/Product")
// const Order = require("../models/Order")
// const { protect } = require("../middleware/authMiddleware")

// const router = express.Router()

// // create a new checkout session
// // access private
// router.post("/", protect, async (req, res) => {
//     const { checkoutItems, shippingAddress, paymentMethode, totalPrice } = req.body

//     // if (checkoutItems || checkoutItems.length > 0) {
//     //     return res.status(400).json({ message: "no items in chekcout" })
//     // }

//     if (!checkoutItems || checkoutItems.length === 0) {
//         return res.status(400).json({ message: "No items in checkout" })
//     }


//     try {
//         const newCheckout = await Checkout.create({
//             user: req.user._id,
//             checkoutItems: checkoutItems,
//             shippingAddress,
//             paymentMethode,
//             totalPrice,
//             paymentStatus: "Pending",
//             isPaid: false
//         })
//         console.log(`chekcout created for user ${req.user._id}`)
//         res.status(201).json(newCheckout)
//     } catch (error) {
//         console.log("Error creating chekcout session", error)
//         res.status(500).json({ message: "Server Error" })
//     }
// })


// // update checkout to mark as paid after successful payment
// // access private
// router.put("/:id/pay", protect, async (req, res) => {
//     const { paymentStatus, paymentDetails } = req.body

//     try {
//         const checkout = await Checkout.findById(req.params.id)
//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" })
//         }
//         if (paymentStatus === "paid") {
//             checkout.isPaid = true
//             checkout.paymentStatus = paymentStatus,
//                 checkout.paymentDetails = paymentDetails,
//                 checkout.paidAt = Date.now()
//             await checkout.save()
//             res.status(200).json(checkout)
//         } else {
//             res.status(400).json({ message: "Invalid Payment Status" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server error" })
//     }
// })

// // finalized checkout and covert to an order after payemnt confirmation
// // access private
// router.post("/:id/finalize", protect, async (req, res) => {
//     try {
//         const checkout = await Checkout.findById(req.params.id)
//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" })
//         }

//         if (checkout.isPaid && !checkout.isFinalized) {
//             // create final order based on the checkout details
//             const finalOrder = await Order.create({
//                 user: checkout.user,
//                 orderItems: checkout.orderItems,
//                 shippingAddress: checkout.shippingAddress,
//                 paymentMethode: checkout.paymentMethode,
//                 totalPrice: checkout.totalPrice,
//                 isPaid: true,
//                 paidAt: checkout.paidAt,
//                 isDelivered: false,
//                 paymentStatus: "paid",
//                 paymentDetails: checkout.paymentDetails,

//             })

//             // mark the checout as finalized
//             checkout.isFinalized = true,
//                 checkout.finalizedAt = Date.now()
//             await checkout.save()
//             // delete the cart assoiciated with the user
//             await Cart.findOneAndDelete({ user: checkout.user })
//             res.status(201).json(finalOrder)
//         } else if (checkout.isFinalized) {
//             res.status(400).json({ message: "Checkout already finelized" })
//         } else {
//             res.status(400).json({ message: "Checkout is not paid" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Server Error" })
//     }
// })

// module.exports = router




// const express = require("express");
// const Checkout = require("../models/Checkout");
// const Cart = require("../models/Cart");
// const Order = require("../models/Order");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// // CREATE CHECKOUT
// router.post("/", protect, async (req, res) => {
//     const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

//     if (!checkoutItems || checkoutItems.length === 0) {
//         return res.status(400).json({ message: "No items in checkout" });
//     }

//     try {
//         const checkout = await Checkout.create({
//             user: req.user._id,
//             checkoutItems,
//             shippingAddress,
//             paymentMethod,
//             totalPrice,
//             paymentStatus: "pending",
//             isPaid: false,
//             isFinalized: false
//         });

//         res.status(201).json(checkout);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // MARK AS PAID
// router.put("/:id/pay", protect, async (req, res) => {
//     const { paymentStatus, paymentDetails } = req.body;

//     try {
//         const checkout = await Checkout.findById(req.params.id);

//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" });
//         }

//         if (checkout.user.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: "Not authorized" });
//         }

//         if (paymentStatus !== "paid") {
//             return res.status(400).json({ message: "Invalid payment status" });
//         }

//         checkout.isPaid = true;
//         checkout.paymentStatus = "paid";
//         checkout.paymentDetails = paymentDetails;
//         checkout.paidAt = Date.now();

//         await checkout.save();
//         res.json(checkout);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // FINALIZE CHECKOUT → ORDER
// router.post("/:id/finalize", protect, async (req, res) => {
//     try {
//         const checkout = await Checkout.findById(req.params.id);

//         if (!checkout) {
//             return res.status(404).json({ message: "Checkout not found" });
//         }

//         if (checkout.user.toString() !== req.user._id.toString()) {
//             return res.status(403).json({ message: "Not authorized" });
//         }

//         if (!checkout.isPaid) {
//             return res.status(400).json({ message: "Checkout not paid" });
//         }

//         if (checkout.isFinalized) {
//             return res.status(400).json({ message: "Checkout already finalized" });
//         }

//         const order = await Order.create({
//             user: checkout.user,
//             orderItems: checkout.checkoutItems,
//             shippingAddress: checkout.shippingAddress,
//             paymentMethod: checkout.paymentMethod,
//             totalPrice: checkout.totalPrice,
//             isPaid: true,
//             paidAt: checkout.paidAt,
//             paymentStatus: "paid",
//             paymentDetails: checkout.paymentDetails,
//             isDelivered: false
//         });

//         checkout.isFinalized = true;
//         checkout.finalizedAt = Date.now();
//         await checkout.save();

//         await Cart.findOneAndDelete({ user: checkout.user });

//         res.status(201).json(order);

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// module.exports = router;




const express = require("express")
const {
    createCheckout,
    markCheckoutPaid,
    finalizeCheckout
} = require("../controllers/checkoutContoller")

const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", protect, createCheckout)
router.put("/:id/pay", protect, markCheckoutPaid)
router.post("/:id/finalize", protect, finalizeCheckout)

module.exports = router
