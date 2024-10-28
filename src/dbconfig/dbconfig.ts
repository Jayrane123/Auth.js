import mongoose from "mongoose";

export async function connect() {
    try{
        const mongoUri = process.env.MONGO_URI;
        
        if (!mongoUri) {
            throw new Error("MongoDB URI is not defined in environment variables");
        } 
        await mongoose.connect(mongoUri)
        const connection =mongoose.connection
        
        connection.on('connected',()=>{
            console.log('MongoDB Connected');
            
        })
        connection.on('error',(err)=>{
            console.log('MOngoDB Connection Error,please check is Db is up & running'+err);
            process.exit();
        })
    }
    catch(error){
        console.log("Connection went wrong in connecting to DB");
        console.log(error);       
    }
}