import React, { useState, useEffect } from "react";
import "../styles/Scan.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default function Scan() {
  const [itemInfo, setItemInfo] = useState({ text: "Info goes here..." });
  const [showScanner, setShowScanner] = useState(false);
  const [scannedProduct, setScannedProduct] = useState();

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
        if (JSON.stringify(result).length == 3) {
          const endPoint = "https://fakestoreapi.com/products/" + result;
          console.log(endPoint);
          const options = {
            method: "get",
            url: endPoint,
            data: {
              name: result,
            },
          };
          axios
            .request(options)
            .then((res) => {
              console.log(res.data);
              setItemInfo(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

      function error(err) {}
    }
  }, [showScanner]);

  return (
    <div className="scan_container">
      <div className="scan">
        <span className="scan_heading">Scan item QR to get item info</span>
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
      <div className="items_info_container">
        <div className="info_heading">
          <span className="info_title">Product Info</span>
        </div>
        {itemInfo.title ? (
          <>
            <div className="info">Title : {itemInfo.title}</div>
            <div className="info">Price : ${itemInfo.price}</div>
            <div className="info">Description : {itemInfo.description}</div>
            <div className="info">Category : {itemInfo.category}</div>
            <div className="info">
              Image URL : <a href={itemInfo.image}>{itemInfo.image}</a>
            </div>
            <div className="info">Rating : {itemInfo.rating.rate}</div>
          </>
        ) : (
          <div className="info">{itemInfo.text}</div>
        )}
      </div>
    </div>
  );
}
