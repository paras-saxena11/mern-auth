import express from 'express'
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import userRoute from './routes/userRoute.js'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errormiddleware.js';
import cookieParser from 'cookie-parser'

const port = process.env.PORT || 8000;
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use('/api/users', userRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started at ${port}`)
})