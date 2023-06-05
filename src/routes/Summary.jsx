import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Summary() {
  const [shippingDetails, setShippingDetails] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  function getCart() {
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    setCart(cart);
  }

  function getShippingDetails() {
    let shippingDetails = localStorage.getItem("shippingDetails");
    if (!shippingDetails) {
      shippingDetails = [];
    } else {
      shippingDetails = JSON.parse(shippingDetails);
    }
    setShippingDetails(shippingDetails);
  }

  function getTotal() {
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.price * 100; // Multiply and later divide by 100 to avoid floating point errors
    });
    total /= 100;
    setTotal(total.toFixed(2));
  }

  useEffect(() => {
    getShippingDetails();
    getCart();
  }, []);

  useEffect(() => {
    getTotal();
  }, [cart]);

  return (
    <div className='center-items'>
      <h1>Summary</h1>
      <div
        className='center-items menu-item-card'
        style={{
          height: "auto",
          paddingTop: "0.5rem",
          paddingBottom: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Order:</h2>
        {cart.map((cartItem, index) => (
          <div key={index} style={{ width: "100%" }}>
            <div>
              <label className='input-label'>{cartItem.title}</label>
              <label>${cartItem.price}</label>
            </div>
          </div>
        ))}
        <div style={{ width: "100%" }}>
          <label className='input-label'>Total</label>
          <label>${total}</label>
        </div>
        <Link to={"/menu"}>
          <button
            className='add-to-cart-btn'
            style={{ width: "auto", fontSize: "1.3rem" }}
          >
            Back to Menu
          </button>
        </Link>
      </div>
      <div
        className='center-items menu-item-card'
        style={{
          height: "auto",
          paddingTop: "0.5rem",
          paddingBottom: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Ship to:</h2>
        {shippingDetails.map((shippingDetail, index) => (
          <div key={index} style={{ width: "100%" }}>
            <div>
              <label className='input-label'>First name:</label>
              <label style={{ width: "50%" }}>{shippingDetail.firstName}</label>
            </div>
            <div>
              <label className='input-label'>Last name:</label>
              <label>{shippingDetail.lastName}</label>
            </div>
            <div>
              <label className='input-label'>City:</label>
              <label>{shippingDetail.city}</label>
            </div>
            <div>
              <label className='input-label'>Street:</label>
              <label>{shippingDetail.street}</label>
            </div>
            <div>
              <label className='input-label'>House number:</label>
              <label>{shippingDetail.houseNumber}</label>
            </div>
          </div>
        ))}
        <Link to={"/shipping"}>
          <button
            className='add-to-cart-btn'
            style={{ width: "auto", fontSize: "1.3rem" }}
          >
            Change shipping details
          </button>
        </Link>
      </div>
      <div
        className='center-items menu-item-card'
        style={{
          height: "auto",
          paddingTop: "0.5rem",
          paddingBottom: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Pay with:</h2>
        {shippingDetails.map((shippingDetail, index) => (
          <div key={index} style={{ width: "100%" }}>
            <div>
              <label className='input-label'>First name:</label>
              <label style={{ width: "50%" }}>{shippingDetail.firstName}</label>
            </div>
            <div>
              <label className='input-label'>Last name:</label>
              <label>{shippingDetail.lastName}</label>
            </div>
            <div>
              <label className='input-label'>City:</label>
              <label>{shippingDetail.city}</label>
            </div>
            <div>
              <label className='input-label'>Street:</label>
              <label>{shippingDetail.street}</label>
            </div>
            <div>
              <label className='input-label'>House number:</label>
              <label>{shippingDetail.houseNumber}</label>
            </div>
          </div>
        ))}
        <Link to={"/payment"}>
          <button
            className='add-to-cart-btn'
            style={{ width: "auto", fontSize: "1.3rem" }}
          >
            Change payment details
          </button>
        </Link>
      </div>
    </div>

    // <div>
    //   {shippingDetails.map((shippingDetail, index) => (
    //     <div key={index}>
    //       <h1>{shippingDetail.firstName}</h1>
    //       <h1>{shippingDetail.lastName}</h1>
    //       <h1>{shippingDetail.city}</h1>
    //       <h1>{shippingDetail.street}</h1>
    //       <h1>{shippingDetail.houseNumber}</h1>
    //     </div>
    //   ))}
    // </div>
  );
}

export default Summary;