import React, { useState, useEffect } from "react";

function Burger(props) {
  const [menuItem, setMenuItem] = useState([]);

  function setItem() {
    setMenuItem(props.burger);
  }
  useEffect(() => {
    addToCart();
  }, [menuItem]);

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
      <h1>{props.burger.title}</h1>
      <h1>${props.burger.price}</h1>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <img src={props.burger.image} className='menu-image' alt={"image"} />
        <div className='center-items'>
          <h2>Toppings</h2>
          {props.burger.toppings ? (
            <div>
              {props.burger.toppings.map((topping) => (
                <h3 key={props.topping}>{topping}</h3>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div>
        <button className='add-to-cart-btn' onClick={setItem}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Burger;
