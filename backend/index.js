const express = require('express');
const cors = require('cors');
const connectDB = require('./model/db.js')
const seeder = require('./seeder.js');
const product = require("./routes/product.js")
const authRoute = require('./routes/authRoute.js');
const authorize = require('./controller/authorize.js');
const payment = require('./routes/payment.js');
const cart = require('./routes/cart.js');
const apiRoutes = require('./routes/index')
const cookieParser = require('cookie-parser');
const PORT = 4000;


const connectToDB = async () => {
    try {
        const connect = await connectDB("mongodb+srv://fitsacreation:LhaWy3tQpcf9p0TN@cluster0.4e3bpnj.mongodb.net/ecommerce");
        console.log("MongoDB connected: " + connect.connection.host)
        app.listen(PORT, () => { console.log("Server started") })
    } catch (error) {
        console.log(error?.message)
    }
}
connectToDB();

const app = express();
app.use(cookieParser())

app.use(cors({ credentials: true, origin: ["http://127.0.0.1:5173", "http://localhost:5173", "http://127.0.0.1:5174"] }))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/', seeder)
app.use('/api/v1', authRoute)
app.use('/api/v1', apiRoutes)
