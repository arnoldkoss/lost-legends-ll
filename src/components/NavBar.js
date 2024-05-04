import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/logo.gif";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";

import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const addPostIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
    >
      <i className="fa-solid fa-circle-plus"></i>Add post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      <NavLink
        to="/feed"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className={`fa-solid fa-shoe-prints ${styles.RotatedIcon}`}></i>
        Following
      </NavLink>
      <NavLink
        to="/wishlist"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i class="fa-solid fa-clipboard-list"></i>Wishlist
      </NavLink>
      <NavLink
        to="/favorite"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i class="fa-solid fa-crown"></i>Favorites
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to="/"
        onClick={() => {}}
      >
        <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/detectorists/${currentUser?.detectorist_id}`}
      >
        <Avatar src={currentUser?.detectorist_image} text="etectorist" height={40} />
      </NavLink>
      
     
    </>
  );
  const loggedOutIcons = (
    <>
      {" "}
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i class="fa-solid fa-right-to-bracket"></i> Sign in
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        <i class="fa-solid fa-user-plus"></i> Sign up
      </NavLink>{" "}
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="90" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              <i class="fa-solid fa-house"></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
