import React from "react";
import { connect } from "react-redux";
import {
  findHandler,
  getPlanets,
  resetHandler,
  loading
} from "../../store/actions/planet";
import { getVehicles } from "../../store/actions/vehicle";
import Dropdown from "../Dropdown/Dropdown";
import "./Home.css";
import swal from "@sweetalert/with-react";

class Home extends React.Component {
  resetHandle = () => {
    this.props.resetHandler();
  };

  findHandle = e => {
    e.preventDefault();
    const { selectedPlanets, selectedVehicles } = this.props.vehicle;
    for (
      let planetNumber = 1;
      planetNumber <= this.props.vehicle.numPlanetsAllowed;
      planetNumber++
    ) {
      if (
        !selectedPlanets[planetNumber - 1] ||
        selectedPlanets[planetNumber - 1] === ""
      ) {
        return swal("select all four planets");
      }
      if (
        !selectedVehicles[planetNumber - 1] ||
        selectedVehicles[planetNumber - 1] === ""
      ) {
        return swal("select all four vehicles");
      }
    }

    const planets = Object.values(selectedPlanets);
    const vehicles = Object.values(selectedVehicles);
    this.props.loading();
    this.props.findHandler(planets, vehicles);
  };

  getData = () => {
    this.props.getPlanets();
    this.props.getVehicles();
  };
  componentDidMount = () => {
    this.props.loading();
    this.getData();
  };

  componentDidUpdate = () => {
    let { redirect } = this.props.planet;
    if (redirect === true) {
      this.props.history.push("/result");
    }
  };

  render() {
    const { selectedPlanets, selectedVehicles, time } = this.props.vehicle;

    console.log(selectedPlanets, selectedVehicles, time);
    const { loading } = this.props.planet;
    if (loading) {
      return (
        <div>
          <div className="loader">Loading...</div>
        </div>
      );
    } else {
      return (
        <div className="home">
          <div className="home-options">
            <h4 style={{ textAlign: "center" }}>
              Select planets you want to search in :
            </h4>
            <form
              className="home-form"
              data-test="findForm"
              onSubmit={this.findHandle}
            >
              <Dropdown />
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
    resetHandler,
    loading
  }
)(Home);
