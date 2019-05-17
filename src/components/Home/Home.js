import React from "react";
import { connect } from "react-redux";
import {
  findHandler,
  getPlanets,
  resetHandler,
  loadingOn
} from "../../store/actions/planet";
import { getVehicles, updateTimeAndCount } from "../../store/actions/vehicle";
import "./Home.css";
import swal from "@sweetalert/with-react";

class Home extends React.Component {
  state = {
    planet1: "",
    planet2: "",
    planet3: "",
    planet4: "",
    vehicle1: undefined,
    vehicle2: undefined,
    vehicle3: undefined,
    vehicle4: undefined,
    tempArr: [1, 2, 3, 4]
  };

  resetHandle = () => {
    this.state.tempArr.forEach(n => {
      document.getElementById(`d${n}`).innerHTML = "";
      this.setState({ [`planet${n}`]: "", [`vehicle${n}`]: undefined });
    });
    this.props.resetHandler();
  };

  findHandle = e => {
    e.preventDefault();
    if (
      Object.values(this.state).includes("") ||
      Object.values(this.state).includes(undefined)
    ) {
      swal(
        <div>
          <h1>Inputs Missing!</h1>
          <p>Please enter all valid inputs.</p>
        </div>
      );
    } else {
      const planetNames = [];
      const vehicleNames = [];
      this.state.tempArr.forEach(n => {
        planetNames.push(this.state[`planet${n}`]);
        vehicleNames.push(this.state[`vehicle${n}`]);
      });
      this.props.loadingOn();
      this.props.findHandler(planetNames, vehicleNames);
    }
  };

  selectedPlanets = n => {
    const tempA = this.state.tempArr.filter(m => m !== n);
    return tempA.map(n => {
      let e = document.getElementById(`s${n}`);
      return e.options[e.selectedIndex].value;
    });
  };

  selectedVehicles = n => {
    const tempA = this.state.tempArr.filter(m => m !== n);
    return tempA.map(n => {
      const el = document.querySelector(`input[name = "${n}"]:checked`);
      if (el !== null) {
        return el.value;
      } else {
        return undefined;
      }
    });
  };

  populateVehicles = (n, e) => {
    const planetName = e.target.value;
    let planetDistance = "";
    if (planetName !== "") {
      const selectedPlanet = this.selectedPlanets(n);
      console.log(selectedPlanet);
      if (selectedPlanet.includes(planetName)) {
        e.target.value = this.state[`planet${n}`];
        swal(
          <div>
            <h1>Planet Already Selected!</h1>
            <p>Please select another planet. </p>
          </div>
        );
        return;
      } else {
        planetDistance = this.props.planet.planets.filter(
          planet => planet.name === planetName
        )[0].distance;
      }
    } else {
      document.getElementById(`d${n}`).innerHTML = "";
    }
    if (planetDistance !== "") {
      document.getElementById(`d${n}`).innerHTML = "";
      this.props.vehicle.vehicles.map(vehicle => {
        if (vehicle.max_distance >= planetDistance) {
          const radios = (document.getElementById(`d${n}`).innerHTML +=
            '<span><input type="radio" id="' +
            vehicle.name +
            n +
            '" name="' +
            n +
            '" value="' +
            vehicle.name +
            '" /><label for="' +
            vehicle.name +
            n +
            '">' +
            vehicle.name +
            "</label></span>");

          return radios;
        } else {
          return null;
        }
      });
    }
    const selectedV = this.selectedVehicles(n);
    const selectedP = this.selectedPlanets(n);
    this.props.updateTimeAndCount(selectedP, selectedV);
    this.setState({ [`planet${n}`]: e.target.value });
    this.setState({ [`vehicle${n}`]: undefined });
  };

  radioClick = e => {
    const veh = e.target.value;
    const n = e.target.name;
    if (veh !== undefined) {
      const availVeh = this.props.vehicle.updatedVehicles.filter(
        v => v.name === veh
      )[0].total_no;
      if (availVeh <= 0) {
        const el = document.querySelector(`input[name = "${n}"]:checked`);
        if (el !== null && this.state[`vehicle${n}`] !== undefined) {
          document.getElementById(
            `${this.state[`vehicle${n}`]}${n}`
          ).checked = true;
          swal(
            <div>
              <h1>Vehicle Not Available! </h1>
              <p>Please select another vehicle.</p>
            </div>
          );
          return;
        } else {
          document.getElementById(`${veh}${n}`).checked = false;
        }
        swal(
          <div>
            <h1>Vehicle Not Available! </h1>
            <p>Please select another vehicle.</p>
          </div>
        );
        this.setState({ [`vehicle${n}`]: undefined });
        return;
      } else {
        const selectedV = this.selectedVehicles(n);
        const selectedP = this.selectedPlanets(n);
        this.props.updateTimeAndCount(selectedP, selectedV);
      }
      this.setState({ [`vehicle${n}`]: veh });
    }
  };

  getData = () => {
    this.props.getPlanets();
    this.props.getVehicles();
  };
  componentDidMount = () => {
    this.props.loadingOn();
    this.getData();
  };

  componentDidUpdate = () => {
    let { redirect } = this.props.planet;
    if (redirect === true) {
      this.props.history.push("/result");
    }
  };

  render() {
    const { planets, loading } = this.props.planet;

    if (loading) {
      return (
        <div>
          <div className="loader">Loading...</div>
        </div>
      );
    } else {
      const planetsDropdown = planets.map((planet, i) => {
        return (
          <option key={i} value={planet.name}>
            {planet.name}
          </option>
        );
      });

      const dropdowns = this.state.tempArr.map(i => {
        let id1 = `s${i}`;
        let id2 = `d${i}`;
        return (
          <div key={i} className="planet-wrap">
            <select
              className="planet-dropdown"
              onChange={e => this.populateVehicles(i, e)}
              id={id1}
              value={this.state[`planet${i}`]}
            >
              <option value="">select planet {i}</option>
              {planetsDropdown}
            </select>
            <div
              className="planet-vehicles"
              id={id2}
              onClick={this.radioClick}
            />
          </div>
        );
      });

      const vehiclesList = this.props.vehicle.updatedVehicles.map(
        (vehicle, i) => {
          return (
            <span key={i}>
              {vehicle.name} :{" "}
              <span style={{ color: "darkred", fontSize: "1.2em" }}>
                {vehicle.total_no}
              </span>{" "}
              &nbsp;
            </span>
          );
        }
      );
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
            <button
              data-test="resetBtn"
              className="btn pos-abs"
              onClick={this.resetHandle}
            >
              Reset
            </button>
          </div>
          <div className="home-time">
            <h4>
              Time taken :{" "}
              <span style={{ color: "darkred" }}>
                {this.props.vehicle.time}
              </span>{" "}
            </h4>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  planet: state.planet
});

export default connect(
  mapStateToProps,
  {
    findHandler,
    getPlanets,
    getVehicles,
    updateTimeAndCount,
    resetHandler,
    loadingOn
  }
)(Home);
