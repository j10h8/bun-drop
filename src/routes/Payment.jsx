import React from "react";
import { Link } from "react-router-dom";
import creditCard from "../images/creditCard.png";
import swish from "../images/swish.png";

function Payment() {
  return (
    <div className='center-items'>
      <h1 style={{ marginBottom: "2rem" }}>How would you like to pay?</h1>

      <div className='payment-container'>
        <Link to={"/card"} className='link'>
          <div className='payment-card'>
            <img src={creditCard} alt='credit card' className='credit-card' />
          </div>
        </Link>
        <Link to={"/swish"} className='link'>
          <div className='payment-card'>
            <img src={swish} alt='Swish' className='swish ' />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Payment;
