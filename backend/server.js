import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
dotenv.config()
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'
import orderRoutes from './routes/order.routes.js'
import cors from 'cors';
const PORT = process.env.PORT;


connectDB()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))
app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})