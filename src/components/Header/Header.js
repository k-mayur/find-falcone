import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { resetHandler } from "../../store/actions/planet";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-text">
          <h2>Finding {this.props.name}</h2>
        </div>
        <div className="header-btn">
          <Link to="/">
            <button
              data-test="homeBtn"
              className="btn"
              onClick={this.props.resetHandler}
            >
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
