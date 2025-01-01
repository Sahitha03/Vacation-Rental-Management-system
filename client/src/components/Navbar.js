import React from 'react';
import { Link } from 'react-router-dom'; // For routing in React

const Navbar = ({ currUser }) => {
  return (
    <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/listings">
          <i className="fa-solid fa-compass"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/listings">
              Explore
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link" to="/listings/new">
              Switch to Hosting
            </Link>
            {!currUser ? (
              <>
                <Link className="nav-link" to="/signup">
                  <b>Signup</b>
                </Link>
                <Link className="nav-link" to="/login">
                  <b>Log in</b>
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/logout">
                <b>Log out</b>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
