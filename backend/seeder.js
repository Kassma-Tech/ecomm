const product = require('./data/data.js');
const user = require('./data/userData.js');
const Product = require('./model/product.js');
const User = require('./model/user.js');



const seeder = require('express').Router();

seeder.get("/", async (req, res) => {
    await Product.deleteMany();
    await User.deleteMany();
    const createdUsers = await User.insertMany(user);
    const createdProducts = await Product.insertMany(product);

    // const createdUsers = await User.insertMany(data.users);
    res.send({ createdProducts, createdUsers });
});


module.exports = seeder;
