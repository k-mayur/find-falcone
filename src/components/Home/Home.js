import React from "react";
import { connect } from "react-redux";
import {
  findHandler,
  getPlanets,
  resetHandler,
  loading,
  setToken
} from "../../store/actions/planet";
import { getVehicles } from "../../store/actions/vehicle";
import Dropdown from "../Dropdown/Dropdown";
import "./Home.css";
import swal from "@sweetalert/with-react";

class Home extends React.Component {
  findHandle = e => {
    e.preventDefault();
    const { selectedPlanets, selectedVehicles } = this.props.vehicle;
    for (let i = 0; i < this.props.vehicle.numPlanetsAllowed; i++) {
      if (
        !selectedPlanets[i] ||
        selectedPlanets[i] === "" ||
        !selectedVehicles[i]
      ) {
        return swal(
          <div>
            <h1>Inputs Missing!</h1>
            <p>Please enter all valid inputs.</p>
          </div>
        );
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
    this.props.setToken();
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
    const { time } = this.props.vehicle;
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
              onClick={this.props.resetHandler}
            >
              Reset
            </button>
          </div>
          <div className="home-time">
            <h4>
              Time taken : <span style={{ color: "darkred" }}>{time}</span>{" "}
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
    loading,
    setToken
  }
)(Home);
