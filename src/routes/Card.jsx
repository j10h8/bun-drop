import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import appService from "../services/appService";

function Card() {
  const [cardDetails, setCardDetails] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cVV, setCVV] = useState("");
  const [dateOfExpiry, setDateOfExpiry] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useState(() => {
    getCardDetails();
  }, []);

  function clearCardDetails() {
    localStorage.removeItem("cardDetails");
    setCardDetails([]);
    setCardNumber("");
    setCVV("");
    setDateOfExpiry("");
  }

  function getCardDetails() {
    let cardDetails = localStorage.getItem("cardDetails");
    if (!cardDetails) {
      cardDetails = [];
    } else {
      cardDetails = JSON.parse(cardDetails);
    }
    setCardDetails(cardDetails);
  }

  function handleCardNumberInput(event) {
    setCardNumber(event.target.value);
  }

  function handleCVVInput(event) {
    setCVV(event.target.value);
  }

  function handleDateOfExpiryInput(event) {
    setDateOfExpiry(event.target.value);
  }

  function openModal() {
    setModalIsOpen(true);
    getCardDetails();
  }

  function closeModal() {
    setModalIsOpen(false);
    getCardDetails();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const service = new appService();

    let cardDetails = [];

    cardDetails.push({
      type: "card",
      cardNumber: cardNumber.trim(),
      cVV: cVV.trim(),
      dateOfExpiry: dateOfExpiry.trim(),
    });

    localStorage.setItem("cardDetails", JSON.stringify(cardDetails));

    localStorage.removeItem("swishDetails");

    openModal();
  }

  return (
    <div className="center-items">
      <h1>Credit card payment</h1>
      {cardDetails.length === 0 || cardDetails[0].cardNumber.length === 0 ? (
        <h2 style={{ marginTop: "2rem", marginBottom: "1.5rem" }}></h2>
      ) : (
        <div
          className="center-items menu-item-card"
          style={{
            height: "auto",
            paddingTop: "0.5rem",
            paddingBottom: "1rem",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>Saved card details</h2>
          {cardDetails.map((cardDetail, index) => (
            <div key={index} style={{ width: "100%" }}>
              <div>
                <label className="input-label">Card number:</label>
                <label>{cardDetail.cardNumber}</label>
              </div>
              <div>
                <label className="input-label">CVV:</label>
                <label>{cardDetail.cVV}</label>
              </div>
              <div>
                <label className="input-label">Date of expiry:</label>
                <label>{cardDetail.dateOfExpiry}</label>
              </div>
            </div>
          ))}
          <Link to={"/summary"}>
            <button
              className="add-to-cart-btn"
              style={{ width: "auto", fontSize: "1.3rem" }}
            >
              Go to summary
            </button>
          </Link>
          <button
            className="add-to-cart-btn"
            style={{ width: "auto", fontSize: "1.3rem" }}
            onClick={clearCardDetails}
          >
            Clear details
          </button>
        </div>
      )}
      <div
        className="center-items menu-item-card"
        style={{
          height: "auto",
          paddingTop: "0.5rem",
          paddingBottom: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>Specify/update card details</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <label className="input-label">Card number:</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberInput}
              placeholder="Card number"
            />
          </div>
          <div>
            <label className="input-label">CVV:</label>
            <input
              type="text"
              value={cVV}
              onChange={handleCVVInput}
              placeholder="CVV"
            />
          </div>
          <div>
            <label className="input-label">Date of expiry:</label>
            <input
              type="text"
              value={dateOfExpiry}
              onChange={handleDateOfExpiryInput}
              placeholder="Date of expiry"
            />
          </div>
          <div className="center-items">
            <button
              type="submit"
              className="add-to-cart-btn"
              style={{ width: "auto", fontSize: "1.3rem" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2 style={{ marginBottom: "1.5rem" }}>
          Your card details have been saved!
        </h2>

        <button
          onClick={closeModal}
          className="add-to-cart-btn"
          style={{ width: "30%", fontSize: "1.3rem" }}
        >
          Close window
        </button>
        <Link to={"/summary"}>
          <button
            className="add-to-cart-btn"
            style={{ width: "100%", fontSize: "1.3rem" }}
          >
            Go to summary
          </button>
        </Link>
      </Modal>
    </div>
  );
}

export default Card;
