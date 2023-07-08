const { default: mongoose } = require("mongoose");
const DeleteRecord = require("../model/deleteRecord");
const Product = require("../model/product");
const asyncHandler = require('express-async-handler');
const Cart = require('../model/cart')
const { ObjectId } = require("mongodb");

const getAllProducts = asyncHandler(async (req, res) => {

  const prod = await Product.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'User',
        pipeline: [
          {
            $project: { name: 1, email: 1 }
          }
        ]
      }
    },
  ])
  res.status(200).json(prod)

})


const getSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params.id
  const prod = await Product.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'user',
        foreignField: '_id',
        as: 'User',
        pipeline: [
          {
            $project: { name: 1, email: 1 }
          }
        ]
      }
    },
    { $match: { _id: new ObjectId(id) } },
  ])
  res.status(200).json(prod[0])
})

//server side rendering && Client side rendering

const createProduct = asyncHandler(async (req, res) => {
  const { product_name, product_image, product_description, product_price, noOfProduct } = req.body;
  const { _id: id, role } = req.user;

  if (role === 'seller' || role === 'admin') {
    if (!product_name || !product_image || !product_price || !noOfProduct)
      return res.status(400).json({ message: "All attributes must be filled" })

    const result = await Product.insertMany({ product_name, product_image, product_description, product_price, noOfProduct, user: id, itemsInStock: noOfProduct });

    if (!result) return res.status(400).json({ message: "Something went wrong" });

    return res.status(201).json({ message: "Product inserted successfully" });
  }
  return res.status(401).json({ message: "Unauthorized user" });

})

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: loggedInID, role } = req.user;

  if (role === 'admin') {
    const result = await Product.deleteOne({ _id: id })

    if (result.deletedCount === 0) return res.status(400).json({ message: "Unable to delete" });

    await DeleteRecord.insertMany({ userId: loggedInID, productId: id, role });

    return res.status(200).json({ message: "Deleted", result });
  }

  else if (role === 'seller') {
    const result = await Product.deleteOne({ _id: id, user: loggedInID })

    if (result.deletedCount === 0) return res.status(400).json({ message: "Unable to delete" });
    await DeleteRecord.insertMany({ userId: loggedInID, productId: id, role });

    return res.status(200).json({ message: "Deleted", result });
  }
  return res.status(401).json({ message: "Unauthorized user" });
})


const updateProduct = asyncHandler(async (req, res) => {
  const { product_name, product_image, product_description, product_price, itemsInStock } = req.body;
  const { id } = req.params;
  const { _id: loggedInID, role } = req.user;

  const product = await Product.findById(id);

  console.log(product)

  if (role === 'admin') {
    const result = await Product.updateOne({ _id: id }, {
      product_name: product_name || product.product_name,
      product_image: product_image || product.product_image,
      product_description: product_description || product.product_description,
      product_price: product_price || product.product_price,
      itemsInStock: itemsInStock || product.itemsInStock
    });

    if (result.modifiedCount == 0) return res.status(400).json({ message: "Unable to update" });

    return res.status(201).json({ message: "Product updated successfully" });
  }

  else if (role === 'seller') {

    const result = await Product.updateOne({ _id: id, user: loggedInID }, {
      product_name: product_name || product.product_name,
      product_image: product_image || product.product_image,
      product_description: product_description || product.product_description,
      product_price: product_price || product.product_price,
      itemsInStock: itemsInStock || product.itemsInStock
    });

    if (result.modifiedCount == 0) return res.status(400).json({ message: "Unable to update" });

    return res.status(201).json({ message: "Product updated successfully", result });
  }
  return res.status(401).json({ message: "Unauthorized user" });
})


const getProductByRole = asyncHandler(async (req, res) => {
  const { _id: id, role } = req.user;

  if (role === 'admin') {
    const result = await Product.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'User',
          pipeline: [
            {
              $project: { name: 1, email: 1, role: 1 }
            }
          ]
        }
      }
    ])
    return res.status(200).json(result);
  }
  else if (role === 'seller') {
    const result = await Product.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'User',
          pipeline: [
            {
              $project: { name: 1, email: 1 }
            }
          ]
        }
      },
      { $match: { user: new ObjectId(id) } },
    ])
    return res.status(200).json(result);
  }

  return res.sendStatus(401);
})

module.exports = { getAllProducts, getSingleProduct, createProduct, deleteProduct, updateProduct, getProductByRole }

