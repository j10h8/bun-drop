import React, { useEffect, useState } from "react";

function MenuItem(props) {
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    setMenuItem(props.item);
  }, [props.item]);

  function addToCart() {
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    cart.push(menuItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div className='menu-item-card'>
      <h1>{props.item.title}</h1>
      <h1>${props.item.price}</h1>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <img src={props.item.image} className='menu-image' alt={"Menu item"} />
      </div>
      <div>
        <button className='add-to-cart-btn' onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default MenuItem;
