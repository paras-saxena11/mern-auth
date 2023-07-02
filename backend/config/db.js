import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected mongodb Database')
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
}
export default connectDB;