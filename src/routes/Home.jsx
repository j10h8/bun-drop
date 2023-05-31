import React from "react";
import logo from "../images/logo color.png";

function Home() {
  return (
    <div className='center-items'>
      <img src={logo} alt='logo' className='logo' />
      <h1>Menu</h1>
      <h1>About</h1>
      <h1>Terms & Conditions</h1>
    </div>
  );
}

export default Home;
