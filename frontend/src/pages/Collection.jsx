import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import { IoFilterSharp } from "react-icons/io5";
import Title from "../components/Title";
import Productitem from "../components/Productitem";
import "./Collection.css";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // Toggle category filter
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle subcategory filter
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    // Apply sorting
    if (sortType === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, showSearch, category, subCategory, sortType]);

  return (
    <div className="collection-container">
      {/* Filter Section */}
      <div className="filter-section">
        <p className="filter-toggle" onClick={() => setShowFilter(!showFilter)}>
          FILTERS{" "}
          <IoFilterSharp className={`filter-icon ${showFilter ? "active" : ""}`} />
        </p>

        {/* Category Filter */}
        {showFilter && (
          <>
            <div className="filter-options">
              <p className="filter-heading">CATEGORIES</p>
              <div className="filter-category">
                {["Men", "Women", "Kids"].map((cat) => (
                  <label key={cat}>
                    <input
                      type="checkbox"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                    />{" "}
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory Filter */}
            <div className="filter-options">
              <p className="filter-heading">TYPE</p>
              <div className="filter-category">
                {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
                  <label key={subCat}>
                    <input
                      type="checkbox"
                      value={subCat}
                      checked={subCategory.includes(subCat)}
                      onChange={toggleSubCategory}
                    />{" "}
                    {subCat}
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Product Section */}
      <div className="product-section">
        <div className="product-header">
          <Title text1={"All"} text2={"Collections"} />
          <select
            className="sort-dropdown"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((item) => (
            <Productitem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;