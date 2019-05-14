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
        console.log(vehicle);
        return $(`#d${n}`).append(
          '<input type="radio">' + vehicle.name + "</input>"
        );
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

    return (
      <div>
        <div>
          <h4>Select planets you want to search in :</h4>

          <form data-test="findForm" onSubmit={this.findHandle}>
            <div>
              <select onChange={() => this.populateVehicles(1)} id="s1">
                <option value="">select planet</option>
                {planetsDropdown}
              </select>
              <div id="d1" />
            </div>
            <div>
              <select onChange={() => this.populateVehicles(2)} id="s2">
                <option value="">select planet</option>
                {planetsDropdown}
              </select>
              <div id="d2" />
            </div>
            <div>
              <select onChange={() => this.populateVehicles(3)} id="s3">
                <option value="">select planet</option>
                {planetsDropdown}
              </select>
              <div id="d3" />
            </div>
            <div>
              <select onChange={() => this.populateVehicles(4)} id="s4">
                <option value="">select planet</option>
                {planetsDropdown}
              </select>
              <div id="d4" />
            </div>
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
