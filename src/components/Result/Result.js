import React from "react";
import { connect } from "react-redux";
import { resetRedirect } from "../../store/actions/planet";
import "./Result.css";

class Result extends React.Component {
  componentWillUnmount() {
    this.props.resetRedirect();
  }
  render() {
    let msg = "Falcone was not found on any of the planet you selected.";
    let planet = "She could be anywhere on the remaining planet.";
    if (this.props.planet.result.status === "success") {
      msg = "Congratulations! You found Falcone. King Shan is mighty pleased.";
      planet = `She was hiding on ${this.props.planet.result.planet_name}.`;
    }
    return (
      <div className="result">
        <h3>{msg}</h3>
        <p>{planet}</p>
        <p>Time taken : {this.props.vehicle.time}</p>
        <button
          className="btn"
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          Try Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  planet: state.planet
});

export default connect(
  mapStateToProps,
  { resetRedirect }
)(Result);
