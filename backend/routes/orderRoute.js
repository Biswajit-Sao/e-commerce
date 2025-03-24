import express from 'express';
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';

const orderRouter=express.Router()

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter



