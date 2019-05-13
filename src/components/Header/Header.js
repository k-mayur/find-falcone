import React from "react";
import { Link } from "react-router-dom";

const header = props => {
  return (
    <div>
      <div>
        <h2>Finding {props.name}</h2>
      </div>
      <div>
        <button data-test="resetBtn">Reset</button>
        <Link to="/">
          <button data-test="homeBtn">Home</button>
        </Link>
      </div>
    </div>
  );
};

export default header;
