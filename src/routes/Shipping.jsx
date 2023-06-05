import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

function Shipping() {
  const [shippingDetails, setShippingDetails] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    getShippingDetails();
  }, []);

  function getShippingDetails() {
    let shippingDetails = localStorage.getItem("shippingDetails");
    if (!shippingDetails) {
      shippingDetails = [];
    } else {
      shippingDetails = JSON.parse(shippingDetails);
    }
    setShippingDetails(shippingDetails);
    console.log(shippingDetails);
    console.log(shippingDetails[0]);
  }

  function openModal() {
    setModalIsOpen(true);
    getShippingDetails();
  }

  function closeModal() {
    setModalIsOpen(false);
    getShippingDetails();
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

  function handleSubmit(event) {
    event.preventDefault();

    let shippingDetails = [];

    shippingDetails.push({
      firstName: firstName,
      lastName: lastName,
      city: city,
      street: street,
      houseNumber: houseNumber,
    });

    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));

    setFirstName("");
    setLastName("");
    setCity("");
    setStreet("");
    setHouseNumber("");

    openModal();
  }

  return (
    <div className='center-items'>
      <h1>Shipping details</h1>
      {shippingDetails[0].firstName.length === 0 ? (
        <h2>No prior shipping details have been specified</h2>
      ) : (
        <div>
          <h2>Currently saved shipping details</h2>
          {shippingDetails.map((shippingDetail, index) => (
            <div key={index}>
              <h2>First name: {shippingDetail.firstName}</h2>
              <h2>Last name: {shippingDetail.lastName}</h2>
              <h2>City: {shippingDetail.city}</h2>
              <h2>Street: {shippingDetail.street}</h2>
              <h2>House number: {shippingDetail.houseNumber}</h2>
            </div>
          ))}
        </div>
      )}
      <h1>Specify/update shipping details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type='text'
            value={firstName}
            onChange={handleFirstNameInput}
            placeholder='First name'
          />
          <input
            type='text'
            value={lastName}
            onChange={handleLastNameInput}
            placeholder='Last name'
          />
          <input
            type='text'
            value={city}
            onChange={handleCityInput}
            placeholder='City'
          />
          <input
            type='text'
            value={street}
            onChange={handleStreetInput}
            placeholder='Street'
          />
          <input
            type='text'
            value={houseNumber}
            onChange={handleHouseNumberInput}
            placeholder='House number'
          />
          <button type='submit'>Save</button>
        </div>
      </form>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal'>
        <h2>Your shipping details have been saved!</h2>

        <button
          onClick={closeModal}
          className='add-to-cart-btn'
          style={{ width: "30%", fontSize: "1.3rem" }}
        >
          Go back
        </button>
        <Link to={"/billing"}>
          <button
            className='add-to-cart-btn'
            style={{ width: "100%", fontSize: "1.3rem" }}
          >
            Go to payment
          </button>
        </Link>
      </Modal>
    </div>
  );
}

export default Shipping;
