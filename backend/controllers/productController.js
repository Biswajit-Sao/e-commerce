import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUel = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUel,
      date: Date.now(),
    };

    const product = new productModel(productData);

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Added 😃",
    });
  } catch (error) {
    console.log(error);
  }
};

export const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(200).json({
      products,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
export const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    return res.status(200).json({
      message: "prodect remove 😉",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

export const singleProduct = async (req, res) => {
    try {
        
        const {productId}=req.body;

        const product=await productModel.findById(productId)
        return res.status(200).json({
            product,
            success: true,
          });


    } catch (error) {
        return res.status(400).json({
            message: error.message,
            success: false,
          });
    }
};
