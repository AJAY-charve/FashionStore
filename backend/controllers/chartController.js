const Cart = require("../models/Cart")
const Product = require("../models/Product")

// helper function
const getCart = async (userId, guestId) => {
    if (userId) return await Cart.findOne({ user: userId })
    if (guestId) return await Cart.findOne({ guestId })
    return null
}

// @desc    Add product to cart (guest or user)
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body

    try {
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        let cart = await getCart(userId, guestId)

        if (cart) {
            const productIndex = cart.products.findIndex(
                (p) =>
                    p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            )

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                })
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + Number(item.price) * Number(item.quantity),
                0
            )

            await cart.save()
            return res.status(200).json(cart)
        }

        const newCart = await Cart.create({
            user: userId || undefined,
            guestId: guestId || `guest_${Date.now()}`,
            products: [{
                productId,
                name: product.name,
                image: product.images[0].url,
                price: product.price,
                size,
                color,
                quantity
            }],
            totalPrice: product.price * quantity
        })

        res.status(201).json(newCart)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// @desc    Update product quantity
// @route   PUT /api/cart
// @access  Public
const updateCartItem = async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body

    try {
        const cart = await getCart(userId, guestId)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        )

        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" })
        }

        if (quantity > 0) {
            cart.products[productIndex].quantity = quantity
        } else {
            cart.products.splice(productIndex, 1)
        }

        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + Number(item.price) * Number(item.quantity),
            0
        )

        await cart.save()
        res.json(cart)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// @desc    Remove product from cart
// @route   DELETE /api/cart
// @access  Public
// const removeFromCart = async (req, res) => {
//     const { productId, size, color, guestId, userId } = req.body

//     try {
//         const cart = await getCart(userId, guestId)
//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" })
//         }

//         const productIndex = cart.products.findIndex(
//             (p) =>
//                 p.productId.toString() === productId &&
//                 p.size === size &&
//                 p.color === color
//         )

//         if (productIndex === -1) {
//             return res.status(404).json({ message: "Product not found in cart" })
//         }

//         cart.products.splice(productIndex, 1)

//         cart.totalPrice = cart.products.reduce(
//             (acc, item) => acc + Number(item.price) * Number(item.quantity),
//             0
//         )

//         await cart.save()
//         res.json(cart)

//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: "Server Error" })
//     }
// }


const removeFromCart = async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body

    console.log(productId, size, color, guestId, userId);


    const cart = await getCart(userId, guestId)
    console.log(cart);

    if (!cart) return res.status(404).json({ message: "Cart not found" })

    // const productIndex = cart.products.findIndex(
    //     (p) => p.productId.toString() === productId
    //         && p.size === size
    //      && p.color === color
    // )

    const productIndex = cart.products.findIndex(
        (p) =>
            p.productId.toString() === productId &&
            p.size.toLowerCase() === size.toLowerCase() &&
            p.color.toLowerCase() === color.toLowerCase()
    );


    console.log("productIdex", productIndex);


    if (productIndex === -1) return res.status(404).json({ message: "Product not found in cart" })
    cart.products.splice(productIndex, 1)
    cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
    )
    await cart.save()
    res.json(cart)
}


// @desc    Get cart
// @route   GET /api/cart
// @access  Public
const getUserCart = async (req, res) => {
    const { userId, guestId } = req.query

    try {
        const cart = await getCart(userId, guestId)
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" })
        }
        res.json(cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

// @desc    Merge guest cart into user cart
// @route   POST /api/cart/merge
// @access  Private
const mergeCart = async (req, res) => {
    const { guestId } = req.body

    try {
        const guestCart = await Cart.findOne({ guestId })
        const userCart = await Cart.findOne({ user: req.user._id })

        if (!guestCart || guestCart.products.length === 0) {
            return res.status(400).json({ message: "Guest cart is empty" })
        }

        if (userCart) {
            guestCart.products.forEach((guestItem) => {
                const index = userCart.products.findIndex(
                    (item) =>
                        item.productId.toString() === guestItem.productId.toString() &&
                        item.size === guestItem.size &&
                        item.color === guestItem.color
                )

                if (index > -1) {
                    userCart.products[index].quantity += guestItem.quantity
                } else {
                    userCart.products.push(guestItem)
                }
            })

            userCart.totalPrice = userCart.products.reduce(
                (acc, item) => acc + Number(item.price) * Number(item.quantity),
                0
            )

            await userCart.save()
            await Cart.findOneAndDelete({ guestId })

            return res.json(userCart)
        }

        guestCart.user = req.user._id
        guestCart.guestId = undefined
        await guestCart.save()

        res.json(guestCart)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    addToCart,
    updateCartItem,
    removeFromCart,
    getUserCart,
    mergeCart
}
