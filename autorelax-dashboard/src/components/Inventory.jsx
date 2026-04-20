import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrashAlt,
  FaTimes,
  FaBox,
  FaExclamationTriangle,
  FaTags,
  FaUpload,
  FaEllipsisH,
  FaEye,
  FaTimesCircle
} from "react-icons/fa";
import "./Inventory.css";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState(() => {
    const savedData = localStorage.getItem("inventory");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeMenu, setActiveMenu] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Fluids",
    quantity: "",
    totalCapacity: "",
    price: "",
    discount: "",
    image: "",
  });

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventoryData));
  }, [inventoryData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setFormData({ ...formData, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const getStatus = (item) => {
    const qty = Number(item.quantity);
    const capacity = Number(item.totalCapacity);
    if (qty <= 0) return "Out of Stock";
    if (qty <= capacity * 0.05) return "Low Stock";
    return "In Stock";
  };

  const handleSave = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      totalCapacity: isEditing ? formData.totalCapacity : formData.quantity,
    };

    if (isEditing) {
      setInventoryData(
        inventoryData.map((item) =>
          item.id === editId ? { ...finalData, id: editId } : item,
        ),
      );
    } else {
      setInventoryData([...inventoryData, { ...finalData, id: Date.now() }]);
    }
    closeModal();
  };

  const openEditModal = (item) => {
    setFormData(item);
    setEditId(item.id);
    setIsEditing(true);
    setShowModal(true);
    setActiveMenu(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      name: "",
      category: "Fluids",
      quantity: "",
      totalCapacity: "",
      price: "",
      discount: "",
      image: "",
    });
  };

  const filteredData = inventoryData.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <h1>Inventory Management</h1>
        <p>Real-time stock tracking and management.</p>
      </header>

      <div className="stats-grid">
        {/* Total Items */}
        <div className="stat-card blue-theme">
          <div className="stat-icon">
            <FaBox />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Items</span>
            <h2 className="stat-count">{inventoryData.length}</h2>
          </div>
        </div>

        {/* Low Stock */}
        <div className="stat-card orange-theme">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-label">Low Stock</span>
            <h2 className="stat-count">
              {inventoryData.filter((i) => getStatus(i) === "Low Stock").length}
            </h2>
          </div>
        </div>

        {/* Out of Stock ✅ NEW */}
        <div className="stat-card red-theme">
          <div className="stat-icon">
            <FaTimesCircle />
          </div>
          <div className="stat-info">
            <span className="stat-label">Out of Stock</span>
            <h2 className="stat-count">
              {
                inventoryData.filter((i) => getStatus(i) === "Out of Stock")
                  .length
              }
            </h2>
          </div>
        </div>

        {/* Categories */}
        <div className="stat-card purple-theme">
          <div className="stat-icon">
            <FaTags />
          </div>
          <div className="stat-info">
            <span className="stat-label">Categories</span>
            <h2 className="stat-count">
              {[...new Set(inventoryData.map((i) => i.category))].length}
            </h2>
          </div>
        </div>
      </div>

      <div className="table-section">
        <div className="table-header">
          <div className="header-left">
            <span className="items-list-text">Items List</span>
            <select
              className="category-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Fluids">Fluids</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Tools">Tools</option>
            </select>
          </div>
          <div className="table-actions">
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="add-btn" onClick={() => setShowModal(true)}>
              <FaPlus /> Add Item
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Disc%</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => {
                const status = getStatus(item);
                return (
                  <tr key={item.id}>
                    <td className="item-name-cell">
                      <img
                        src={item.image || "https://via.placeholder.com/40"}
                        alt=""
                        className="item-img"
                      />
                      <span className="truncate-text">{item.name}</span>
                    </td>
                    <td>{item.category}</td>
                    <td>Rs. {item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.discount}%</td>
                    <td>
                      <span
                        className={`status-pill ${status.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="action-col">
                      <div className="action-wrapper">
                        <button
                          className="icon-btn edit"
                          onClick={() => openEditModal(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="icon-btn menu"
                          onClick={() =>
                            setActiveMenu(
                              activeMenu === item.id ? null : item.id,
                            )
                          }
                        >
                          <FaEllipsisH />
                        </button>
                        {activeMenu === item.id && (
                          <div className="dropdown-menu">
                            <button
                              onClick={() => {
                                if (window.confirm("Delete?"))
                                  setInventoryData(
                                    inventoryData.filter(
                                      (i) => i.id !== item.id,
                                    ),
                                  );
                              }}
                            >
                              <FaTrashAlt /> Delete
                            </button>
                            <button>
                              <FaEye /> Details
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditing ? "Update Product" : "Add New Product"}</h2>
              <div className="close-modal-icon" onClick={closeModal}>
                <FaTimes />
              </div>
            </div>
            <form onSubmit={handleSave}>
              <div
                className="image-upload-box"
                onClick={() => document.getElementById("fileInput").click()}
              >
                {formData.image ? (
                  <img src={formData.image} alt="preview" />
                ) : (
                  <>
                    <FaUpload /> <p>Upload Image</p>
                  </>
                )}
                <input
                  type="file"
                  id="fileInput"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Fluids">Fluids</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Tools">Tools</option>
                </select>
                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  required
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Discount %"
                  value={formData.discount}
                  onChange={(e) =>
                    setFormData({ ...formData, discount: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="save-btn">
                {isEditing ? "Update Product" : "Save Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
