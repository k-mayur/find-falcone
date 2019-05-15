import React from "react";
import { connect } from "react-redux";
import { findHandler, getPlanets } from "../../store/actions/planet";
import { getVehicles, updateTimeAndCount } from "../../store/actions/vehicle";
import $ from "jquery";
import "./Home.css";

class Home extends React.Component {
  findHandle = e => {
    e.preventDefault();
    if (
      $("#s1").val() === undefined ||
      $("#s2").val() === undefined ||
      $("#s3").val() === undefined ||
      $("#s4").val() === undefined ||
      $("input[name=1]:checked").val() === undefined ||
      $("input[name=2]:checked").val() === undefined ||
      $("input[name=3]:checked").val() === undefined ||
      $("input[name=4]:checked").val() === undefined
    ) {
      alert("please enter all valid inputs");
    } else {
      const planetNames = [
        $("#s1").val(),
        $("#s2").val(),
        $("#s3").val(),
        $("#s4").val()
      ];
      const vehicleNames = [
        $("input[name=1]:checked").val(),
        $("input[name=2]:checked").val(),
        $("input[name=3]:checked").val(),
        $("input[name=4]:checked").val()
      ];
      this.props.findHandler(planetNames, vehicleNames);
    }
  };

  selectedPlanets = n => {
    let tempA = [1, 2, 3, 4];
    tempA = tempA.filter(m => m !== n);
    return tempA.map(n => {
      return $(`#s${n}`).val();
    });
  };

  selectedVehicles = n => {
    let tempA = [1, 2, 3, 4];
    tempA = tempA.filter(m => m !== n);
    return tempA.map(n => {
      return $(`input[name=${n}]:checked`).val();
    });
  };

  populateVehicles = n => {
    const planetName = $(`#s${n}`).val();
    let planetDistance = "";
    if (planetName !== "") {
      const selectedPlanet = this.selectedPlanets(n);

      if (selectedPlanet.includes(planetName)) {
        $(`#s${n}`).val("");
        alert("already selected this planet");
      } else {
        planetDistance = this.props.planet.planets.filter(
          planet => planet.name === planetName
        )[0].distance;
      }
    }
    $(`#d${n}`).html("");
    if (planetDistance !== "") {
      this.props.vehicle.vehicles.map(vehicle => {
        if (vehicle.max_distance >= planetDistance) {
          const radios = $(`#d${n}`).append(
            '<span><input type="radio" id="' +
              vehicle.name +
              '" name="' +
              n +
              '" value="' +
              vehicle.name +
              '" />' +
              vehicle.name +
              "</input></span>"
          );
          return radios;
        } else {
          return null;
        }
      });
    }
  };

  radioClick = dropDownNumber => {
    const veh = $(`input[name=${dropDownNumber}]:checked`).val();
    const availVeh = this.props.vehicle.vehicles.filter(v => v.name === veh)[0]
      .total_no;
    if (availVeh <= 0) {
      $(`input[name=${dropDownNumber}]`).prop("checked", false);
      alert("vehicle not available");
    } else {
      const selectedV = this.selectedVehicles(dropDownNumber);
      const selectedP = this.selectedPlanets(dropDownNumber);
      this.props.updateTimeAndCount(selectedP, selectedV, veh);
    }
  };

  getData = () => {
    this.props.getPlanets();
    this.props.getVehicles();
  };
  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate = () => {
    let { redirect } = this.props.planet;
    if (redirect === true) {
      this.props.history.push("/result");
    }
  };

  render() {
    const { planets } = this.props.planet;

    const planetsDropdown = planets.map((planet, i) => {
      return (
        <option key={i} value={planet.name}>
          {planet.name}
        </option>
      );
    });

    const tempArr = [1, 2, 3, 4];
    const dropdowns = tempArr.map(i => {
      let id1 = `s${i}`;
      let id2 = `d${i}`;
      return (
        <div key={i} className="planet-wrap">
          <select
            className="planet-dropdown"
            onChange={() => this.populateVehicles(i)}
            id={id1}
          >
            <option value="">select planet {i}</option>
            {planetsDropdown}
          </select>
          <div
            className="planet-vehicles"
            id={id2}
            onClick={e => this.radioClick(e.target.name)}
          />
        </div>
      );
    });

    const vehiclesList = this.props.vehicle.vehicles.map((vehicle, i) => {
      return (
        <span key={i}>
          {vehicle.name} :{" "}
          <span style={{ color: "darkred", fontSize: "1.2em" }}>
            {vehicle.total_no}
          </span>{" "}
          &nbsp;
        </span>
      );
    });

    return (
      <div className="home">
        <div className="home-options">
          <h4 style={{ textAlign: "center" }}>
            Select planets you want to search in :
          </h4>
          <div className="vlist">
            <span className="vlist-title">Available Vehicles :</span>
            <div className="vlist-content">{vehiclesList}</div>
          </div>
          <form
            className="home-form"
            data-test="findForm"
            onSubmit={this.findHandle}
          >
            <span className="planets-wrap">{dropdowns}</span>
            <button
              className="btn"
              type="submit"
              style={{ alignSelf: "center", margin: "30px" }}
            >
              Find Falcone
            </button>
          </form>
        </div>
        <div className="home-time">
          <h4>
            Time taken :{" "}
            <span style={{ color: "darkred" }}>{this.props.vehicle.time}</span>{" "}
          </h4>
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
  { findHandler, getPlanets, getVehicles, updateTimeAndCount }
)(Home);
