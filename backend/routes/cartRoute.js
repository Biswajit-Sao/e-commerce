import express from 'express'
import { addToCart, getUserCart, UpdateCart } from '../controllers/cartController.js'
import authUser from '../middleware/authUser.js'

const cartRouter=express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/updateCart',authUser,UpdateCart)

export default cartRouter;
