import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const {userId,itemId,size}=req.body;
    
    
    const userData=await userModel.findById(userId)
    const cartData=await userData.cartData;
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1
        }
        else{
            cartData[itemId][size]=1
        }
    }else{
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    await userModel.findByIdAndUpdate(userId,{cartData})
    return res.status(200).json({
        success:true,
        message:"Added To Cart"
    })
  } catch (error) {
    console.log(error);
    res.status(404).json({success:false,message:error.message})
    
  }
};
export const UpdateCart = async (req, res) => {
    try {
        
        const {userId,itemId,size,quantity}=req.body;
        
        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData;

        cartData[itemId][size]=quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        return res.status(200).json({
            success:true,
            message:"Cart Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({success:false,message:error.message})
    }
};
export const getUserCart = async (req, res) => {
    try {
        
        const {userId}=req.body
        const userData=await userModel.findById(userId)
        const cartData=await userData.cartData;

        res.json({
            success:true,
            cartData
        })

    } catch (error) {
        console.log(error);
        res.status(404).json({success:false,message:error.message})
    }
};
