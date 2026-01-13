// const express = require("express")
// const Product = require("../models/Product")
// const { protect, admin } = require("../middleware/authMiddleware")

// const router = express.Router()

// // create a new product into database
// // private access
// router.post("/", protect, admin, async (req, res) => {
//     try {
//         const {
//             name, description, price, discountPrice, countInStock, category,
//             brand, sizes, colors, collections, material, gender, images,
//             isFeatured, isPublished, tags, dimensions, weight, sku
//         } = req.body

//         const product = new Product({
//             name, description, price, discountPrice, countInStock, category,
//             brand, sizes, colors, collections, material, gender, images,
//             isFeatured, isPublished, tags, dimensions, weight, sku,
//             user: req.user._id
//         })

//         const createdProduct = await product.save()
//         res.status(201).json(createdProduct)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("server error")
//     }
// })

// // update and exiting product
// // access private/admin
// router.put("/:id", async (req, res) => {
//     console.log("req", req);

//     //   if (!req.body || Object.keys(req.body).length === 0) {
//     //   return res.status(400).json({ message: "Request body is missing" })
//     // }


//     try {
//         const {
//             name, description, price, discountPrice, countInStock, category,
//             brand, sizes, colors, collections, material, gender, images,
//             isFeatured, isPublished, tags, dimensions, weight, sku
//         } = req.body

//         // consol.log(req.body)

//         // find by id in database
//         const product = await Product.findById(req.params.id)

//         // return res.json(product)

//         if (product) {
//             product.name = name || product.name
//             product.description = description || product.description
//             product.price = price || product.price
//             product.discountPrice = discountPrice || product.discountPrice
//             product.collections = collections || product.collections
//             product.countInStock = countInStock || product.countInStock
//             product.category = category || product.category
//             product.brand = brand || product.brand
//             product.sizes = sizes || product.sizes
//             product.colors = colors || product.colors
//             product.material = material || product.material
//             product.gender = gender || product.gender
//             product.images = images || product.images;
//             product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
//             product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
//             product.tags = tags || product.tags
//             product.dimensions = dimensions || product.dimensions
//             product.weight = weight || product.weight
//             product.sku = sku || product.sku

//             const updatedProduct = await product.save()
//             res.json(updatedProduct)
//         } else {
//             res.status(404).json({ message: "Product not found" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server error")
//     }
// })

// // router.put("/:id", protect, admin, async (req, res) => {
// //   console.log("BODY 👉", req.body)
// //   console.log("ID 👉", req.params.id)

// //   try {
// //     const updatedProduct = await Product.findByIdAndUpdate(
// //       req.params.id,
// //       { $set: req.body },
// //       { new: true, runValidators: false }
// //     )

// //     res.json(updatedProduct)
// //   } catch (error) {
// //     console.log(error)
// //     res.status(500).json({ message: error.message })
// //   }
// // })



// // delete product by id
// // access/private
// router.delete("/:id", protect, admin, async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         if (product) {
//             await product.deleteOne();
//             res.json({
//                 message: "Product removed"
//             })
//         } else {
//             res.status(404).json({
//                 message: "Product not found"
//             })
//         } 
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("server error")

//     }
// })


// // get all products with optional query filter
// // access public
// // router.get("/", async(req, res)=>{
// //     try {
// //         const {collection, size, color, gender, minPrice, maxPrice,
// //              sortBy, search, category, material, brand, limit} = req.query

// //              let query = {}

// //             //  filter logic
// //             if(collection && collection.toLocaleLowerCase() !== "all"){
// //                 query.collection = collection
// //             }
// //             if(category && category.toLocaleLowerCase() !== "all"){
// //                 query.category = category
// //             }
// //             if(material){
// //                 query.material = {$in:material.split(",")}
// //             }
// //             if(brand){
// //                 query.brand = {$in:brand.split(",")}
// //             }
// //             if(size){
// //                 query.size = {$in:size.split(",")}
// //             }
// //             if(color){
// //                 query.color = { $in : [color]}
// //             }
// //              if(gender){
// //                 query.gender = { $in : [gender]}
// //             }
// //             if(minPrice || maxPrice){
// //                 query.price = {}
// //                 if(minPrice) query.price.gte = Number(minPrice)
// //                 if(maxPrice) query.lte = Number(maxPrice)
// //             }
// //         if(search){
// //             query.$or = [
// //                 {name : {$regex:search, $options:"i"}},
// //                 {description : {$regex:search, $options:"i"}}
// //             ]
// //         }

