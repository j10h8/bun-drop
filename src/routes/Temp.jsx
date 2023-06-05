import React, { useState, useEffect } from "react";

function Summary() {
  const [shippingDetails, setShippingDetails] = useState([]);

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
  }

  return (
    <div>
      {shippingDetails.map((shippingDetail, index) => (
        <div key={index}>
          <h1>{shippingDetail.firstName}</h1>
          <h1>{shippingDetail.lastName}</h1>
          <h1>{shippingDetail.city}</h1>
          <h1>{shippingDetail.street}</h1>
          <h1>{shippingDetail.houseNumber}</h1>
        </div>
      ))}
    </div>
  );
}

export default Payment;
