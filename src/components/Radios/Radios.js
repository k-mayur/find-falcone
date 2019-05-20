import React from "react";
import { connect } from "react-redux";
import { updateSelectedVehicles } from "../../store/actions/vehicle";
import swal from "sweetalert";

class Radios extends React.Component {
  updateSelectedVehicles = (event, planetNumber) => {
    console.log(event.target.value, planetNumber);
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
    const { updatedVehicles } = this.props.vehicle;

    let radios = updatedVehicles.map((vehicle, i) => {
      const { planetNumber } = this.props;
      const name = vehicle.name;
      let checked;
      if (
        !this.props.vehicle.selectedPlanets[planetNumber - 1] ||
        this.props.vehicle.selectedPlanets[planetNumber - 1] === ""
      ) {
        checked = false;
      }

      return (
        <span key={i}>
          <input
            type="radio"
            name={planetNumber}
            value={name}
            id={name + planetNumber}
            checked={checked}
            onClick={e =>
              this.updateSelectedVehicles(e, this.props.planetNumber)
            }
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
