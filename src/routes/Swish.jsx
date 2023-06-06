import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import appService from "../services/appService";

function Swish() {
  const [swishDetails, setSwishDetails] = useState([]);
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useState(() => {
    getSwishDetails();
  }, []);

  function clearSwishDetails() {
    localStorage.removeItem("swishDetails");
    setSwishDetails([]);
    setTelephoneNumber("");
  }

  function removeCardDetails() {
    localStorage.removeItem("cardDetails");
  }

  function getSwishDetails() {
    let swishDetails = localStorage.getItem("swishDetails");
    if (!swishDetails) {
      swishDetails = [];
    } else {
      swishDetails = JSON.parse(swishDetails);
    }
    setSwishDetails(swishDetails);
  }

  function handleTelephoneNumberInput(event) {
    setTelephoneNumber(event.target.value);
  }

  function openModal() {
    setModalIsOpen(true);
    getSwishDetails();
  }

  function closeModal() {
    setModalIsOpen(false);
    getSwishDetails();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const service = new appService();

    let swishDetails = [];

    swishDetails.push({
      type: "Swish",
      telephoneNumber: telephoneNumber.trim(),
    });

    localStorage.setItem("swishDetails", JSON.stringify(swishDetails));

    removeCardDetails();

    openModal();
  }

  return (
    <div className='center-items'>
      <h1>Swish payment</h1>
      {swishDetails.length === 0 ||
      swishDetails[0].telephoneNumber.length === 0 ? (
        <h2 style={{ marginTop: "2rem", marginBottom: "1.5rem" }}></h2>
      ) : (
        <div
          className='center-items menu-item-card'
          style={{
            height: "auto",
            paddingTop: "0.5rem",
            paddingBottom: "1rem",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>Saved telephone number</h2>
          {swishDetails.map((swishDetail, index) => (
            <div key={index} style={{ width: "100%" }}>
              <div>
                <label className='input-label'>Telephone number:</label>
                <label>{swishDetail.telephoneNumber}</label>
              </div>
            </div>
          ))}
          <Link to={"/summary"}>
            <button
              className='add-to-cart-btn'
              style={{ width: "auto", fontSize: "1.3rem" }}
            >
              Go to summary
            </button>
          </Link>
          <button
            className='add-to-cart-btn'
            style={{ width: "auto", fontSize: "1.3rem" }}
            onClick={clearSwishDetails}
          >
            Clear details
          </button>
        </div>
      )}
      <div
        className='center-items menu-item-card'
        style={{
          height: "auto",
          paddingTop: "0.5rem",
          paddingBottom: "1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.5rem" }}>
          Specify/update telephone number
        </h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            <label className='input-label'>Telephone number:</label>
            <input
              type='text'
              value={telephoneNumber}
              onChange={handleTelephoneNumberInput}
              placeholder='Telephone number'
            />
          </div>
          <div className='center-items'>
            <button
              type='submit'
              className='add-to-cart-btn'
              style={{ width: "auto", fontSize: "1.3rem" }}
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal'>
        <h2 style={{ marginBottom: "1.5rem" }}>
          Your telephone number has been saved!
        </h2>

        <button
          onClick={closeModal}
          className='add-to-cart-btn'
          style={{ width: "30%", fontSize: "1.3rem" }}
        >
          Close window
        </button>
        <Link to={"/summary"}>
          <button
            className='add-to-cart-btn'
            style={{ width: "100%", fontSize: "1.3rem" }}
          >
            Go to summary
          </button>
        </Link>
      </Modal>
    </div>
  );
}

export default Swish;
