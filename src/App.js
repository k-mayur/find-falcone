import React from "react";

class App extends React.Component {
  state = {
    name: "Falcone"
  };
  render() {
    return <div className="App">Find {this.state.name}</div>;
  }
}

export default App;
