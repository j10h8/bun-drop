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

  function clearShippingDetails() {
    localStorage.removeItem("shippingDetails");
    setShippingDetails([]);
    setFirstName("");
    setLastName("");
    setCity("");
    setStreet("");
    setHouseNumber("");
  }

  function getShippingDetails() {
    let shippingDetails = localStorage.getItem("shippingDetails");
    if (!shippingDetails) {
      shippingDetails = [];
    } else {
      shippingDetails = JSON.parse(shippingDetails);
    }
    setShippingDetails(shippingDetails);
    console.log(shippingDetails);
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

    if (
      firstName.trim().length > 12 ||
      lastName.trim().length > 12 ||
      city.trim().length > 12 ||
      street.trim().length > 12 ||
      houseNumber.trim().length > 12
    ) {
      alert("Please provide input with a maximum of 12 characters!");
      return;
    }

    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      city.trim() === "" ||
      street.trim() === "" ||
      houseNumber.trim() === ""
    ) {
      alert("Please provide input in all fields!");
      return;
    }

    const numberRegex = /\d/;

    if (
      numberRegex.test(firstName) ||
      numberRegex.test(lastName) ||
      numberRegex.test(city) ||
      numberRegex.test(street)
    ) {
      alert("Numbers are only allowed in the house number field!");
      return;
    }

    const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (
      hasSpecialCharacters.test(firstName) ||
      hasSpecialCharacters.test(lastName) ||
      hasSpecialCharacters.test(city) ||
      hasSpecialCharacters.test(street)
    ) {
      alert("Special characters are not allowed!");
      return;
    }

    let shippingDetails = [];

    shippingDetails.push({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      city: city.trim(),
      street: street.trim(),
      houseNumber: houseNumber.trim(),
    });

    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));

    openModal();
  }

  return (
    <div className='center-items'>
      <h1>Shipping details</h1>
      {shippingDetails.length === 0 ||
      shippingDetails[0].firstName.length === 0 ? (
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
          <h2 style={{ marginBottom: "0.5rem" }}>Saved shipping details</h2>
          {shippingDetails.map((shippingDetail, index) => (
            <div key={index}>
              <div>
                <label className='input-label'>First name:</label>
                <label>{shippingDetail.firstName}</label>
              </div>
              <div>
                <label className='input-label'>Last name:</label>
                <label>{shippingDetail.lastName}</label>
              </div>
              <div>
                <label className='input-label'>City:</label>
                <label>{shippingDetail.city}</label>
              </div>
              <div>
                <label className='input-label'>Street:</label>
                <label>{shippingDetail.street}</label>
              </div>
              <div>
                <label className='input-label'>House number:</label>
                <label>{shippingDetail.houseNumber}</label>
              </div>
            </div>
          ))}
          <Link to={"/billing"}>
            <button
              className='add-to-cart-btn'
              style={{ width: "auto", fontSize: "1.3rem" }}
            >
              Go to payment
            </button>
          </Link>
          <button
            className='add-to-cart-btn'
            style={{ width: "auto", fontSize: "1.3rem" }}
            onClick={clearShippingDetails}
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
        <h2 style={{ marginBottom: "1.5rem" }}>
          Specify/update shipping details
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
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
          Your shipping details have been saved!
        </h2>

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
