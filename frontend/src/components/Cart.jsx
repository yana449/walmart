import React, { useEffect, useState } from "react";
import "../styles/Cart.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default function Cart({ cartitems }) {
  const [cartItems, setCartItems] = useState(cartitems);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState();
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(()=>{
    let total = 0;
    if(cartItems.length>0) {
      cartItems.map(e=>{
        total = total + e.price
      })
    }
    setCartTotal(total)
  }, [cartItems])

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner("scanner", {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 10,
      });

      scanner.render(success, error);

      function success(result) {
        scanner.clear();
        setShowScanner(false);
        console.log(result);
        setScannedProduct(result);

        const options = {
          method: "get",
          url: "https://fakestoreapi.com/products/" + result,
          data: {
            name: result,
          },
        };
        axios
          .request(options)
          .then((res) => {
            console.log(res.data);
            setCartItems([...cartItems, res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      function error(err) {}
    }
  }, [showScanner]);

  return (
    <div className="cart_container">
      <div className="scan">
        <span className="scan_heading">Scan item QR to add item to cart</span>
        <div className="scan_btn">
          <span className="btn_title" onClick={() => setShowScanner(true)}>
            Click to scan
          </span>
        </div>

        {showScanner ? (
          <div className="scanner_container">
            <div className="scanner_container_items">
              <span className="scanner_heading">
                Place the QR code inside the box to scan.
              </span>
              <div className="scanner" id="scanner"></div>
              <div className="close_scanner_btn">
                <span onClick={() => setShowScanner(false)}>Cancel</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="cart_items_container">
        <div className="cart_heading">
          <span className="cart_title">Cart Total: <em>${cartTotal}</em></span>
          <span className="cart_checkout_btn">
            Checkout
          </span>
        </div>
        <ul className="cart_items">
          {cartItems ? (
            cartItems.map((item, index) => {
              return(
                <li className="cart_item" key={index}>
                  <img src={item.image} className="cart_item_image" />
                  <span className="item_name">
                    {item.title}
                  </span>
                  <span className="cart_item_price">
                    ${item.price}
                  </span>
                </li>
              )
            })
          ) : (
            <span className="empty_cart">Cart is empty</span>
          )}
        </ul>
      </div>
    </div>
  );
}
