import mongoose from "mongoose";

export async function connect()
{
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connection',()=>{
            console.log('MONGODB connection established');
            
        })

        connection.on('error', (err)=>{
            console.log('MONGODB connection failed',err);
            process.exit(1); 
        })
        
    } catch (error) {
        console.log('Something went wrong while connecting to database', error);
    }
}