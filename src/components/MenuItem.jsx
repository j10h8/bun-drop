import React from "react";

function MenuItem(props) {
  return (
    <div className='menu-item-card'>
      <h1>{props.item.title}</h1>
      <h1>${props.item.price}</h1>
      <div style={{ display: "flex", marginTop: "1rem" }}>
        <img src={props.item.image} className='menu-image' alt={"image"} />
      </div>
      <div>
        <button className='add-to-cart-btn'>Add to cart</button>
      </div>
    </div>
  );
}

export default MenuItem;
