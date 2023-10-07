import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;


// const URL=`mongodb+srv://${username}:${password}@cluster1.xoficl5.mongodb.net/?retryWrites=true&w=majority`;
const URL=`mongodb+srv://${username}:${password}@cluster1.6v2e2fk.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', true);

const Connection=async ()=>{
    try{
       await mongoose.connect(URL , {useUnifiedTopology:true});
       console.log('Database connected')
    }catch(err){
        console.log('error with db connection',err.message);
    }
}

export default Connection;