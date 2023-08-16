import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Home.css";

export default function Home({ addItemToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=7").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="home_container">
      <div className="searchbar_container">
        <input
          type="text"
          className="searchbar"
          placeholder="Search for products"
        />
      </div>
      <div className="products_container">
        {products.map((product, index) => {
          return (
            <div className="product" key={index}>
              <img src={product.image} className="product_image" />
              <div className="product_details">
                <span className="product_title">{product.title}</span>
                <span className="product_price">${product.price}</span>
              </div>
              <div
                className="add_to_cart_btn"
                onClick={() => {
                  addItemToCart(product);
                  console.log(product);
                }}
              >
                <span className="add_to_cart">Add to Cart</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
