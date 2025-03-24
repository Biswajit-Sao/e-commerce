import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    return res.status(200).json({
        message:`The server is run port ${port}`,
        success:true
    })
})


app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.listen(port,()=>{
    console.log(`Server is start in Port :${port} 😀😀`)
})