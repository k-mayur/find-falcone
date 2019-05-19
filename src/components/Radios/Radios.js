import React from "react";
import { connect } from "react-redux";

class Radios extends React.Component {
  render() {
    const { updatedVehicles } = this.props.vehicle;

    let radios = updatedVehicles.map(vehicle => {
      const { planetNumber } = this.props;
      const name = vehicle.name;
      return (
        <span>
          <input
            type="radio"
            name={planetNumber}
            value={name}
            id={name + planetNumber}
            onClick={this.radioClick}
          />
          <label for={name + planetNumber}>
            {name + " (" + vehicle.total_no + ")"}
          </label>
        </span>
      );
    });
    return (
      <div className="planet-vehicles" onClick={this.radioClick}>
        {radios}
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
  {}
)(Radios);
