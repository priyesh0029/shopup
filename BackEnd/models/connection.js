import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL).then(()=>{
            console.log(`Database connected successfully`);
        })

    } catch (error) {
        console.log(`Database connection error : ${error}`);
        process.exit(1) 
    }
}

export default connectDB