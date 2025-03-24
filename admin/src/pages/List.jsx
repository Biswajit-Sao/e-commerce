import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './List.css'; 
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/list'); // Use Axios for the GET request
        setProducts(response.data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    if (removing) return; // Prevent multiple clicks
    setRemoving(true);

    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        // Update the product list after removal
        setProducts(products.filter(product => product._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setRemoving(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="list-container">
      <h1>Product List</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Sizes</th>
            <th>Bestseller</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.toReversed().map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.image[0] || 'default-image-url'} alt={product.name} className="product-image" />
              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.subCategory}</td>
              <td>
                <div className="product-sizes">
                  {product.sizes.map((size, index) => (
                    <span key={index} className="size">{size}</span>
                  ))}
                </div>
              </td>
              <td>
                {product.bestseller && <span className="bestseller">Bestseller</span>}
              </td>
              <td>
                <MdDelete
                  className="delete-icon"
                  onClick={() => removeProduct(product._id)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;