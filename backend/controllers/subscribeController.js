const Subscriber = require("../models/Subscriber")

// @desc    Subscribe to newsletter
// @route   POST /api/subscribers/subscribe
// @access  Public
const subscribeNewsletter = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }

    try {
        // check if already subscribed
        let subscriber = await Subscriber.findOne({ email })
        if (subscriber) {
            return res.status(400).json({
                message: "Email is already subscribed"
            })
        }

        // create new subscriber
        subscriber = new Subscriber({ email })
        await subscriber.save()

        res.status(201).json({
            message: "Successfully subscribed to the newsletter"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}

module.exports = {
    subscribeNewsletter
}
