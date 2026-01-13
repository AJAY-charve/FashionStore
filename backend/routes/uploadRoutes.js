// // const express = require("express")
// // const multer = require("multer")
// // const cloudinary = require("cloudinary").v2
// // const streamifier = require("streamifier")

// // require("dotenv").config()

// // const router = express.Router()

// // // cloudinary configuration
// // cloudinary.config({
// //     cloud_name: process.env.COUDINARY_CLOUDE_NAME,
// //     api_key: process.env.COUDINARY_API_KEY,
// //     api_secret: process.env.COUDINARY_API_SECRET
// // })

// // // multer setup using memory storage
// // const storage = multer.memoryStorage()
// // const uplode = multer({ storage })

// // router.post("/", uplode.single("image"), async (req, res) => {
// //     try {
// //         if (!req.file) {
// //             return res.status(400).json({ message: "No file uploded" })
// //         }

// //         // funtion to handle the stream upload to cloudinary
// //         const streamUpload = (fileBuffer) => {
// //             return new Promise((resolve, reject) => {
// //                 const stream = cloudinary.uploader.upload_stream((error, result) => {
// //                     if (result) {
// //                         resolve(result)
// //                     } else {
// //                         reject(error)
// //                     }
// //                 })
// //                 // use streamifier to convert file buffer to a stream
// //                 streamifier.createReadStream(fileBuffer).pipe(stream)
// //             })
// //         }

// //         // call the straamupload funtion
// //         const result = await streamUpload(req.file.buffer)

// //         // response with the upload image URL
// //         res.json({ imageUrl: result.secure_url })
// //     } catch (error) {
// //         console.log(error);
// //         return res.status(500).json({ message: "Server Error" })
// //     }
// // })

// // module.exports = router




// const express = require("express")
// const multer = require("multer")
// const cloudinary = require("cloudinary").v2
// const streamifier = require("streamifier")

// // require("dotenv").config()
// const dotenv = require("dotenv")
// dotenv.config()

// const router = express.Router()


// cloudinary.config({

//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })


// const storage = multer.memoryStorage()
// const upload = multer({ storage })

// router.post("/", upload.single("image"), async (req, res) => {




//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" })
//         }

//         const streamUpload = (buffer) => {
//             return new Promise((resolve, reject) => {
//                 const stream = cloudinary.uploader.upload_stream(
//                     { folder: "fashion-store" },
//                     (error, result) => {
//                         if (result) resolve(result)
//                         else reject(error)
//                     }
//                 )
//                 streamifier.createReadStream(buffer).pipe(stream)
//             })
//         }

//         const result = await streamUpload(req.file.buffer)
//         console.log("Upload result 👉", result)
//         res.json({ imageUrl: result.secure_url })

//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ message: "Upload failed" })
//     }
// })

// module.exports = router




const express = require("express")
const multer = require("multer")
const { uploadImage } = require("../controllers/uploadContoller")

const router = express.Router()

// multer setup
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Upload single image
router.post("/", upload.single("image"), uploadImage)

module.exports = router
