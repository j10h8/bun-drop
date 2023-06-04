import React, { useEffect, useState } from "react";

function Burger(props) {
  const [menuItem, setMenuItem] = useState([]);

  useEffect(() => {
    setMenuItem(props.burger);
  }, [props.burger]);

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
        <img
          src={props.burger.image}
          className='menu-image'
          alt={"Menu item"}
        />
        <div className='center-items'>
          <h2>Toppings</h2>
          {props.burger.toppings ? (
            <div>
              {props.burger.toppings.map((topping, index) => (
                <h3 key={index}>{topping}</h3>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div>
        <button className='add-to-cart-btn' onClick={addToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Burger;
