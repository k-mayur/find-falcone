import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetHandler } from "../../store/actions/planet";
import "./Header.css";

class Header extends React.Component {
  resetHandle = () => {
    let tempA = [1, 2, 3, 4];
    tempA.forEach(n => {
      document.getElementById(`d${n}`).innerHTML = "";
      document.getElementById(`s${n}`).value = "";
    });
    this.props.resetHandler();
  };
  render() {
    return (
      <div className="header">
        <div className="header-text">
          <h2>Finding {this.props.name}</h2>
        </div>
        <div className="header-btn">
          <button
            data-test="resetBtn"
            className="btn"
            onClick={this.resetHandle}
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
  }
}

export default connect(
  null,
  { resetHandler }
)(withRouter(Header));
