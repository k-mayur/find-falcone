import React from "react";

const footer = props => {
  return (
    <div className="footer">
      <h4>
        Coding problem{" "}
        <a data-test="footerLink" href="https://www.geektrust.in/">
          geektrust.in/finding-falcone
        </a>{" "}
      </h4>
    </div>
  );
};

export default footer;
