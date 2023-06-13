const Product = require("../model/Product");
const asyncHandler =require('express-async-handler')

const getAllProducts = asyncHandler(async (req, res) => {
  const prod = await Product.find({})
    res.status(200).json(prod)

}

)

const getSingleProduct = asyncHandler(async (req, res) => {
    const id=req.params.id
    const prod = await Product.findById(id)
      res.status(200).json(prod)
  
  }
  
  )

module.exports= { getAllProducts, getSingleProduct }

