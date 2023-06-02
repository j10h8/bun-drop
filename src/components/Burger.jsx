import React from "react";

function Burger(props) {
  return (
    <div className='menu-item-card'>
      <h1>{props.burger.title}</h1>
      <h1>${props.burger.price}</h1>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <img src={props.burger.image} className='menu-image' alt={"image"} />
        <div style={{ alignItems: "top" }} className='center-items'>
          <h2>Toppings</h2>
          {props.burger.toppings ? (
            <div>
              {props.burger.toppings.map((topping) => (
                <h3 key={props.id}>{topping}</h3>
              ))}
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Burger;
