import React, { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  function getCart() {
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    setCart(cart);
  }

  useEffect(() => {
    getCart();
  }, [cart]);

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div className='center-items'>
      <div className='cart-items-container'>
        {cart.map((cartItem, index) => (
          <div key={index} className='cart-item-card'>
            <div>
              <h2>{cartItem.title}</h2>
              <h2>${cartItem.price}</h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => removeFromCart(index)}
                className='remove-from-cart-btn'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
