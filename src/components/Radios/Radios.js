import React from "react";
import { connect } from "react-redux";

class Radios extends React.Component {
  render() {
    const { updatedVehicles } = this.props.vehicle;

    let radios = updatedVehicles.map((vehicle, n) => {
      const num = n + 1;
      const name = vehicle.name;
      return (
        <span>
          <input type="radio" name={name} value={name} />
          <label for={name + num}>{name + " (" + vehicle.total_no + ")"}</label>
        </span>
      );
    });
    return <div>{radios}</div>;
  }
}

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  planet: state.planet
});

export default connect(
  mapStateToProps,
  {}
)(Radios);
