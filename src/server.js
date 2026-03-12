import dotenv from 'dotenv';
dotenv.config();
import connectdb from './config/db.js';
import app from './app.js';


const PORT = process.env.PORT || 3000;
connectdb();

app.listen(PORT,()=>{
    console.log("server is running...")
})