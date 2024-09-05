import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();  // create express app
const PORT = process.env.PORT || 3000;  // port number

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('DataBase connected is Successful!!!');
    })
    .catch(err => {
        console.log('DataBase connection failed:', err);
    });

app.use(express.json());  // use JSON middleware

app.use(cookieParser());  // use cookie parser middleware

// Define your routes after middleware
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!!! Horrayyy`);
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err); // Log the error for debugging
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

