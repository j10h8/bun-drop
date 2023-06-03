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
  }, []);

  return (
    <div>
      {cart.map((menuItem, index) => (
        <div key={index}>
          <h1>{menuItem.title}</h1>
          <h1>{menuItem.price}</h1>
        </div>
      ))}
    </div>
  );
}

export default Cart;
