import React from "react";
import { connect } from "react-redux";
import Radios from "../Radios/Radios";
import { updateSelectedPlanets } from "../../store/actions/vehicle";

class Dropdown extends React.Component {
  updateSelectedPlanets = (planetNumber, event) => {
    this.props.updateSelectedPlanets(event.target.value, planetNumber);
  };

  render() {
    const { planets } = this.props.planet;
    const planetsDropdown = planets.map((planet, index) => {
      return (
        <option key={index} value={planet.name}>
          {planet.name}
        </option>
      );
    });
    let dropdowns = [];
    for (
      let planetNumber = 1;
      planetNumber <= this.props.vehicle.numPlanetsAllowed;
      planetNumber++
    ) {
      dropdowns.push(
        <div key={planetNumber} className="planet-wrap">
          <select
            className="planet-dropdown"
            onChange={e => this.updateSelectedPlanets(planetNumber, e)}
            value={
              this.props.vehicle.selectedPlanets[planetNumber - 1]
                ? this.props.vehicle.selectedPlanets[planetNumber - 1]
                : ""
            }
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
