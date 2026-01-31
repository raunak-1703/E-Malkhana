import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config()

const app = express();

// middlewares
app.use(cors())
app.use(express.json())

// health check route
app.get('/health',(req,res)=>{
    res.status(200).json({status:'ok', message:'Server is running'})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('Server is running on PORT: ',PORT);
})