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
      alert("please enter valid input");
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

  populateVehicles = n => {
    const planetName = $(`#s${n}`).val();
    const planetDistance = this.props.planet.planets.filter(
      planet => planet.name === planetName
    )[0].distance;
    console.log(planetDistance);
    $(`#d${n}`).html("");
    if (planetDistance !== "") {
      this.props.vehicle.vehicles.map(vehicle => {
        if (vehicle.max_distance >= planetDistance) {
          const radios = $(`#d${n}`).append(
            '<input type="radio" id="' +
              vehicle.name +
              '" name="' +
              n +
              '" value="' +
              vehicle.name +
              '" >' +
              vehicle.name +
              " (" +
              this.props.vehicle.vehicles.find(veh => veh.name === vehicle.name)
                .total_no +
              ") " +
              "</input>"
          );

          return radios;
        } else {
          return null;
        }
      });
    }
  };

  radioClick = (vehicleName, dropDownNumber) => {
    const planetName = $(`#s${dropDownNumber}`).val();
    if (planetName !== undefined) {
      const planetDistance = this.props.planet.planets.filter(
        planet => planet.name === planetName
      )[0].distance;
      this.props.updateTimeAndCount(vehicleName, planetDistance, planetName);
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
    const { vehicles } = this.props.vehicle;
    const { planets, time } = this.props.planet;
    console.log(vehicles, planets, time);

    const planetsDropdown = planets.map((planet, i) => {
      return (
        <option key={i} value={planet.name}>
          {planet.name}
        </option>
      );
    });

    const tempArr = [1, 2, 3, 4];

    // const dropdowns = tempArr.map(i => {
    //   let id1 = `s${i}`;
    //   let id2 = `d${i}`;
    //   let show = "block";
    //   const veh = this.props.vehicle.vehicles.map(vehicle => {
    //     return (
    //       <span>
    //         <input type="radio" value={vehicle.name} id={vehicle.name} />
    //         <label for={vehicle.name}>{vehicle.name}</label>
    //       </span>
    //     );
    //   });
    //   return (
    //     <div key={i}>
    //       <select onChange={() => this.populateVehicles(i)} id={id1}>
    //         <option value="">select planet</option>
    //         {planetsDropdown}
    //       </select>
    //       <div
    //         styles={{ display: show }}
    //         id={id2}
    //         onClick={e => this.radioClick(e.target.id, e.target.name)}
    //       >
    //         {veh}
    //       </div>
    //     </div>
    //   );
    // });

    const dropdowns = tempArr.map(i => {
      let id1 = `s${i}`;
      let id2 = `d${i}`;
      return (
        <div key={i}>
          <select onChange={() => this.populateVehicles(i)} id={id1}>
            <option value="">select planet</option>
            {planetsDropdown}
          </select>
          <div
            id={id2}
            onClick={e => this.radioClick(e.target.id, e.target.name)}
          />
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
          <h4>Time taken : {this.props.vehicle.time}</h4>
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
