import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import creditCard from "../images/creditCard.png";
import swish from "../images/swish.png";
import appService from "../services/appService";
import Modal from "react-modal";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cVV, setCVV] = useState("");
  const [monthOfExpiry, setMonthOfExpiry] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [randomDeliveryTime, setRandomDeliveryTime] = useState(0);
  const navigate = useNavigate();

  const service = new appService();

  function getCart() {
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    setCart(cart);
  }

  function getTotal() {
    let total = 0;
    cart.forEach((cartItem) => {
      total += cartItem.price * 100; // Multiply and later divide by 100 to avoid floating point errors
    });
    total /= 100;
    setTotal(total.toFixed(2));
  }

  function handleCardNumberInput(event) {
    setCardNumber(event.target.value);
  }

  function handleCVVInput(event) {
    setCVV(event.target.value);
  }

  function handleMonthOfExpiryInput(event) {
    const monthOfExpiryInput = new Date(event.target.value);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() - 1);

    if (monthOfExpiryInput < nextMonth) {
      alert("The provided card has expired.");
      return;
    }

    setMonthOfExpiry(event.target.value);
  }

  function handleTelephoneNumberInput(event) {
    setTelephoneNumber(event.target.value);
  }

  function handleFirstNameInput(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameInput(event) {
    setLastName(event.target.value);
  }

  function handleCityInput(event) {
    setCity(event.target.value);
  }

  function handleStreetInput(event) {
    setStreet(event.target.value);
  }

  function handleHouseNumberInput(event) {
    setHouseNumber(event.target.value);
  }

  function handleCardSubmit(event) {
    event.preventDefault();

    setRandomDeliveryTime(Math.floor(Math.random() * 40) + 20);

    if (
      service.checkInputEmpty(cardNumber) ||
      service.checkInputEmpty(cVV) ||
      service.checkInputEmpty(monthOfExpiry) ||
      service.checkInputEmpty(firstName) ||
      service.checkInputEmpty(lastName) ||
      service.checkInputEmpty(city) ||
      service.checkInputEmpty(street) ||
      service.checkInputEmpty(houseNumber)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      service.checkInputLength(firstName) ||
      service.checkInputLength(lastName) ||
      service.checkInputLength(city) ||
      service.checkInputLength(street) ||
      service.checkInputLength(houseNumber)
    ) {
      alert("Please provide inputs with a maximum of 12 characters.");
      return;
    }

    if (
      service.checkIfDigits(firstName) ||
      service.checkIfDigits(lastName) ||
      service.checkIfDigits(city)
    ) {
      alert(
        'Digits are only allowed in the "House number" and "Street" field.'
      );
      return;
    }

    if (
      service.checkIfSpecialCharacter(firstName) ||
      service.checkIfSpecialCharacter(lastName) ||
      service.checkIfSpecialCharacter(city) ||
      service.checkIfSpecialCharacter(street) ||
      service.checkIfSpecialCharacter(houseNumber)
    ) {
      alert("Special characters are not allowed.");
      return;
    }

    if (cardNumber.length !== 16) {
      alert("Please provide card number with 16 digits.");
      return;
    }

    if (cVV.length !== 3) {
      alert("Please provide CVV number with 3 digits.");
      return;
    }

    if (cardNumber.includes("e") || cVV.includes("e")) {
      alert("Please provide only digits.");
      return;
    }

    openModal();
  }

  function handleSwishSubmit(event) {
    event.preventDefault();

    setRandomDeliveryTime(Math.floor(Math.random() * 40) + 20);

    if (
      service.checkInputEmpty(firstName) ||
      service.checkInputEmpty(lastName) ||
      service.checkInputEmpty(city) ||
      service.checkInputEmpty(street) ||
      service.checkInputEmpty(houseNumber) ||
      service.checkInputEmpty(telephoneNumber)
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (telephoneNumber.length < 8 || telephoneNumber.length > 14) {
      alert("Please provide a telephone number with 8-14 digits.");
      return;
    }

    openModal();
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    clearCart();
    navigate("/");
  }

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getTotal();
  }, [cart]);

  function checkout() {
    clearCart();
  }

  function clearCart() {
    localStorage.removeItem("cart");
    setCart([]);
  }

  return (
    <div className='center-items'>
      <h1>Summary</h1>
      {cart.length === 0 ? (
        <h2 style={{ margin: "3rem" }}>Your cart is empty</h2>
      ) : (
        <div className='center-items'>
          <div
            className='center-items menu-item-card'
            style={{
              height: "auto",
              paddingTop: "0.5rem",
              paddingBottom: "1rem",
            }}
          >
            <h2 style={{ marginBottom: "0.5rem" }}>Order:</h2>
            <div style={{ width: "100%" }}>
              {cart.map((cartItem, index) => (
                <div key={index} style={{ width: "100%" }}>
                  <div>
                    <label className='input-label'>{cartItem.title}</label>
                    <label>${cartItem.price}</label>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ width: "100%" }}>
              <label className='input-label'>Total</label>
              <label>${total}</label>
            </div>
            <Link to={"/menu"}>
              <button
                className='add-to-cart-btn'
                style={{ width: "auto", fontSize: "1.3rem" }}
              >
                Go to menu
              </button>
            </Link>
            <Link to={"/cart"}>
              <button
                className='add-to-cart-btn'
                style={{ width: "auto", fontSize: "1.3rem" }}
              >
                Go to cart
              </button>
            </Link>
          </div>
          <div
            className='center-items menu-item-card'
            style={{
              height: "auto",
              paddingTop: "0.5rem",
              paddingBottom: "1rem",
            }}
          >
            <h2 style={{ marginBottom: "0.5rem" }}>Specify shipping details</h2>
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%" }}>
                <label className='input-label'>First name:</label>
                <input
                  type='text'
                  value={firstName}
                  onChange={handleFirstNameInput}
                  placeholder='First name'
                />
              </div>
              <div>
                <label className='input-label'>Last name:</label>
                <input
                  type='text'
                  value={lastName}
                  onChange={handleLastNameInput}
                  placeholder='Last name'
                />
              </div>
              <div>
                <label className='input-label'>City:</label>
                <input
                  type='text'
                  value={city}
                  onChange={handleCityInput}
                  placeholder='City'
                />
              </div>
              <div>
                <label className='input-label'>Street:</label>
                <input
                  type='text'
                  value={street}
                  onChange={handleStreetInput}
                  placeholder='Street'
                />
              </div>
              <div>
                <label className='input-label'>House number:</label>
                <input
                  type='number'
                  value={houseNumber}
                  onChange={handleHouseNumberInput}
                  placeholder='House number'
                />
              </div>
            </div>
          </div>

          <div>
            <div className='center-items'>
              <h2 style={{ margin: "1rem" }}>How would you like to pay?</h2>
              <div className='payment-container'>
                <div className='payment-card'>
                  <h2 style={{ margin: "1rem" }}>Card</h2>
                  <img
                    src={creditCard}
                    alt='credit card'
                    className='credit-card'
                  />
                  <div>
                    <form onSubmit={handleCardSubmit} style={{ width: "100%" }}>
                      <div style={{ width: "100%", display: "flex" }}>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <label
                            className='input-label'
                            style={{ width: "80%" }}
                          >
                            Card number:
                          </label>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type='number'
                            value={cardNumber}
                            onChange={handleCardNumberInput}
                            placeholder='Card number'
                            style={{ width: "auto" }}
                          />
                        </div>
                      </div>
                      <div style={{ width: "100%", display: "flex" }}>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <label className='input-label'>CVV:</label>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type='number'
                            value={cVV}
                            onChange={handleCVVInput}
                            placeholder='CVV'
                            style={{ width: "100%" }}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          marginBottom: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <label
                            className='input-label'
                            style={{ width: "100%" }}
                          >
                            Date of expiry:
                          </label>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type='month'
                            value={monthOfExpiry}
                            onChange={handleMonthOfExpiryInput}
                            style={{ width: "auto" }}
                          />
                        </div>
                      </div>

                      <div className='center-items'>
                        <button
                          type='submit'
                          className='add-to-cart-btn'
                          style={{ width: "auto", fontSize: "1.3rem" }}
                        >
                          Place order and pay
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='payment-card'>
                  <h2 style={{ margin: "1rem" }}>Swish</h2>
                  <img src={swish} alt='Swish' className='swish ' />
                  <div>
                    <form
                      onSubmit={handleSwishSubmit}
                      style={{ width: "100%" }}
                    >
                      <div style={{ width: "100%", display: "flex" }}>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <label
                            className='input-label'
                            style={{ width: "100%" }}
                          >
                            Telephone number:
                          </label>
                        </div>
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type='number'
                            value={telephoneNumber}
                            onChange={handleTelephoneNumberInput}
                            placeholder='Telephone number'
                            style={{ width: "auto" }}
                          />
                        </div>
                      </div>
                      <div className='center-items'>
                        <button
                          type='submit'
                          className='add-to-cart-btn'
                          style={{ width: "auto", fontSize: "1.3rem" }}
                        >
                          Place order and pay
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal'>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "1.5rem" }}>Thank you!</h2>
          <h2 style={{ marginBottom: "1.5rem" }}>
            Your order will be delivered within approximately
          </h2>
          <h2 style={{ marginBottom: "1.5rem" }}>
            {randomDeliveryTime} minutes.
          </h2>
        </div>
        <Link to={"/"}>
          <button
            onClick={checkout}
            className='add-to-cart-btn'
            style={{ fontSize: "1.3rem" }}
          >
            Close window
          </button>
        </Link>
      </Modal>
    </div>
  );
}

export default Checkout;
