import React from "react";
import { connect } from "react-redux";
import { updateSelectedVehicles } from "../../store/actions/vehicle";
import swal from "sweetalert";

class Radios extends React.Component {
  updateSelectedVehicles = (event, planetNumber) => {
    const vehicleName = event.target.value;
    const { planet, vehicle } = this.props;
    if (
      vehicle.updatedVehicles.find(veh => veh.name === vehicleName).total_no <=
      0
    ) {
      event.preventDefault();
      return swal("vehicle not available");
    } else if (
      planet.planets.find(
        pl => pl.name === vehicle.selectedPlanets[planetNumber - 1]
      ).distance >
      vehicle.vehicles.find(veh => veh.name === vehicleName).max_distance
    ) {
      event.preventDefault();
      return swal("vehicle not reachable");
    } else {
      if (vehicleName !== undefined) {
        this.props.updateSelectedVehicles(vehicleName, planetNumber);
      }
    }
  };

  render() {
    const { updatedVehicles, selectedPlanets } = this.props.vehicle;
    const { planetNumber } = this.props;
    const planet = selectedPlanets[planetNumber - 1];
    let style;
    let checked;
    if (planet === "" || !planet) {
      style = { display: "none" };
      checked = false;
    } else {
      style = {};
    }

    let radios = updatedVehicles.map((vehicle, i) => {
      const name = vehicle.name;
      return (
        <span key={i}>
          <input
            type="radio"
            name={planetNumber}
            value={name}
            id={name + planetNumber}
            checked={checked}
            onClick={e => this.updateSelectedVehicles(e, planetNumber)}
          />
          <label htmlFor={name + planetNumber}>
            {name + " (" + vehicle.total_no + ")"}
          </label>
        </span>
      );
    });
    return (
      <div className="planet-vehicles" style={style}>
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
