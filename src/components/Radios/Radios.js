import React from "react";
import { connect } from "react-redux";
import { updateSelectedVehicles } from "../../store/actions/vehicle";

class Radios extends React.Component {
  updateSelectedVehicles = (event, planetNumber) => {
    console.log(event.target.value, planetNumber);
    const vehicleName = event.target.value;
    if (vehicleName !== undefined) {
      this.props.updateSelectedVehicles(vehicleName, planetNumber);
    }
  };

  render() {
    const { updatedVehicles } = this.props.vehicle;

    let radios = updatedVehicles.map((vehicle, i) => {
      const { planetNumber } = this.props;
      const name = vehicle.name;
      return (
        <span key={i}>
          <input
            type="radio"
            name={planetNumber}
            value={name}
            id={name + planetNumber}
            onClick={this.radioClick}
          />
          <label htmlFor={name + planetNumber}>
            {name + " (" + vehicle.total_no + ")"}
          </label>
        </span>
      );
    });
    return (
      <div
        className="planet-vehicles"
        onClick={e => this.updateSelectedVehicles(e, this.props.planetNumber)}
        style={
          this.props.vehicle.selectedPlanets[this.props.planetNumber - 1] ===
            "" ||
          !this.props.vehicle.selectedPlanets[this.props.planetNumber - 1]
            ? { display: "none" }
            : {}
        }
      >
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
  { updateSelectedVehicles }
)(Radios);
