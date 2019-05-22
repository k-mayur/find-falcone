import React from "react";
import { connect } from "react-redux";
import Radios from "../Radios/Radios";
import { updateSelectedPlanets } from "../../store/actions/vehicle";
import swal from "@sweetalert/with-react";

class Dropdown extends React.Component {
  updateSelectedPlanets = (planetNumber, event) => {
    const planetName = event.target.value;
    const { selectedPlanets } = this.props.vehicle;
    if (planetName !== "") {
      if (Object.values(selectedPlanets).includes(planetName)) {
        return swal("select another planet");
      }
    }
    this.props.updateSelectedPlanets(planetName, planetNumber);
  };

  render() {
    const { planets } = this.props.planet;
    const { selectedPlanets } = this.props.vehicle;
    const planetsDropdown = planets.map((planet, index) => {
      return (
        <option key={index} value={planet.name}>
          {planet.name}
        </option>
      );
    });
    let dropdowns = [];
    for (let i = 0; i < this.props.vehicle.numPlanetsAllowed; i++) {
      const planetNumber = i + 1;
      dropdowns.push(
        <div key={i} className="planet-wrap">
          <select
            className="planet-dropdown"
            onChange={e => this.updateSelectedPlanets(planetNumber, e)}
            value={selectedPlanets[i] ? selectedPlanets[i] : ""}
          >
            <option value="">select planet {planetNumber}</option>
            {planetsDropdown}
          </select>
          <div />
          <Radios planetNumber={planetNumber} />
        </div>
      );
    }
    return <div className="planets-wrap">{dropdowns}</div>;
  }
}

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  planet: state.planet
});

export default connect(
  mapStateToProps,
  { updateSelectedPlanets }
)(Dropdown);