// //         // sort logic
// //         let sort = {}
// //         if(sortBy){
// //             switch(sortBy){
// //                 case "priceAsc":
// //                     sort = { price : 1};
// //                     break;
// //                 case "priceDsc" : 
// //                     sort = {price : -1};
// //                     break
// //                 case "popularity":
// //                     sort = { rating : -1};
// //                     break
// //                 default :
// //                    break
// //             }
// //         }

// //         // fetch the product and applying sorting
// //         let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
// //         res.json(products)
// //     } catch (error) {
// //         console.log(error);
// //         res.status(500).send("Server Error")
// //     }
// // })

// router.get("/", async (req, res) => {
//     try {
//         const {
//             collection,
//             size,
//             color,
//             gender,
//             minPrice,
//             maxPrice,
//             sortBy,
//             search,
//             category,
//             material,
//             brand,
//             limit
//         } = req.query

//         const decode = (v) => v ? decodeURIComponent(v).replace(/\+/g, " ") : v

//         const decodedCategory = decode(category)
//         const decodedCollection = decode(collection)

//         let query = {}

//         if (decodedCollection && decodedCollection.toLowerCase() !== "all") {
//             query.collections = decodedCollection
//         }

//         if (decodedCategory && decodedCategory.toLowerCase() !== "all") {
//             query.category = decodedCategory
//         }

//         if (material) query.material = { $in: material.split(",") }
//         if (brand) query.brand = { $in: brand.split(",") }
//         if (size) query.sizes = { $in: size.split(",") }
//         if (color) query.colors = { $in: color.split(",") }
//         if (gender) query.gender = gender

//         if (minPrice || maxPrice) {
//             query.price = {}
//             if (minPrice) query.price.$gte = Number(minPrice)
//             if (maxPrice) query.price.$lte = Number(maxPrice)
//         }

//         if (search) {
//             query.$or = [
//                 { name: { $regex: search, $options: "i" } },
//                 { description: { $regex: search, $options: "i" } }
//             ]
//         }

//         let sort = {}
//         if (sortBy === "priceAsc") sort.price = 1
//         if (sortBy === "priceDsc") sort.price = -1

//         const products = await Product.find(query)
//             .sort(sort)
//             .limit(Number(limit) || 0)

//         res.json(products)
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Server Error")
//     }
// })


// // best seller 
// // retrive the product with highest rating
// // public access
// router.get("/best-seller", async (req, res) => {
//     try {
//         const bestSeller = await Product.findOne().sort({ rating: -1 })
//         if (bestSeller) {
//             res.json(bestSeller)
//         } else {
//             res.status(404).json({ message: "No  best seller found" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error")
//     }
// })

// // new arrivals
// // retrive latest 8 product- creation data
// // access public
// router.get("/new-arrivals", async (req, res) => {
//     try {
//         // latest product form the database
//         const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
//         res.json(newArrivals)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server error")
//     }
// })


// // get Product by Id
// // access public
// router.get("/:id", async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         if (product) {
//             res.json(product)
//         } else {
//             res.status(404).json({ message: "Product Not Found" })
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server error")
//     }
// })



// // similar product by id
// // access public
// router.get("/similar/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const product = await Product.findById(id)

//         if (!product) {
//             return res.status(404).json({ message: "Product Not Found" })
//         }

//         const smiliarProducts = await Product.find({
//             _id: { $ne: id },   // exclused the current product id
//             gender: product.gender,
//             category: product.category

//         }).limit(4)

//         res.json(smiliarProducts)
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Server Error")
//     }
// })




// module.exports = router



const express = require("express")
const {
    createProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById,
    getBestSeller,
    getNewArrivals,
    getSimilarProducts
} = require("../controllers/productController")

const { protect, admin } = require("../middleware/authMiddleware")

const router = express.Router()

// ================= ADMIN ROUTES =================

// create product
router.post("/", protect, admin, createProduct)

// update product
router.put("/:id", protect, admin, updateProduct)

// delete product
router.delete("/:id", protect, admin, deleteProduct)

// ================= PUBLIC ROUTES =================

// get all products (with filters)
router.get("/", getProducts)

// best seller
router.get("/best-seller", getBestSeller)

// new arrivals
router.get("/new-arrivals", getNewArrivals)

// similar products
router.get("/similar/:id", getSimilarProducts)

// get product by id
router.get("/:id", getProductById)

module.exports = router
