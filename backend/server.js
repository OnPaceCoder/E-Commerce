import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
dotenv.config()
import userRoutes from './routes/user.routes.js'
const PORT = process.env.PORT;


connectDB()

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})