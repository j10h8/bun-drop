import React from "react";
import logo from "../images/logo color.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faInfoCircle,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function NavBar() {
  const homeIcon = <FontAwesomeIcon icon={faHouse} className='nav-bar-icon' />;
  const shoppingCartIcon = (
    <FontAwesomeIcon icon={faCartShopping} className='nav-bar-icon' />
  );
  const infoIcon = (
    <FontAwesomeIcon icon={faInfoCircle} className='nav-bar-icon' />
  );
  const termsIcon = (
    <FontAwesomeIcon icon={faFileContract} className='nav-bar-icon' />
  );
  return (
    <div
      className='gradient-background'
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Link to={"/"}>
          <img src={logo} alt='logo' className='logo-navbar' />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          width: "12rem",
          justifyContent: "space-between",
          marginRight: "2rem",
        }}
      >
        <Link to={"/"}>{homeIcon}</Link>
        <Link to={"/about"}>{infoIcon}</Link>
        <Link to={"/terms"}>{termsIcon}</Link>
        <Link to={"/cart"}>{shoppingCartIcon}</Link>
      </div>
    </div>
  );
}

export default NavBar;
