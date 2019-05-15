import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";

const header = props => {
  return (
    <div className="header">
      <div className="header-text">
        <h2>Finding {props.name}</h2>
      </div>
      <div className="header-btn">
        <button
          data-test="resetBtn"
          className="btn"
          onClick={() => {
            window.location.reload();
          }}
        >
          Reset
        </button>
        <Link to="/">
          <button data-test="homeBtn" className="btn">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(header);
