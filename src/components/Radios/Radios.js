import React from "react";
import { connect } from "react-redux";
import { updateSelectedVehicles } from "../../store/actions/vehicle";
import swal from "sweetalert";

class Radios extends React.Component {
  updateSelectedVehicles = (event, planetNumber) => {
    if (
      this.props.vehicle.updatedVehicles.filter(
        veh => veh.name === event.target.value
      )[0].total_no <= 0
    ) {
      event.preventDefault();
      return swal("vehicle not available");
    } else if (
      this.props.planet.planets.filter(
        pl => pl.name === this.props.vehicle.selectedPlanets[planetNumber - 1]
      )[0].distance >
      this.props.vehicle.vehicles.filter(
        veh => veh.name === event.target.value
      )[0].max_distance
    ) {
      event.preventDefault();
      return swal("vehicle not reachable");
    } else {
      const vehicleName = event.target.value;
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
