import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./style.css";

const HeaderComponent = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg shadow fixed-top bg-light mb-5">
        <div className="container container-fluid">
          <LinkContainer to="/">
            <Link className="navbar-brand">
              <span className="text-primary">
                <strong>BCG</strong>
              </span>
            </Link>
          </LinkContainer>
        </div>
      </nav>
    </>
  );
};

export default HeaderComponent;
