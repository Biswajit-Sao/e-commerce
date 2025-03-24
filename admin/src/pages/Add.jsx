import React, { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import axios from "axios";
import "./Add.css";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState(Array(4).fill(null));

  const handleSizeClick = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handleImageChange = (e, index) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = file;
        return newImages;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("bestseller", bestseller.toString());
    
    images.forEach((image, index) => {
      if (image) {
        `image${index + 1}` && formData.append(`image${index + 1}`, image);
      }
    });

    
    try {
      const response = await axios.post(backendUrl+"/api/product/add", formData,{headers:{token}});
      toast.success(response.data.message)

      if(response.data.success){
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setSizes([]);
        setBestseller(false);
        setImages(Array(4).fill(null));
      }else{
      toast.error(response.data.message)
      }

    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(error.message)
    }
  };

  return (
    <div className="add-container">
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="upload-section">
          <p className="section-title">Upload Image</p>
          <div className="upload-grid">
            {images.map((image, index) => (
              <label key={index} htmlFor={`image${index}`} className="upload-box">
                {image ? (
                  <img className="upload-preview" src={URL.createObjectURL(image)} alt="Preview" />
                ) : (
                  <IoCloudUpload className="upload-icon" />
                )}
                <input
                  type="file"
                  id={`image${index}`}
                  className="file-input"
                  onChange={(e) => handleImageChange(e, index)}
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>
        <div className="input-section">
          <p className="section-title">Product Name</p>
          <input
            type="text"
            placeholder="Type Here"
            className="text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-section">
          <p className="section-title">Product Description</p>
          <textarea
            placeholder="Write Content here"
            className="textarea-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="category-section">
          <div>
            <p className="section-title">Product Category</p>
            <select
              className="dropdown"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="section-title">Sub Category</p>
            <select
              className="dropdown"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>
        <div className="input-section">
          <p className="section-title">Product Price</p>
          <input
            type="number"
            placeholder="100"
            className="text-input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="sizes-section">
          <p className="section-title">Product Sizes</p>
          <div className="size-options">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`size-box ${sizes.includes(size) ? "selected" : ""}`}
                onClick={() => handleSizeClick(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="checkbox-section">
          <input
            type="checkbox"
            id="bestSeller"
            className="checkbox-input"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
          />
          <label htmlFor="bestSeller">Add to Bestseller</label>
        </div>
        <button type="submit" className="submit-button">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
