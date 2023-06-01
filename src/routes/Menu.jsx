import React, { useState, useEffect } from "react";

function Menu() {
  const [burgers, setBurgers] = useState([]);
  const [fries, setFries] = useState([]);
  const [drinks, setDrinks] = useState([]);

  async function getBurgersAsync() {
    await fetch("http://localhost:7000/burgers")
      .then((response) => response.json())
      .then((jsonObject) => setBurgers(jsonObject));
  }

  async function getFriesAsync() {
    await fetch("http://localhost:7000/fries")
      .then((response) => response.json())
      .then((jsonObject) => setFries(jsonObject));
  }

  async function getDrinksAsync() {
    await fetch("http://localhost:7000/drinks")
      .then((response) => response.json())
      .then((jsonObject) => setDrinks(jsonObject));
  }

  useEffect(() => {
    getBurgersAsync();
    getFriesAsync();
    getDrinksAsync();
  }, []);

  return (
    <div>
      {burgers.map((burger) => (
        <div key={burger.id}>
          <h1>{burger.title}</h1>
          <img
            src={burger.image}
            style={{ width: "320px", borderRadius: "30px" }}
            alt={"image"}
          />
        </div>
      ))}
      {fries.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <img src={item.image} style={{ width: "320px" }} alt={"image"} />
        </div>
      ))}
      {drinks.map((drink) => (
        <div key={drink.id}>
          <h1>{drink.title}</h1>
          <img src={drink.image} style={{ width: "320px" }} alt={"image"} />
        </div>
      ))}
    </div>
  );
}

export default Menu;
