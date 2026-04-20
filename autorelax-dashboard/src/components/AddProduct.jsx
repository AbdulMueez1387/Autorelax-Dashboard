import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "Fluids",
    quantity: "",
    price: "",
    discount: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const existing = JSON.parse(localStorage.getItem("inventory")) || [];

    const newItem = {
      ...formData,
      totalCapacity: formData.quantity,
      id: Date.now(),
    };

    localStorage.setItem("inventory", JSON.stringify([...existing, newItem]));
    navigate("/inventory");
  };

  return (
    <div className="add-product-container">
      
      <div className="add-product-header">
        <h1>Add Product</h1>
        <p>Add new item into inventory</p>
      </div>

      <div className="add-product-card">
        <form onSubmit={handleSave}>

          {/* Image Upload */}
          <div
            className="image-upload-box"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {formData.image ? (
              <img src={formData.image} alt="preview" />
            ) : (
              <p>Upload Image</p>
            )}
            <input
              type="file"
              id="fileInput"
              hidden
              onChange={handleImageChange}
            />
          </div>

          {/* Form Grid */}
          <div className="form-grid">
            <input
              type="text"
              placeholder="Product Name"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option>Fluids</option>
              <option>Cleaning</option>
              <option>Tools</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Quantity"
              required
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Discount %"
              onChange={(e) =>
                setFormData({ ...formData, discount: e.target.value })
              }
            />
          </div>

          <button type="submit" className="save-btn">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;