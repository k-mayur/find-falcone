import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h4>Select planets you want to search in :</h4>
          <div>
            <div>Dropdown1</div>
            <div>Dropdown2</div>
            <div>Dropdown3</div>
            <div>Dropdown4</div>
          </div>
        </div>
        <div>
          <h4>Time taken : {this.props.planet.time}</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  vehicle: state.vehicle,
  planet: state.planet
});

export default connect(mapStateToProps)(Home);
