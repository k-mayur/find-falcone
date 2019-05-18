import React from "react";
import { connect } from "react-redux";
import Radios from "../Radios/Radios";

class Dropdown extends React.Component {
  render() {
    const { planets } = this.props.planet;
    const planetsDropdown = planets.map((planet, i) => {
      return (
        <option key={i} value={planet.name}>
          {planet.name}
        </option>
      );
    });
    let dropdowns = [];
    for (let i = 1; i <= this.props.vehicle.numVehiclesAllowed; i++) {
      dropdowns.push(
        <div key={i} className="planet-wrap">
          <select
            className="planet-dropdown"
            onChange={e => this.populateVehicles(i, e)}
            // value={this.state[`planet${i}`]}
          >
            <option value="">select planet {i}</option>
            {planetsDropdown}
          </select>
          <div className="planet-vehicles" onClick={this.radioClick} />
          <Radios planetNumber={i} />
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
  {}
)(Dropdown);
