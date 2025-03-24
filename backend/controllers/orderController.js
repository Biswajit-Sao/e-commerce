import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    return res.status(200).json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const placeOrderRazorpay = async (req, res) => {};

export const allOrders = async (req, res) => {
  try {
    const orders=await orderModel.find({})
    return res.status(200).json({
      success:true,
      orders
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const userOrders = async (req, res) => {
 try {
    const {userId}=req.body

    const orders=await orderModel.find({userId})
    return res.status(200).json({
        success:true,
        orders
    })
 } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
 }
};

export const updateStatus = async (req, res) => {
  try {
    
    const {orderId,status}=req.body
    await orderModel.findByIdAndUpdate(orderId,{status})
    return res.json({success:true,message:"status Updated"})

  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
