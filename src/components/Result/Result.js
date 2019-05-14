import React from "react";
import { connect } from "react-redux";

const result = props => {
  return (
    <div>
      <h3>{props.planet.result.status}</h3>
    </div>
  );
};

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  planet: state.planet
});

export default connect(mapStateToProps)(result);
