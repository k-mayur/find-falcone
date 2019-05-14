import React from "react";
import { connect } from "react-redux";
import { findHandler, getPlanets } from "../../store/actions/planet";
import { getVehicles } from "../../store/actions/vehicle";
import $ from "jquery";

class Home extends React.Component {
  findHandle = e => {
    e.preventDefault();
    this.props.findHandler();
  };

  populateVehicles = n => {
    const planetDistance = $(`#s${n}`).val();
    console.log(planetDistance);
    $(`#d${n}`).html("");
    if (planetDistance !== "") {
      this.props.vehicle.vehicles.map(vehicle => {
        if (vehicle.max_distance >= planetDistance) {
          return $(`#d${n}`).append(
            '<input type="radio" name="radio' +
              n +
              '" >' +
              vehicle.name +
              " (" +
              vehicle.total_no +
              ") " +
              "</input>"
          );
        } else {
          return null;
        }
      });
    }
  };

  getData = () => {
    this.props.getPlanets();
    this.props.getVehicles();
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    const { vehicles } = this.props.vehicle;
    const { planets, time } = this.props.planet;
    console.log(vehicles, planets, time);

    const planetsDropdown = planets.map((planet, i) => {
      return (
        <option key={i} value={planet.distance}>
          {planet.name}
        </option>
      );
    });

    const tempArr = [1, 2, 3, 4];

    const dropdowns = tempArr.map(i => {
      let id1 = `s${i}`;
      let id2 = `d${i}`;
      return (
        <div key={i}>
          <select onChange={() => this.populateVehicles(i)} id={id1}>
            <option value="">select planet</option>
            {planetsDropdown}
          </select>
          <div id={id2} />
        </div>
      );
    });

    return (
      <div>
        <div>
          <h4>Select planets you want to search in :</h4>

          <form data-test="findForm" onSubmit={this.findHandle}>
            {dropdowns}
            <button type="submit">Find</button>
          </form>
        </div>
        <div>
          <h4>Time taken : {this.props.planet.time}</h4>
        </div>
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
  { findHandler, getPlanets, getVehicles }
)(Home);
