import React, { useState, useEffect } from "react";
import Burger from "../components/Burger";
import MenuItem from "../components/MenuItem";

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
    <div className='grid-layout'>
      {burgers.map((burger) => (
        <Burger key={burger.id} burger={burger} />
      ))}
      {fries.map((fries) => (
        <MenuItem key={fries.id} item={fries} />
      ))}
      {drinks.map((drink) => (
        <MenuItem key={drink.id} item={drink} />
      ))}
    </div>
  );
}

export default Menu;
