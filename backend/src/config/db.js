import mongoose from "mongoose";


export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.URI);

        console.log("MONGODB SUCCESSFULLY CONNECTED");
    }
    catch (error){
            console.error("Error connecting to MONGODB", error);
            process.exit(1);
    }
}